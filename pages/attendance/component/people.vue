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
							<radio :value="''+item.id" />
							{{ item.name }}
						</view>
					</label>
					<label class="uni-list-cell">
						<view class="u-m-b-20 u-flex">
							<radio/>
							<input class="input u-p-10" type="text" value="自定义" @input="input_why" />
						</view>
					</label>
					</view>
				</radio-group>
				<view class="u-text-center u-m-r-30 u-p-b-30" @click="record()">
					确定
				</view>
				<!-- <button type="default" v-on:tap="record()">确定</button> -->
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
				var index_user = this.$refs.people_list_vue.current_user
				var user_list = this.$refs.people_list_vue.people_list
				var user = user_list[index_user]
				if (user.status == '0') {
					this.$data.form.push({
						user_id: user.user_id,
						name:user.name,
						status: '1'
					});
					user.status = '1';
					uni.showToast({
						title: '撤销',
						icon: 'none'
					});
				} else {
					this.show = true;
				}
				// 当前点击的学生 
				console.log(user)
				this.user_obj = user;
			},
			// 输入原因
			input_why(evt) {
				this.user_obj.reason = evt.target.value;
				this.user_obj.reason_is_custom = true
			},
			// 单选选择原因
			radioChange: function(evt) {
				this.user_obj.reason = evt.target.value;
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
		padding-left: 30rpx;
	}
</style>
