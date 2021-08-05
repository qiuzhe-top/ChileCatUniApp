<template>
	<view class="people-list">
		<view class="door" v-if="is_position_mode">
			<view class="level active">
				寝室门
			</view>
		</view>
		<view v-for="(item,index) in people_list" class="box-map" v-bind:key="item.id" v-on:tap="$emit('to_people',item)">
			<view class="level" v-bind:class="{ active: item.status == '1' }">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			is_position_mode:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				// k-v 床位-住户列表
				people_list:[]
			}
		},
		mounted(){
			this.initBed()
		},
		methods:{
			initBed(){
				let len = this.$store.getters.room_peoples.length
				if (len < 6){
					len = 6
				}
				// 床铺位置排序
				for (let i = 0; i < len; i++) {
					var position = i+1;
					var user = this.getUserByBed(position)
					this.people_list.push(user)
				}
			},
			getUserByBed(position){
				var user = {"name":" 空 位 "}
				this.$store.getters.room_peoples.forEach(e=>{
					if (e.bed_position===position){
						user['id'] = e.id
						user['name'] = e.name
						user['bed_position'] = position
						user['status'] = e.status
					}
				})
				return user
			}
		}
	}
</script>

<style>
.people-list {
	--webkit-display: flex;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	margin-top: 100rpx;
}

	.box-map {
		width: 50%;
		text-align: center;
	}
	.active {
		background-color: #04b8fc;
		color: #f1f1f1;
	}
	.level {
		min-width: 110rpx;
		padding: 25rpx 60rpx;
		margin-bottom: 60rpx;
		margin-right: 15rpx;
		display: inline-block;
		box-shadow: #c3c3c3 1px 1px 10px;
		
	}
	.door{
		width: 100%;
		text-align: center;
	}
</style>
