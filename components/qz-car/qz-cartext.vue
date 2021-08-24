<template>
	<view class="car u-p-15 b-r-2 pr" :style="car_style">
		<slot ></slot>
	</view>
</template>

<script>
	export default {
		props:{
			img:String,
			img_size:String,
			img_h:String,
		},
		data(){
			return{
				car_style:{
					"background-image":"url(" + this.$props.img +")",
					"background-size":this.$props.img_size
				}
			}
		}
	}
</script>

<style lang="scss">
	.car{
		box-shadow: 0px 6px 12px 3rpx #f0f0f0; 
		background-color: #FFFFFF;
		background-repeat: no-repeat;
		background-position: right bottom;
	}
</style>
