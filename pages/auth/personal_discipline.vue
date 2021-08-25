<template>
	<view>
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
				list:[{
					rule_str:'迟到',
					score:'1',
					worker:'李明',
					star_time:'2021 10.20'
				}]
			}
		},
		onLoad() {
			this.personal_discipline_query()
		},
		methods: {
			personal_discipline_query() {
				this.$u.api.school_attendance_personal_discipline_query().then(res=>{
					this.list = res.data
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
