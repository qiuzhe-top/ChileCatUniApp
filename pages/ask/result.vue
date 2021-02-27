<template>
	<view class="result ">
		
		<view class="img u-text-center u-padding-60">
			<u-icon size="160" color="#2979ff" name="checkbox-mark"></u-icon>
		</view>
		
		<view class="title u-font-lg u-text-center u-p-50">
			{{msg[flg]}}
			
		</view>
		<u-button type="primary" class="u-m-50" @tap="to_index()">回到主页</u-button>
		<!-- <button type="default" @tap="to_back()">返回</button> -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				flg:0,
				msg:[
					'请假成功',
					'撤销成功',
					'续假成功',
				]
			}
		},
		onLoad: function(option) {
			this.$data.flg = option.flg
		},
		methods:{
			to_back(){
				uni.navigateBack({
				    delta: 1
				});
			},
			to_index(){
				uni.redirectTo({
					url:'/pages/ask/index'
				})
			}
		}
	}
</script>

<style>
</style>
