<template>
	<view class="u-p-30">
		<view class="card ">
			<u-button :hair-line="false" :ripple="true" v-on:click="go_to('/pages/ask/froms')">请假申请</u-button>
		</view>
			
		<view class="card ">
			<u-button :hair-line="false" :ripple="true" v-on:click="go_to('/pages/ask/history')">申请列表</u-button>
		</view>
		<view class="card ">
			<u-button :hair-line="false" :ripple="true" v-on:click="go_to_monitor('/pages/ask/history')">班级列表</u-button>
		</view>
								
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		
	},
	methods: {
		go_to(url){
			this.$store.commit('ask/SET_MONITOR','')
			uni.navigateTo({
				url
			})
		},
		go_to_monitor(url){
			this.$store.commit('ask/SET_MONITOR',1)
			uni.navigateTo({
				url
			})
		}
	}
};
</script>
<style lang="scss">
page {
	background-color: $u-type-info-light;
}
.card {
	// box-shadow: #18b566 1px 1px 1px;

	text-align: right;
	padding: 200rpx 90rpx 112rpx 0rpx;
	border-radius: 16rpx;
	background-repeat: no-repeat;
	background-color: #ffffff;
	box-shadow: 0px 6px 16px #dddddd;
	background-size: contain;
	margin-bottom: 60rpx;
	button {
		width: 200rpx;
		$box-height:70rpx;
		height: $box-height;
		margin-right: 0px;
		border-radius: $box-height/2;
		color: $uni-text-color-inverse;
		background-color: $u-type-primary;
		border: 0;
	}
}
.card:nth-child(1) {
	background-image: url('https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/无记录.png');
}
.card:nth-child(2) {
	background-image: url('https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/查看文件.png');
}
.card:nth-child(3) {
	background-image: url('https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/查看文件.png');
}
</style>
