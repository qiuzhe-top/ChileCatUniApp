<!--
 * @Author: your name
 * @Date: 2021-08-01 09:51:07
 * @LastEditTime: 2021-08-03 18:51:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ChileCat-Vscode-uniapp-project\src\pages\school_attendance\knowing_room.vue
-->
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
	props:{
		init_room_store:String,
		to_page_url:String
	},
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
	mounted() {
		this.init_room();
	},
	methods: {
		// 加载房间数据
		init_room() {
			let task_id = this.$store.getters.task_now.id
			this.$store.dispatch('school_attendance/'+this.$props.init_room_store, {
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
				url: '/pages/school_attendance/'+this.$props.to_page_url
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
@import url('../css/main.scss');
.room {
	padding: 20rpx;
}
</style>
