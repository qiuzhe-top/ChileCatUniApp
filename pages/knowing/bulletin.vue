<template>
	<view class="bulletin">
		今日缺勤名单
		<view class="box" v-for="item in peo_list" v-bind:key="item.id" >
			{{item.stuname}}
			{{item.roomname}}
		</view>
	</view>
</template>


<script>
export default {
	data() {
		return {
			peo_list: []
		};
	},
	onLoad: function(option) {
	this.$api.recordsearch().then(res=>{
		if(res.data.code==2000){
			this.$data.peo_list=res.data.data
			console.log(res)
		}
	})
	}
};
</script>
<style>
</style>
