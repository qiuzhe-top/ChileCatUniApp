<template>
	<view class="room">
		<view class="title">
			<text>{{ vuex_floor_now.name }}</text>
			<text>{{ vuex_layer_now.name }}</text>
		</view>
		<view class="box">
			<view class="level" v-for="item in room_list" v-bind:key="item.id" v-on:tap="to_people(item)"
				v-bind:class="{ active: item.status == '1' }">
				{{ vuex_layer_now.name.substr(1, 1) }}{{ item.name }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 刷新标识
				flush_flg: false,
				// 房间列表
				room_list: []
			};
		},
		onLoad() {
			this.init_room();
		},
		methods: {
			// 加载房间数据
			init_room() {
				let task_id = this.vuex_task.id
				this.$u.api.school_attendance_dorm_room_info({
					task_id: this.vuex_task.id,
					floor_id:this.vuex_layer_now.id,
				}).then(res=>{
					var room_list = res.data;
					room_list.sort(function(a, b) {
						return parseInt(a.name) - parseInt(b.name);
					});
					this.room_list = room_list;
				})
			},
			// 跳转到房间列表
			to_people(room) {
				this.$store.dispatch('save', ['vuex_room_now',room])
				var d = {
					'0':'knowing_people',
					'1':'health_people'
				}
				this.$u.route('/pages/attendance/'+d[this.vuex_task.type])
			}
		},
		onHide() {
			this.$data.flush_flg = true;
		},
		onShow() {
			if (this.$data.flush_flg) {
				this.$data.flush_flg = false;
				this.init_room();
			}
		}

	};
</script>

<style>
	@import url('./css/main.scss');

	.room {
		padding: 20rpx;
	}
</style>
