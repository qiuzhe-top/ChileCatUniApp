<template>
	<view class="history">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange"  ></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">...</scroll-view>
			</swiper-item>
		</swiper>
		
	<!-- 	我的请假条：
		<view class="active">
			<view v-for="item in this.$store.getters.ask_all[type]" v-bind:key="item.id" @tap="to_details(item.id)">{{ item.id }} {{ item.students_name }}</view>
		</view>
		班级请假条：
		<view v-for="item in ask_class" v-bind:key="item.id" @tap="to_details(item.id)">{{ item.id }} {{ item.students_name }}</view>
		 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 请假条（班级）
			ask_class: [],
			type: '',
			list: [
				{
					name: '待收货'
				},
				{
					name: '待付款'
				},
				{
					name: '待评价',
					count: 5
				}
			],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
		};
	},
	onLoad() {
		this.draft_get();
		this.draft_class_get();
	},
	methods: {
		draft_get() {
			this.$store.dispatch('ask/draft_get', { type: this.$data.type }).then(res => {});
		},
		draft_class_get() {
			this.$store.dispatch('ask/draft_get', { type: this.$data.type, monitor: 1 }).then(res => {
				this.$data.ask_class = res.data.list;
			});
		},
		to_details(id) {
			console.log('开始调用', id);
			uni.navigateTo({
				url: '/pages/ask/details?id=' + id
			});
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		// scroll-view到底部加载更多
		onreachBottom() {}
	}
};
</script>

<style></style>
