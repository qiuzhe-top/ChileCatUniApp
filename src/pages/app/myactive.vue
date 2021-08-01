<template>
	<view class="">
		<view class="" class="active" v-for="(item,index) in actives" :key="index">
			
			<view class="" @click="go_to(item)">
				{{item.title}}
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				actives:[
				]
			}
		},
		onShow() {
			console.log('onShow')
			this.init_actives()
		},
		created() {
			this.init_actives()
		},
		methods:{
			go_to(task) {
				var _url = {
					'0': '/pages/life/floor', // 查寝
					'1': '/pages/life/floor', // 卫生
					'2': '/pages/life/late', // 晚自修
				};
				// this.$store.commit('life/SET_WORK_TYPE', task.type);
				this.$store.commit('school_attendance/SET_TASK_NOW', task);
				uni.navigateTo({
					url: _url[task.type]
				});
				
			},
			init_actives(){
				this.$store.dispatch('school_attendance/task_executor',).then(res => {
					this.$data.actives = res.data
				})
			}
		}
	}
</script>

<style>
	.active view{
		height: 60rpx;
		margin-bottom: 20rpx;
		background-color: #d3d9ff;
		padding: 40rpx 5px;
	}
</style>
