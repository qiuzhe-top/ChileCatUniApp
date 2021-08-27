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
			// 获取 房间 学生数据
			initBed() {
				this.$store.dispatch(this.$props.init_people_store, this.$props.request_data).then(res => {
					let list = res.data
					let len = list.length
					if (len < 6) {
						len = 6
					}
					// 床铺位置排序
					for (let i = 0; i < len; i++) {
						var position = i + 1;
						var user = {
							"name": " 空 位 ",
							"bed_position": position,
						}
						list.forEach(e => {
							if (e.bed_position === position) {
								user['user_id'] = e.id
								user['name'] = e.name
								user['status'] = e.status
								user['reason_is_custom'] = false
								// 用作弹窗是否显示
								user['is_open'] =!e.status
							}
						})
						this.people_list.push(user)
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
