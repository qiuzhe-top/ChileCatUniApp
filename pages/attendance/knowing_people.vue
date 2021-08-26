<template>
	<view class="people">
	
		<People @record="record" ref="people"  :rule_codename_store='"0#001"' init_people_store="dorm_student_room_info"></People>
		<view class="button-sp-area"><button type="mini" class="sub-button" v-on:tap="submint">提交</button></view>
		<text class="msg">白色背景：学生不在寝室</text>
		
	</view>
</template>

<script>
import People from './component/people.vue';
export default {
	components: {
		People
	},
	data() {
		return {
			form_list:[]
		};
	},
	onLoad: function(option) {
	},
	mounted(){
	},
	methods: {
		// 个人违纪添加
		record(){
			var user_obj = this.$refs.people.user_obj
			var form = this.$refs.people.form
			if (user_obj.reason != undefined) {
				user_obj.status = '0';
				form.push(user_obj)
				uni.showToast({
					title: '添加成功',
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: '添加失败，原因为空',
					icon: 'none'
				});
			}
			this.$data.form_list = form
		},
		// 发送请求
		submint() {
			var d = this.$refs.people.form
			uni.showLoading({
				title: '加载中'
			});
			
			this.$u.api.school_attendance_submit_knowing(  {
				task_id: this.vuex_task.id,
				records:d,
				room_id: this.vuex_room_now.id, 
			 
			} ).then(res => {
				uni.showToast({
					title:"提交成功",
					duration: 6000
				});
				setTimeout(function() {
					uni.navigateBack({
						delta: 0.8
					});
				}, 1000);
			});
		},
	
	},

};
</script>

<style lang="scss">
.people .button-sp-area {
	margin-top: 80rpx;
}
.sub-button {
	width: 60%;
	color: #ffffff;
	background-color: #04b8fc;
}
.msg {
	display: inline-block;
	width: 100%;
	margin: 20rpx;
	color: $uni-text-color-disable;
	text-align: center;
}
</style>
