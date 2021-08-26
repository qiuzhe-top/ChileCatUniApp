<template>
	<view class="task_car">
		<view class="u-p-t-20 u-p-l-40 ">
			<text class="msg1 u-font-xl ">{{msg1}}</text>
			<view class="my-task u-m-t-40 ">
				<view class="">
					<text class="">
						我的任务
					</text>
				</view>
				<view class="task_size">
					<text class="size">{{vuex_tasks.length}}</text>
					<text>个</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				msg1:'最新通知！\n你有新的任务了',
			}
		}
	}
</script>

<style lang="scss">
	.msg1{
		// font-weight: 500;
		line-height: 60rpx;
	}
	.task_size{
		margin-top: -10px;
		.size{
			font-size: 120rpx;
			font-family: "YouShe";
		}
	}
</style>
