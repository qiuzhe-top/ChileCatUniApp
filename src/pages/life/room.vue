<template>
	<view class="room">
		<view>
			<view class="title">
				<text>{{ floor.name }}</text>
				<text>{{ layer.name }}</text>
			</view>

			<view class="box">
				<view class="level" v-for="item in room_list" v-bind:key="item.id" v-on:tap="to_people(item)" v-bind:class="{ active: item.status == '1' }">
					{{ layer.name.substr(1, 1) }}{{ item.name }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 楼
			floor: this.$store.getters.floor_now,
			// 层
			layer: this.$store.getters.layer_now,
			// 刷新标识
			flush_flg: false,
			// 房间列表
			room_list: []
		};
	},
	methods: {
		onLoad() {
			this.init_room();
		},
		// 加载房间数据
		init_room() {
			let task_id = this.$store.getters.task_now.id
			this.$store.dispatch('school_attendance/knowing_room_info', {
					task_id:task_id,
					floor_id:this.$data.layer.id,
				}).then(res => {
					var room_list = res.data;
					room_list.sort(function(a, b) {
						return parseInt(a.name) - parseInt(b.name);
					});
					this.$data.room_list = room_list;
			});
			},
		// 跳转到房间列表
		to_people(room) {
			this.$store.commit('school_attendance/SET_ROOM_NOW',room);
			uni.navigateTo({
				url: '/pages/life/people'
			});
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
