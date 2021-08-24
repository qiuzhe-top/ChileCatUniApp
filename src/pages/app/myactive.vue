<!--
 * @Author: your name
 * @Date: 2021-08-01 09:51:07
 * @LastEditTime: 2021-08-03 20:05:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ChileCat-Vscode-uniapp-project\src\pages\app\myactive.vue
-->
<template>
	<view class="actives">
		<view class="active" v-for="(item,index) in actives" :key="index">

			<view class="" @click="go_to(item)">
				<span>{{item.title}}</span>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actives: []
			}
		},

		created() {
			this.init_actives()
		},


		methods: {
			go_to(task) {
				var _url = {
					'0': '/pages/school_attendance/knowing_floor', // 查寝
					'1': '/pages/school_attendance/health_floor', // 卫生
					'2': '/pages/school_attendance/late', // 晚自修
				};
				// this.$store.commit('life/SET_WORK_TYPE', task.type);
				this.$store.commit('school_attendance/SET_TASK_NOW', task);
				console.log(task)
				uni.navigateTo({
					url: _url[task.type]
				});

			},
			init_actives() {
				console.log('加载')
				if(this.$store.getters.token){
					this.$store.dispatch('school_attendance/task_executor', ).then(res => {
						this.$data.actives = res.data
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	.active {
		margin-top: 20rpx;
		background-color: #ffffff;
		padding: 50rpx 20rpx;
		box-shadow: 0px 0px 5px gainsboro;

		span {
			color: #232323;
			font-weight: 600;
			font-size: 30rpx;
		}
	}

	.actives {
		padding-bottom: 30rpx;
	}
</style>
