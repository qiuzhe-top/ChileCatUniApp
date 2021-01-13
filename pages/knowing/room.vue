<template>
	<view class="room">
		<!-- 输入验证码 -->
		<uni-popup ref="dialogInput" type="dialog" @change="change">
			<uni-popup-dialog mode="input" title="输入验证码" value="" placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>

		<view >
			<view class="title">
				<text>{{floor_name}}</text>
				<text>{{room_name}}</text>
			</view>
			<view class="room-box">
				<view v-for="item in room_list" v-bind:key="item.id" v-on:tap="to_people(item.id)">
				<view class="level"  v-bind:class="{ active: item.status=='1' }" >
				{{ item.name }}
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			floor_name:'',
			room_name:'',
			floor_id:'',
			floor_id_flg:'',
			room_list: []
		};
	},
	methods:{
		// 加载楼层数据
		init_room(id){
			this.$api.roominfo({id:id}).then(res=>{
				if(res.data.code==2000){
					this.$data.room_list=res.data.data
				}
			})
		},
		// 跳转到房间列表
		to_people(id){
			// console.log(floor,room)
			uni.navigateTo({
				url:"/pages/knowing/people?id="+id,
			})
		}
	},	
	onHide(){
		this.$data.floor_id_flg = true
		console.log(true)
	},
	onShow(){
		console.log(this.$data.floor_id)
		
		if(this.$data.floor_id_flg){
			this.$data.floor_id_flg = false
			console.log("加载数据")
			this.init_room(this.$data.floor_id)
			console.log(666)
		}
		
	},
	onLoad: function(option) {
		this.$data.floor_id_flg = false
		console.log(false)
		this.init_room(option.id)
		this.floor_name = option.floor_name 
		this.floor_id = option.id 
		this.room_name = option.room_name 
	}
};
</script>

<style>
	.room {
		padding: 20rpx;
	}
	.room .title {
		font-size: 56rpx;
		color: #3da7cf;
	}
	.room-box {
		--webkit-display: flex;
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		align-items: center;
	}
	.room-box .level {
	padding: 10rpx 40rpx;
	margin: 10px 0;
	margin-right: 7px;
	display: inline-block;
	box-shadow: #e8e8e8 1px 1px 10px;
	}
	.active{
		color: #FFFFFF;
		background-color: #04b8fc;
	}
</style>
