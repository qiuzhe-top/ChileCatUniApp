<template>
	<view class="people">

	
		<People :rule_codename_store='"0#001"' :init_people_store="'knowing_student_room_info'"></People>
		<!-- <view class="button-sp-area" v-if="work_type == 'health'">
			<button type="mini" class="sub-button" v-on:tap="showTree">
				卫生扣分
				<text v-show="score != 0">（-{{ score }}）</text>
			</button>
		</view> -->
		<view class="button-sp-area"><button type="mini" class="sub-button" v-on:tap="submint">提交</button></view>
		<text class="msg">白色背景：学生不在寝室</text>


	</view>
</template>

<script>
import pop from '@/components/ming-pop/ming-pop.vue';
import People from './component/people.vue';
export default {
	components: {
		pop,
		People
	},
	data() {
		return {
			// 缺勤名单
			// form: [],
			// 用户卫生扣分名单
			user_points: [],
			// 用户扣分规则
			user_point_rules: [],
		
			msgType: '',
			// 房间id
			rommid: '',
			// 学生缺勤原因
			reason: '',
			// 生活部工作类型
			work_type: this.$store.getters.work_type, //'health', //

	
			miss_items: ['请假', '当兵','未到校','无故'],
			current: 0,

	
		

		};
	},
	onLoad: function(option) {

	},
	methods: {
	
	

		// 发送请求
		submint() {
			var d = this.$data.form;

		
			console.log(d);
			// return
			uni.showLoading({
				title: '加载中'
			});
			this.$store.dispatch('school_attendance/submit_knowing', {
				task_id: this.$store.getters.task_now.id,
				user_list:d,
				room_id: this.$store.getters.room_now.id, 
			 
			}).then(res => {
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

			// this.$data.form=[]
		},


	},

};
</script>

<style lang="scss">
.people {
	padding-top: 20rpx;
	.title {
		text-align: right;
		padding-right: 40rpx;
		color: red;
	}
}



.people .popup-content {
	width: 90%;
	background-color: #fff;
	padding: 30rpx;
}

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
