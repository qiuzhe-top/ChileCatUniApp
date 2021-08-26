<template>
	<view class="floor">
		<!-- 楼=>层 列表展示 -->
		{{vuex_floor_now}}
		{{vuex_layer_now}}
		<view v-for="item in floor_list" v-bind:key="item.id">
			<view class="title">{{ item.name }}</view>
			<view class="box">
				<view class="level" v-for="item2 in item.list" v-bind:key="item2.id" v-on:tap="to_room(item, item2)">
					{{ item2.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 楼层数据
				floor_list: []
			};
		},
		mounted() {
			this.init_floor();
		},
		methods: {
			// 加载楼层数据

			init_floor() {
				this.$u.api.school_attendance_dorm_storey_info({
					task_id: this.vuex_task.id
				}).then(res => {
					this.$data.floor_list = res.data;
				})
			},

			// 跳转到房间列表
			to_room(floor, layer) {
				this.$store.dispatch('save', ['vuex_floor_now',{
					id: floor.id,
					name: floor.name
				}])
				this.$store.dispatch('save', ['vuex_layer_now',{
					id: layer.id,
					name: layer.name
				}])
				// uni.navigateTo({
				// 	url: '/pages/school_attendance/' + this.$props.room_url
				// });
			}
		}
	};
</script>

<style lang="scss">
	@import url('./css/main.scss');

	.floor {
		padding: 20rpx;
	}
</style>
