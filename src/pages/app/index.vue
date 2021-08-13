<template>
	<view class="u-p-l-30 u-p-r-30 ">
		<view class="" v-if="true">
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-swiper @change="change" :height="300" :list="list" :title="title" :effect3d="effect3d"
					:indicator-pos="indicatorPos" :mode="mode" :interval="10000" @click="click"></u-swiper>
			</view>

			<view class="nav u-m-t-60 u-flex u-flex-wrap u-row-center u-row-around">
				<view class="item" @tap="msg()">
					<u-icon class="icon" name="fangjian1" custom-prefix="custom-icon"></u-icon>
					<view class="u-m-t-10">晚查寝</view>
				</view>
				<view class="item" @tap="msg()">
					<!-- 			<view class="item" @tap="go_to('floor', 'health')"> -->
					<u-icon class="icon" name="saoba1" custom-prefix="custom-icon"></u-icon>
					<view class="u-m-t-10">查卫生</view>
				</view>
				<!-- <view class="item" @tap="go_to('ask')"> -->
				<view class="item" @tap="msg()">
					<u-icon class="icon" name="shenpi" custom-prefix="custom-icon"></u-icon>
					<view class="u-m-t-10">请假</view>
				</view>
				<view class="item " @tap="go_to('bulletin')">
					<u-icon class="icon" name="gonggao1" custom-prefix="custom-icon"></u-icon>
					<view class="u-m-t-10">公告</view>
				</view>
			</view>

			<view class="u-font-xl u-m-t-60 u-font-weight-bold">在线应用</view>
			<u-grid :col="4" class="u-m-t-30  u-row-between" :border="false">
				<u-grid-item @click="msg()">
					<u-icon name="tongxueshangke-" :size="46" custom-prefix="custom-icon"></u-icon>
					<view class="grid-text">晚自修</view>
				</u-grid-item>
				<u-grid-item @click="go_to('activity')">
					<u-icon name="daka" :size="46" custom-prefix="custom-icon"></u-icon>
					<view class="grid-text">活动</view>
				</u-grid-item>
				<u-grid-item @click="go_to('mood')">
					<u-icon name="xinqingdongtai" custom-prefix="custom-icon" :size="46"></u-icon>
					<view class="grid-text">心情分享</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">开发中</view>
				</u-grid-item>
			</u-grid>
		</view>


		<!-- 任务列表 -->
		<myactive ref="my_active"></myactive>
		<!-- <view class="u-font-xl u-m-t-60 u-font-weight-bold">。</view> -->
	</view>
</template>

<script>
	import myactive from './myactive.vue';
	export default {
		data() {
			return {
				list: [{
						image: 'https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210313204642.png',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210313204852.png',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210313204927.png',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				title: false,
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: false
			};
		},
		created() {
			// this.$store.dispatch('user/getIdcode').then(res => {
			// 	console.log(111, res);
			// });
			
		},
		onShow() {
		},
		
		components: {
			myactive
		},
		methods: {
			msg() {
				uni.showToast({
					title: '维护中',
					icon: 'none'
				});
			},
			go_to(key, type) {
				var _url = {
					ask: '/pages/ask/index', // 请假
					floor: '/pages/school_attendance/floor', //进行晚查寝
					bulletin: '/pages/school_attendance/bulletin', // 缺勤公告
					activity: '/pages/app/activity/index', // 活动打卡
					mood: '/pages/app/mood/index' // 缺勤公告
				};
				uni.navigateTo({
					url: _url[key]
				});
			},
			titleChange(index) {
				this.title = index == 0 ? true : false;
			},
			modeChange(index) {
				this.mode = index == 0 ? 'round' : index == 1 ? 'rect' : index == 2 ? 'number' : 'none';
			},
			indicatorPosChange(index) {
				this.indicatorPos = index == 0 ? 'topLeft' : index == 1 ? 'topRight' : index == 2 ? 'bottomLeft' : index ==
					3 ? 'bottomCenter' : 'bottomRight';
			},
			effect3dChange(index) {
				this.effect3d = index == 0 ? true : false;
			},
			click(index) {
				this.$refs.uToast.show({
					title: `点击了第${index + 1}张图片`,
					type: 'success'
				});
			},
			change(index) {
				// console.log(index);
			}
		}
	};
</script>

<style lang="scss">
	.iconfont {
		font-size: 40px;
	}

	.img_index {
		width: 200px;
		/* padding-bottom: 150rpx; */
		background-color: #04b8fc;
		background-image: url(../../static/zhcy_index.png);
		/* background-size:cover; */
		background-size: contain;
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
		font-size: 42rpx;
		text-align: center;
		color: #ffffff;
		width: 150rpx;
		height: 150rpx;
		line-height: 150rpx;
		/* padding: 50rpx; */
		border-radius: 50%;
		margin: 20rpx;
		background-color: #23c5ff;
	}

	.nav {

		// display: flex;
		.item {
			text-align: center;

			.icon {
				$ico-h-w: 100rpx;
				display: inline-block;
				border-radius: 50%;
				width: $ico-h-w;
				height: $ico-h-w;
				line-height: $ico-h-w;
				color: $uni-text-color-inverse;
				font-size: 50rpx;
			}
		}

		.item:nth-child(1) .icon {
			background-color: $u-type-primary;
		}

		.item:nth-child(2) .icon {
			background-color: $u-type-warning;
		}

		.item:nth-child(3) .icon {
			background-color: $u-type-success;
		}

		.item:nth-child(4) .icon {
			background-color: $u-type-error;
		}
	}

	/* 下方这些scss变量为uView内置变量，详见开发  组件-指南-内置样式 */

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
