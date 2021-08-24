<template>
	<view class="user_car ">
		<view class="u-flex u-col-top u-row-between">

			<view class="u-flex">
				<!-- 头像 -->
				<u-image class="u-skeleton-rect" :width="portrait_height" :height="portrait_height" :src="user.url"></u-image>
				<!-- 个人信息 -->
				<view class="username u-flex u-flex-col u-row-center u-m-l-30 ">
					<text class="name u-font-xl u-m-b-10 u-main-color u-skeleton-rect">Hello、{{user.name}}</text>
					<view class="organization u-type-info u-skeleton-rect">
						<u-icon name="map u-m-r-5"></u-icon>
						<text class="u-font-xs">{{user.school}}{{user.sorting}}{{user.class}}班</text>
					</view>
				</view>
			</view>

			<!-- 设置 -->
			<view class="set">
				<u-icon name="setting"></u-icon>
			</view>

		</view>

		<!-- 进度条 -->
		<view class="progress u-m-b-20">
			<u-line-progress class="u-skeleton-rect" active-color="#7EB9FC" :percent="40" :show-percent="false" :height="8"></u-line-progress>
			<view class="u-flex u-row-between u-font-xs u-type-info ">
				<text>我的经验</text>
				<text>50/150</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: '张竣涛',
					school: '浙江交通',
					sorting: '智慧交通学院',
					class: '195101',
					url: 'https://s.pc.qq.com/tousu/img/20210823/4865226_1629724433.jpg'
				},
				portrait_height: '150rpx',
			}
		},
	
		created() {
			// 通过延时模拟向后端请求数据，调隐藏骨架屏
			
		}
	}
</script>


<style lang="scss">
	.user_car {
		.username {
			height: 180rpx;
			align-items: flex-start;

			.name {
				font-weight: 800;
			}

			.organization {}
		}

		.set {
			$h: 70rpx;
			width: $h;
			height: $h;
			text-align: center;
			line-height: $h;
		}

		.progress {
			width: 70%;
			margin-top: -8rpx;
		}
	}
</style>
