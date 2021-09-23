<template>
	<view class="people-list u-m-t-100 u-flex u-row-between u-col-center u-flex-wrap">
		<view class="door u-text-center" v-if="is_position_mode">
			<view class="level active">
				寝室门
			</view>
		</view>
		<view v-for="(item,index) in people_list" class="box-map u-text-center" v-bind:key="item.id"
			v-on:click="toPeople(item,index)">
			<view class="level" v-bind:class="{ active: item.status == '1' }">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 是否为床位修改模式
			is_position_mode: {
				type: Boolean,
				default: false
			},
			// 请求 store方法
			init_people_store: String,
			// 请求数据
			request_data: Object,
		
		},
		data() {
			return {
				// k-v 床位-住户列表
				people_list: [],
				// 当前用户
				current_user: {}
			}
		},
	
		mounted() {
			this.initBed()
			this.getUser()
		},
		methods: {
			toPeople(item,index){
				this.current_user = index
				this.$emit('to_people')
			},
			getUser(){
				return this.current_user
			},
			// 改变学生样式状态
			updata_style(index,state){
				this.people_list[index].status = state
				this.$set(this.people_list,index,this.people_list[index])
			},
			// 获取 房间 学生数据
			initBed() {
				this.$store.dispatch(this.$props.init_people_store, this.$props.request_data).then(res => {
					let list = res.data
					let len = list.length
					if (len < 6) {
						len = 6
					}
					let NAME_NULL = " 空 位 "
					
					// 初始化床位
					for (let i = 0; i < len; i++) {
						var position = i + 1;
						this.people_list.push({
							"name": NAME_NULL,
							"bed_position": position,
						})
					}
					
					// 没有床位的学生
					var no_beds = []
					
					// 根据学生具体床位值放置到具体位置
					list.forEach(e => {
						var user = {}
						user['user_id'] = e.id
						user['name'] = e.name
						user['status'] = e.status
						user['reason_is_custom'] = false
						user['is_open'] =!e.status// 用作弹窗是否显示
						user['bed_position'] = e.bed_position
						
						var bed_position = Number.parseInt(e.bed_position)
						if(bed_position && bed_position<=len){
							this.people_list[bed_position-1] = this.$u.deepClone(user)
						}else{
							no_beds.push(this.$u.deepClone(user))
						}
					})
					
					// 放置没有床位的学生 
					for (let i = 0; i < this.people_list.length; i++) {
						if(this.people_list[i].name==NAME_NULL && no_beds.length!=0){
							var user = no_beds.shift()
							user.bed_position = i+1
							this.people_list[i] = user 
						}
					}
					
				})
			},
		}
	}
</script>

<style>
	.box-map {
		width: 50%;
	}

	.active {
		background-color: #04b8fc;
		color: #f1f1f1;
	}

	.level {
		min-width: 234rpx;
		padding: 25rpx 60rpx;
		margin-bottom: 60rpx;
		margin-right: 15rpx;
		display: inline-block;
		box-shadow: #c3c3c3 1px 1px 10px;
	}

	.door {
		width: 100%;
	}
</style>
