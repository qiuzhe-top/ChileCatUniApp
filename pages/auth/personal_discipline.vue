<template>
	<view class="u-skeleton">
		<u-notice-bar mode="horizontal" :list="msg" @click="showToast"></u-notice-bar>
		<u-toast ref="uToast" />
		<u-table class="u-m-t-0 ">
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
				list: [],
				loading: !false,
				msg: ['注意: 表格中旷课分数另外计算 当天旷课一次扣3分，旷课两次扣2分']
			}
		},
		onLoad() {
			this.$u.api.school_attendance_personal_discipline_query().then(res => {
				this.list = res.data
			})
		},
		methods: {
			showToast() {
				this.$refs.uToast.show({
					title: this.msg[0],
					type:'warning',
					icon:false,
					duration:4000
				})
			}
		}
	}
</script>

<style>
	p {
		text-align: center;
		margin: 20rpx;
	}
</style>
