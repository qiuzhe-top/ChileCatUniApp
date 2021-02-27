<template>
	<view class="content">
		<image class="logo u" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">
				uView - 多平台快速开发的UI框架
			</text>
		</view>
		<view class="button-demo u">
			<u-button class="u" :ripple="true">按钮组件演示</u-button>
			<u-button >默认按钮</u-button>
			<u-button type="primary" class="">主要按钮</u-button>
			<u-button type="success">成功按钮</u-button>
			<u-button type="info">信息按钮</u-button>
			<u-button type="warning">警告按钮</u-button>
			<u-button type="error">危险按钮</u-button>
			<u-button plain>披荆</u-button>
			
			<!-- 或者显式设置为true -->
			<u-button :plain="true">斩棘</u-button>
		</view>
		<view class="link-demo u-text-left">
			<u-link :color="$u.color['primary']" :under-line="true" href="http://www.uviewui.com">跳转uView文档：www.uviewui.com</u-link>
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

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		color: $u-content-color;
	}
	
	.button-demo {
		margin-top: 80rpx;
	}
	
	.link-demo {
		margin-top: 80rpx;
	}
</style>
