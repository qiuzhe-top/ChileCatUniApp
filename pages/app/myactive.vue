<template>
	<view class="">
		<view class="active" v-for="(item,index) in actives" :key="index">
			
			<view class="" @click="go_to(item.type,item.id)">
				{{item.title}} {{item.type}}
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
			go_to(type,id) {
				var _url = {
					'0': '/pages/life/floor', // 查寝
					'1': '/pages/life/floor', // 卫生
					// '2': '/pages/life/floor', // 晚自修
				};
				this.$store.commit('life/SET_WORK_TYPE', type);
				uni.navigateTo({
					url: _url[type] + "?id=" + id
				});
			},
			init_actives(){
				this.$api.SchoolAttendance.task_executor().then(res=>{
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
