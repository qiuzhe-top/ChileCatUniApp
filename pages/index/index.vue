<template>
	
	<view class="content">
		<!-- <img class="img_index" src="../../static/zhcy_index.png" /> -->
		<!-- <view class="img_index">
			
		</view> -->
		<image mode="aspectFit" src="http://ev20.oss-cn-hangzhou.aliyuncs.com/%E6%99%BA%E6%85%A7%E5%BD%A9%E4%BA%91/zhcy_index.png" ></image>
		<!-- <image  src="../../static/5fe9ed6bba4e3d195c91b6634007d6c.png" ></image> -->
		<view class="text-area">
			<view class="title"><navigator url="/pages/knowing/floor" hover-class="navigator-hover">晚查寝</navigator></view>
			<view class="title" @click="msg()">晚自修</view>
			<view class="title" @click="msg()">早签</view>
			<view class="title" @click="msg()">请假</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {
		msg() {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			});
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 10rpx;
	justify-content: center;
}
.img_index {
	width: 200px;
	/* padding-bottom: 150rpx; */
	background-color: #04B8FC;
	background-image: url(../../static/zhcy_index.png) ;
	/* background-size:cover; */
	background-size:contain;
	height: 90rpx;
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
	flex-wrap: wrap;
	width: 80%;
	margin: 0 auto;
	margin-top: 20rpx;
	justify-content: center;
	/* align-items: center; */
}

.title {
	font-size: 36rpx;
	text-align: center;
	color: #ffffff;
	width: 200rpx;
	height: 200rpx;
	line-height: 200rpx;
	/* padding: 50rpx; */
	border-radius: 50%;
	margin: 20rpx;
	background-color: #23c5ff;
}

</style>
