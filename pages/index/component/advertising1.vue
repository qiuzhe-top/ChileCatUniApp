<template>
	<view class="advertising">
		<qz-car>
			<view class="u-p-15">
				<view class="u-font-33 u-font-weight u-m-b-10">嗨喽，同学！</view>
				<text >
					EIC是一个集物联网嵌入式，web前端，云计算，等于一身的可爱协会！
					只要你对电子信息，计算机等方面感兴趣，都可以加入我们。
					一起来探索电子信息的奥秘！
				</text>

				<u-image class="msg u-m-t-30" mode="widthFix" :src="src">
				</u-image>
			</view>
		</qz-car>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				src:'https://zhcy-zjjt.oss-cn-beijing.aliyuncs.com/icon/zx1.png'
			}
		}
	}
</script>

<style>
	.msg {
		line-height: 20rpx;
	}
</style>
