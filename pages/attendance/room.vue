<template>
	<view class="room">
		<view class="title">
			<text>{{ vuex_floor_now.name }}号楼</text>
			<text>{{ vuex_layer_now.name }}层</text>
		</view>
		<u-row gutter="1">
			<u-col span="3" v-for="item in room_list">
				<view class="level" v-bind:key="item" v-on:tap="to_people(item)"
					v-bind:class="{ active: is_status(item) == '1',error: is_status(item) == '2' }">
					{{ item.substr(2) }}
					<!-- {{ statistical(item) }} -->
					<u-badge type="warning " size="mini" :count="statistical(item)" :offset="[-10,-15]"></u-badge>
				</view>
			</u-col>
		</u-row>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 刷新标识
				flush_flg: false,
				// 房间列表
				room_list: [],
				type: '',
				b: '',
				f: '',
			};
		},
		onLoad() {
			this.b = this.vuex_floor_now.id + "#"
			this.f = this.vuex_layer_now.id + ''
			// this.r = this.vuex_room_now.substr(3, 4)
			this.type = this.vuex_task.type
			this.init_room();
		},
		methods: {
			statistical(item){
				var b = this.b + this.f
				var room = item.substr(3, 4)
				var list = this.vuex_call[this.vuex_task.type][b][room]
				var complete = 0
				for(var user in list){
					if(user!=="status" && list[user] === '0'){
						complete+=1
					}
				}
				return "-"+complete
			},
			is_status(item){
				var key = item.substr(3)
				try{
					return this.vuex_call[this.type][this.b+this.f][key]['status']
				}catch(e){
					return '2'
				}
			},
			// 加载房间数据
			init_room() {
				let room = this.vuex_task.rooms[this.vuex_floor_now.id][this.vuex_layer_now.id]
				this.room_list = room
			},
			// 跳转到房间列表
			to_people(room) {
				if(this.is_status(room) == '2'){return}
				this.$store.dispatch('save', ['vuex_room_now', room])
				var d = {
					'0': 'knowing_people',
					'1': 'health_people'
				}
				this.$u.route('/pages/attendance/' + d[this.vuex_task.type])
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
