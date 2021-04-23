<template>
	<view class="">
		<view class="active" v-for="(item,index) in actives" :key="index">
			
			<view class="" @click="go_to(item.type)">
				{{item.title}}{{item.type}}
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				actives:[
					{
						active_name:'',
						grade_name:'',
					}
				]
			}
		},
		created() {
			this.init_actives()
		},
		methods:{
			go_to(type) {
				var _url = {
					'floor-dorm': '/pages/life/floor', // 查寝
					'floor-health': '/pages/life/floor', // 卫生
					// 'evening_study': '/pages/life/floor', // 晚自修
				};
				this.$store.commit('life/SET_WORK_TYPE', type);
				uni.navigateTo({
					url: _url[type]
				});
			},
			init_actives(){
				this.$api.activity.myactive({role:"attendance_worker"}).then(res=>{
					this.$data.actives = res.data.data
				})
			}
		}
	}
</script>

<style>
	.active view{
		height: 60rpx;
		margin-bottom: 20rpx;
		background-color: #dddddd;
	}
</style>
