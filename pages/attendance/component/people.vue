<template>
	<view class="people-box">

		<PeopleList @to_people="to_people" :is_position_mode="true" :init_people_store='init_people_store'
			ref="people_list_vue"></PeopleList>

		<u-modal v-model="show" :mask-close-able="true" :title="user_obj.name" :show-confirm-button="false">
			<view class="slot-content">
				<radio-group @change="radioChange">
					<view class="u-p-30">
						
					<label class="uni-list-cell" v-for="(item, index) in rule_list" :key="index">
						<view class="u-m-b-20">
							<label class="radio  u-flex u-row-between">
								<view class="">
								<radio :value="''+item.id" />
								{{ item.name }} -{{ item.score }}
								</view>
							</label>
						</view>
					</label>
					<label class="uni-list-cell" v-if="is_custom_rule">
						<view class="u-m-b-20 u-flex">
							<radio/>
							<input class="input u-p-10" type="text" value="自定义" @click="input_why" @input="input_why" />
						</view>
					</label>
					</view>
				</radio-group>
				<view class="u-text-center u-p-30 u-m-t-50" @click="record()" style="background-color: #d9e4f5;">
					确定
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import PeopleList from './people_list.vue'
	export default {
		props: {
			init_people_store: String,
			rule_codename_store: String,
			// 是否一直记录
			is_continuous:{
				type:Boolean,
				default:false
			} , 
			// 是否自定义
			is_custom_rule:{
				type:Boolean,
				default:true
			} , 
		},
		emits: ['record'],
		components: {
			PeopleList,
		},
		data() {
			return {
				// 缺勤名单
				form: [],
				// 当前用户对象
				user_obj: {},
				// 规则列表 
				rule_list: [],
				// 违纪记录显示状态
				show: false,
			};
		},
		mounted() {
			this.rule()
		},

		methods: {
			rule() {
				this.$store.dispatch('school_attendance_rule', {
					codename: this.$props.rule_codename_store
				}).then(res => {
					this.$data.rule_list = res.data
				})
			},
			
			// 点击姓名 打开原因/取消记录
			to_people() {
				// 这里用$emit事件传值存在问题 用一下方法代替选择的user的获取
				// 这里的获取用户应该放到people_llist 组件里面去
				// 这一块的数据被多个组件使用应该考虑换成vuex
				var index_user = this.$refs.people_list_vue.current_user
				var user_list = this.$refs.people_list_vue.people_list
				var user = user_list[index_user]
				if(this.$props.is_continuous && user.status == '0'){
					this.show = true;
				}else if (user.status == '0') {
					this.$data.form.push({
						user_id: user.user_id,
						name:user.name,
						status: '1',
						reason:'撤销'
					});
					this.$refs.people_list_vue.updata_style(index_user,'1')
					uni.showToast({
						title: '撤销',
						icon: 'none'
					});
				} else if(user.user_id) {
					this.show = true;
				}
				// 当前点击的学生 
				this.user_obj = user;
			},
			// 改变学生样式状态
			updata_style(){
				var index_user = this.$refs.people_list_vue.current_user
				this.user_obj.status = '0'
				this.$refs.people_list_vue.updata_style(index_user,'0')
			},
			// 输入原因
			input_why(evt) {
				this.user_obj.reason = evt.target.value;
				this.user_obj.reason_is_custom = true
			},
			// 单选选择原因
			radioChange: function(evt) {
				this.user_obj.reason = evt.target.value;
				this.user_obj.reason_is_custom = false;
			},
			// 还原选中用户信息
			init_user_obj(){
				var index_user = this.$refs.people_list_vue.current_user
				var user_list = this.$refs.people_list_vue.people_list
				var user = user_list[index_user]
				user.reason = undefined
			},
			// 写入违纪表单
			record() {
				this.$emit('record')
				this.show = false
			},
			// 是否返回
			is_onBackPress(e) {
				if (e.from === 'navigateBack') {
					if (this.form.length != 0) {
						console.log(this.form.length != 0, e.from)
						uni.showModal({
							title: '注意',
							content: '未提交记录是否返回',
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack({
										delta: 1
									});
								} else if (res.cancel) {
									return true; //阻止默认返回行为
								}
							}
						});
					} else {
						return false
					}
					return true; //阻止默认返回行为
				}
				return false
			}
		},


	};
</script>

<style lang="scss" scoped>
	.people-box {}


	.user-name {
		display: inline-block;
		margin-bottom: 20rpx;
	}

	.input {
		border: #c5c5c5 solid 1rpx;
	}



	.slot-content {
		font-size: 28rpx;
		color: $u-content-color;
	}
</style>
