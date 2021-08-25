<template>
	<view class="u-skeleton">
			<u-table class="u-m-t-0 " >
				<u-tr>
					<u-th>原因</u-th>
					<u-th>分数</u-th>
					<u-th>执行人</u-th>
					<u-th width="300rpx">时间</u-th>
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
				list:[],
				loading:!false
			}
		},
		onLoad() {
			this.$u.api.school_attendance_personal_discipline_query().then(res=>{
				this.list = res.data
			})
		},
	}
</script>

<style>
	p{
		text-align: center;
		margin: 20rpx;
	}
</style>
