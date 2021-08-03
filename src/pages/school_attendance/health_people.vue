<!--
 * @Author: your name
 * @Date: 2021-08-01 09:51:07
 * @LastEditTime: 2021-08-03 20:16:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ChileCat-Vscode-uniapp-project\src\pages\school_attendance\knowing_people.vue
-->
<template>
	<view class="people">
		<People @record="record" ref="people" :rule_codename_store='"0#001"' :init_people_store="'knowing_student_room_info'"></People>
		
		<view class="button-sp-area"><button type="mini" class="sub-button" v-on:tap="submint">提交</button></view>
			<view class="button-sp-area">
			<button type="mini" class="sub-button" v-on:tap="showTree">
				卫生扣分
				<text v-show="score != 0">（-{{ score }}）</text>
			</button>
		</view>
		
		
		<tki-tree
			ref="tkitree"
			:selectParent="selectParent"
			:multiple="multiple"
			:range="dorm_point_rules"
			:foldAll="flod"
			rangeKey="name"
			@confirm="treeConfirm"
			@cancel="treeCancel"
		></tki-tree>
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
			// 寝室分数
			score: 0,
				// 切换单、多选
			multiple: true,
			// 切换父级可选
			selectParent: false,
			// 折叠已打开的子集
			flod: false,
			// 寝室卫生扣分规则
			dorm_point_rules: [
				{
					id: 6,
					name: '扣分4'
				},
				{
					id: 6,
					name: '扣分4'
				},
				{
					id: 6,
					name: '扣分4'
				},
				{
					id: 6,
					name: '扣分4'
				},
				{
					id: 6,
					name: '扣分4'
				},
				
			],
		};
	},
	onLoad: function(option) {

	},
	methods: {
		// 个人违纪添加
		record(){
			var user_obj = this.$refs.people.user_obj
			var form = this.$refs.people.form
			if (user_obj.reason != undefined) {
				form.push({
					user_id: user_obj.id,
					status: user_obj.status,
					reason: user_obj.reason,
					name:user_obj.name
				});
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
		},

				// 显示树形选择器
		showTree() {
			this.$refs.tkitree._show();
		},
			// 确定回调事件
		treeConfirm(e) {
			console.log(e);
		},
		// 取消回调事件
		treeCancel(e) {
			console.log(e);
		}
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
