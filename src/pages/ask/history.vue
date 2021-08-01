<template>
	<view>
		<view class="wrap">
			<view v-if="msg">
				<!-- {{msg[0]['id']}} -->
			</view>
			<view class="u-tabs-box"><u-tabs-swiper ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper></view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-for="item in this.$store.getters.ask_all[0]" v-bind:key="item.id" @tap="to_details(item)">
								<view class="ask-box">
									<view class="t1">
										{{ item.ask_type }}
									</view>
									<view class="t2">
										{{item.start_time}}
										{{item.end_time}}
									</view>
									<view class="t3">
										<text>{{item.reason}}</text>
										<text>{{item.status}}</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-for="item in this.$store.getters.ask_all[1]" v-bind:key="item.id" @tap="to_details(item)">
								<view class="ask-box">
									<view class="t1">
										{{ item.ask_type }}
									</view>
									<view class="t2">
										{{item.start_time}}
										{{item.end_time}}
									</view>
									<view class="t3">
										<text>{{item.reason}}</text>
										<text>{{item.status}}</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<text class="u-font-sm u-light-color u-text-center u-m-b-10">左右滑动试试</text>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			msg: '',
			list: [
				{
					name: '审核中'
				},
				{
					name: '完成'
				}
			],
			current: 0,
			// 当前页码
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0
		};
	},
	computed:{
	},
	onLoad: function() {
		this.draft_get();
	},
	methods: {
		draft_get() {
			this.$store.dispatch('ask/draft_get', { type: 0 });
			this.$store.dispatch('ask/draft_get', { type: 1 });
			setTimeout(
				() => {
					this.msg = this.$store.getters.ask_all
			   },500)
		},
		to_details(item) {
			this.$store.commit('ask/SET_ASK_NOW',item)
			uni.navigateTo({
				url: '/pages/ask/details'
			});
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		reachBottom(){
			
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
page{
	// padding: 0 20rpx 0 20rpx;
	background-color: $uni-bg-color-light;
}
.ask-box{
	background-color: $uni-bg-color;
	margin: 10rpx;
	padding: 30rpx;
	.t1{
		font-size: $uni-font-size-max;
		font-weight: bold;
	}
	.t2{
		margin: 20rpx 0;
		color: $uni-text-color-grey;
	}
	.t3{
		display: flex;
		justify-content: space-between;
		color: $uni-text-color-grey;
	}
}
</style>
