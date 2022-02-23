<template>
	<transition name="fade">
		<view class="people-list  u-p-t-100 u-flex u-row-between u-col-center u-flex-wrap">
			<view class="door u-text-center" >
				<view class="level active">
					寝室门
				</view>
			</view>
			<view v-for="(item,index) in people_list" class="box-map u-text-center" v-bind:key="item.id"
				v-on:click="toPeople(item,index)">
				<view class="level"
					v-bind:class="{ 
						active: class_status(item.user_id) == '1'  ,
						error:  class_status(item.user_id) == '2' 
						}"
					>
					{{ item.name }} </view>
			</view>
		</view>
	</transition>
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
			init_people_store: {
				type: String,
				default: ''
			},
			// 请求数据
			request_data: Object,

		},
		data() {
			return {
				// k-v 床位-住户列表
				people_list: [{
						'name': ' 空 位 ',
						'user_id':-1,
					},
					{
						'name': ' 空 位 ',
						'user_id':-1,
					},
					{
						'name': ' 空 位 ',
						'user_id':-1,
					},
					{
						'name': ' 空 位 ',
						'user_id':-1,
					},
					{
						'name': ' 空 位 ',
						'user_id':-1,
					},
					{
						'name': ' 空 位 ',
						'user_id':-1,
					}
				],
				// 当前用户
				current_user: {},
				b: '',
				f: '',
				type: '',
			}
		},

		mounted() {
			if (this.$props.init_people_store == 'cache') {
				this.initCacheBed()
			this.current_floor_information()
			} else {
				this.initBed()
			}
			this.getUser()
		},
		methods: {
			// 返回学生状态样式
			class_status(username) {
				if (this.$props.is_position_mode){return '1'}
				if(username==-1){return '0'}
				var style = this.get_user_status(username)
				if(style!='1' && style!="0"){style='2'}
				return style
			},
			get_user_status(username){
				if(username==-1){return '0'}
				return this.vuex_call[this.type][this.b+this.f][this.r][username]
			},
			// 当前楼层信息
			current_floor_information(){
				this.b = this.vuex_floor_now.id + "#"
				this.f = this.vuex_layer_now.id + ''
				this.r = this.vuex_room_now.substr(3, 4)
				this.type = this.vuex_task.type
			},
			toPeople(item, index) {
				this.current_user = index
				this.$emit('to_people')
			},
			getUser() {
				return this.current_user
			},
			// 改变学生样式状态
			updata_style(index, status) {
				var username = this.people_list[index]['user_id']
				var k1 = '.'+this.type
				var k2 = '.'+this.b+this.f
				var k3 = '.'+this.r
				var k4 = '.'+username
				this.$store.dispatch('save', ['vuex_call'+k1+k2+k3+k4, status]);
				// this.$set(this.people_list, index, this.people_list[index])
			},
			// 整理学生信息
			organize_student_information(list) {
				let len = list.length
				if (len < 6) {
					len = 6
				}
				let NAME_NULL = " 空 位 "
				this.people_list = []

				// 初始化床位
				for (let i = 0; i < len; i++) {
					var position = i + 1;
					this.people_list.push({
						"name": NAME_NULL,
						"user_id" : -1,
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
					user['is_open'] = !e.status // 用作弹窗是否显示
					user['bed_position'] = e.bed_position
					
					//获取床位
					var bed_position = Number.parseInt(e.bed_position)
					if (bed_position && bed_position <= len) {
						// 有床位就按照床位覆盖people_list
						this.people_list[bed_position - 1] = this.$u.deepClone(user)
					} else {
						// 没有床位先放到nobeds列表
						no_beds.push(this.$u.deepClone(user))
					}
				})
				// 放置没有床位的学生 
				for (let i = 0; i < this.people_list.length; i++) {
					// 判断当前位置是否为空 判断nobads是否还有值
					if (this.people_list[i].name == NAME_NULL && no_beds.length != 0) {
						// 取出一个
						var user = no_beds.shift()
						// 计算床位下标
						user.bed_position = i + 1
						// 学生放置指定位置 
						this.people_list[i] = user
					}
				}
			},
			initCacheBed() {
				var data = this.vuex_room_user_info[this.vuex_room_now]
				var list = []
				for (var k in data) {
					list.push(data[k])
				}
				this.organize_student_information(list)
			},
			// 获取 房间 学生数据
			initBed() {
				this.$store.dispatch(this.$props.init_people_store, this.$props.request_data).then(res => {
					this.organize_student_information(res.data)

				})
			},
		}
	}
</script>

<style>
	.box-map {
		width: 50%;
	}

	.error {
		background-color: #ff557f;
		color: #f1f1f1;
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
