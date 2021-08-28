<template>
	<view class="car u-p-15 b-r-2 pr" >
		<view class="car_img u-flex u-row-right u-col-bottom" :style="car_style">
			<u-image :width="img_size" :height="img_size"  :src="img"> </u-image>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			img: String,
			img_size: String,
			img_h: String,
			opacity: Number
		},
		data() {
			return {
				car_style: {
					// "background-image":"url(" + this.$props.img +")",
					// "background-size": this.$props.img_size,
					"opacity": this.$props.opacity
				},
			}
		}
	}
</script>

<style lang="scss">
	.car {
		box-shadow: 0px 6px 12px 3rpx #f0f0f0;
		background-color: #FFFFFF;
		background-repeat: no-repeat;
		background-position: right bottom;
	}

	.car_img {
		content: "";
		top: 0;

		left: 0;

		bottom: 0;

		right: 0;

		position: absolute;
		background-size: 100rpx;
		z-index: 0;
		// width: 300rpx;
		// height: 300rpx;
		background-repeat: no-repeat;
		background-position: right bottom;
	}
</style>
