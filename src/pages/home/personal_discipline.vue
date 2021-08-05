<template>
	<view class="">
		<div v-for="item in list" :key="item.id">
			<p> 
				{{ item.rule_str }}
				{{ item.score }}
				{{ item.worker }}
				{{ item.star_time }}
			</p>
		</div>
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
