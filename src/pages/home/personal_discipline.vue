<template>
	<view class="">
			<u-table>
				<u-tr>
					<u-th>原因</u-th>
					<u-th>分数</u-th>
					<u-th>执行人</u-th>
					<u-th  width="300rpx">时间</u-th>
				</u-tr>
				
				<u-tr v-for="item in list" :key="item.id">
						<u-td>{{ item.rule_str }}</u-td>
						<u-td>{{ item.score }}</u-td>
						<u-td>{{ item.worker }}</u-td>
						<u-td width="300rpx">{{ item.star_time }}</u-td>
				</u-tr>		
			</u-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.personal_discipline_query()
		},
		methods: {
			personal_discipline_query() {
				this.$store.dispatch('school_attendance/personal_discipline_query').then(res => {
					console.log(res)
					this.list = res.data
					})
					.catch(e => {
					})
			}
		}
	}
</script>

<style>
	p{
		text-align: center;
		margin: 20rpx;
	}
</style>
