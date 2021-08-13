<!--
 * @Author: your name
 * @Date: 2021-08-03 17:16:27
 * @LastEditTime: 2021-08-03 20:15:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ChileCat-Vscode-uniapp-project\src\pages\school_attendance\component\people.vue
-->
<template>
	<view class="people-box">
		<PeopleList @to_people="to_people" :is_position_mode="true" :request_data='people_list_request_data' :init_people_store='$props.init_people_store' ref="people_list_vue" ></PeopleList>
		<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="80">
			<text class="user-name">姓名：{{ user_obj.name }}</text>
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in rule_list" :key="index">
					<view>
						<radio :value="''+item.id" />
						{{ item.name }}
					</view>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<radio value="其他" />
						其他
						<input type="text" value="" @input="input_why" />
					</view>
				</label>
			</radio-group>
			<button type="default" v-on:tap="record()">确定</button>
		</pop>
	</view>
</template>

<script>
import pop from '@/components/ming-pop/ming-pop.vue';
import PeopleList from './people_list.vue'
export default {
	props:{
		init_people_store:String,
		rule_codename_store:String,
	},
	emits: ['record'],
	components: {
		pop,
		PeopleList,
	
	},
	data() {
		return {
			// 缺勤名单
			form: [],
			// 当前用户对象
			user_obj: {},
			// 规则列表
			rule_list:[],
			people_list_request_data:{
				task_id:this.$store.getters.task_now.id,
				room_id:this.$store.getters.room_now.id,
			}
		};
	},
	mounted(){
		this.init_people()
		this.rule()
		// this.$refs.people_list_vue.initBed()
	},
	
	methods:{
		rule(){
			this.$store.dispatch('school_attendance/rule', {  codename: this.$props.rule_codename_store }).then(res=>{
				this.$data.rule_list = res.data
			})
		},
		// 加载学生数据
		init_people() {
		
		},
		// 点击姓名 打开原因/取消记录
		to_people(item) {
			console.log(item)
			if (item.status == '0' ) {
				this.$data.form.push({
					user_id: item.user_id,
					status: '1'
				});
				item.status = '1';
				uni.showToast({
					title: '撤销',
					icon: 'none'
				});
			} else if(item.status) {
				this.$refs.pop.show();
			}
			this.$data.user_obj = item;
		},
		// 输入原因
		input_why(evt) {
			this.$data.user_obj.reason = evt.target.value;
			this.$data.user_obj.reason_is_custom = true
		},
		// 单选选择原因
		radioChange: function(evt) {
			this.$data.user_obj.reason = evt.target.value;
		},
			
		// 写入违纪表单
		record() {
			this.$emit('record')
			this.$refs.pop.close();
		},
		// 是否返回
		is_onBackPress(e){
			if (e.from === 'navigateBack') {
					if(this.form.length!=0){
						console.log(this.form.length!=0,e.from )
						uni.showModal({
							title: '注意',
							content: '未提交记录是否返回',
							success: function (res) {
								if (res.confirm) {
									uni.navigateBack({
										delta: 1
									});
								} else if (res.cancel) {
									return true; //阻止默认返回行为
								}
							}
						});
					}else{
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

.people-box {

}


.user-name {
	display: inline-block;
	margin-bottom: 20rpx;
}
.people .uni-list-cell input {
	margin-top: 10rpx;
	height: 80rpx;
	border: #000000 solid 1rpx;
}
.people .uni-list-cell view {
	/* width: 100%; */
	margin-bottom: 40rpx;
}
</style>