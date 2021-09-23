<template>
	<view class="u-skeleton">
			<u-table class="u-m-t-0 " >
				<u-tr>
					<u-th  width="280rpx">原因</u-th>
					<u-th>分数</u-th>
					<u-th>姓名</u-th>
					<u-th width="250rpx">时间</u-th>
				</u-tr>
				<u-tr v-for="item in list" :key="item.id">
						<u-td width="280rpx">{{ item.rule_str }}</u-td>
						<u-td>{{ item.score }}</u-td>
						<u-td>{{ item.student_approved }}</u-td>
						<u-td width="250rpx">{{ item.star_time }}</u-td>
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
			this.$u.api.school_attendance_personal_discipline_query({room:true}).then(res=>{
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
