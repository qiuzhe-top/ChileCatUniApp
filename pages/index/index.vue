<template>
	<view class="content">
		<image class="logo" src=""></image>
		<view class="text-area">
			
			<view class="title">  
				<navigator url="/pages/knowing/floor" hover-class="navigator-hover">
					晚查寝
				</navigator>
			</view>
			
			<view class="title" @click="msg()">晚自修</view>
			<view class="title" @click="msg()">早签</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			
		},
		methods: {
			msg(){
				uni.showToast({
					title:"功能开发中",
					icon:"none"
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 120rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		/* flex-direction: column; */
		justify-content: space-between;
		align-items: center;
		
	}

	.title {
		font-size: 36rpx;
		text-align: center;
		color: #FFFFFF;
		width: 200rpx;
		height: 200rpx;
		line-height: 200rpx;
		/* padding: 50rpx; */
		border-radius: 50%;
		margin: 20rpx;
		background-color: #23c5ff;
	}
</style>
