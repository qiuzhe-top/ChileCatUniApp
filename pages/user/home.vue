<template>
	<view class="home">
		个人中心
		<button class="logout" v-on:tap="logout()" type="default">退出登录</button>
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
		logout() {
			uni.setStorageSync('idcode', '');
			uni.setStorageSync('token', '');
			uni.reLaunch({
				url: '/pages/login/login'
			});
		}
	}
};
</script>

<style>
	.logout{
		position: absolute;
		width: 100%;
		margin: auto;
		/* margin-bottom: 0px; */
		bottom: 50rpx;
	}
</style>
