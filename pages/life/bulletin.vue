<template>
	<view class="bulletin">
		<image class="img_index" src="../../static/zhcy_index.png" mode="aspectFit"></image>
		<text class="title">今日缺勤名单</text>
		<text class="time">{{time}}</text>
		<view class="box" v-for="item in peo_list" v-bind:key="item.id">{{ item.stuname }} {{ item.roomname }}</view>
		<view class="box">
			<t-table @change="change">
				<t-tr>
					<t-th>寝室</t-th>
					<t-th>学号</t-th>
					<t-th>姓名</t-th>
					<t-th>原因</t-th>
				</t-tr>
				<t-tr v-for="item in tableList" :key="item.id">
					<t-td>{{ item.roomname }}</t-td>
					<t-td>{{ item.stuid }}</t-td>
					<t-td>{{ item.stuname }}</t-td>
					<t-td>{{ item.reason }}</t-td>
				</t-tr>
			</t-table>
		</view>
	</view>
</template>

<script>
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';
import api from '@/common/vmeitime-http/index.js'
export default {
	components: {
		tTable,
		tTh,
		tTr,
		tTd
	},
	data() {
		return {
			peo_list: [],
			tableList: [],
			time:'2021-01-12'
		};
	},
	onLoad: function(option) {
		api.life.bulletin_life().then(res=>{
			this.$data.tableList = res.data.data;
			if(res.data.data.length<=0)return
			var time_ = res.data.data[0].createdtime
			var index = time_.indexOf('T')
			this.$data.time = time_.substring(0,index)
			// console.log(res.data.data[0].createdtime.indexOf('T'));
		})
	}
};
</script>
<style>
	.title{
		display: block;
		width: 100%;
		font-size: 40rpx;
		text-align: center;
		margin-top: 60rpx;
		margin-bottom: 20rpx;
		
	}
	.time{
		display: block;
		width: 100%;
		text-align: center;
		margin-bottom: 20rpx;
		font-size: 30rpx;
	}
	.bulletin{
		text-align: center;
		padding: 0 20rpx;
	}
	.img_index{
		height: 100rpx;
		/* width: 500rpx; */
		margin-top: 50rpx;
		/* padding-bottom: 10rpx; */
	}
</style>
