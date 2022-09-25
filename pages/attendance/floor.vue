<template>
	<view class="floor">
		<!-- 楼=>层 列表展示 -->
		<view v-for="(item,b) in floor_list" v-bind:key="item.id">
			<view class="title">{{ b }}号楼</view>

			<u-row gutter="1" >
				<u-col span="3" v-for="(floor,v) in item" v-bind:key="v">
					<view class="level"
					 v-bind:class="{ active: statistical(b,v)[0] === statistical(b,v)[1],level:true }"
					 v-on:tap="to_room(b, v)">
						第{{ v }}层 
						 <u-badge bgColor="#04b8fc" size="mini" :count="'+'+statistical(b,v)[0]" :offset="[-10,-15]"></u-badge>
						 <!-- <u-badge :isDot="true" type="success"></u-badge> -->
						<!-- {{ statistical(b,v)[0] }} {{ statistical(b,v)[1] }} -->
					</view>
				</u-col>	
			</u-row>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 楼层数据
				floor_list: [],
				// 任务类型
				type:'0',
				value:100
			};
		},
		mounted() {
			this.init_floor();
			this.initWebSocket()
			this.type = this.vuex_task.type
		},
		destroyed() {
			this.websock.close()
		},
		methods: {
			statistical(b,v){
				var list = this.vuex_call[this.vuex_task.type][b+"#"+v]
				var len = 0
				var complete = 0
				for(var r in list){
					var room = list[r]
					var status = room['status']
					if(status=='1'){
						complete+=1
					}
					len+=1
				}
				return [complete,len]
			},


			initWebSocket(){
				// this.websock = new WebSocket("ws://127.0.0.1:8000/ws/room/status")
				//  this.websock = new WebSocket("ws://django.zhcy.top/ws/room/status")
				//this.websock = new WebSocket("ws://124.223.43.151:8801/ws/room/status")
				this.websock = new WebSocket("ws://124.223.43.151:8801/ws/room/status")
				// this.websock = new WebSocket("ws://127.0.0.1:8888/ws/room/status")
				this.websock.onmessage =  this.message
				this.websock.onopen = this.onopen;
				this.websock.onerror = this.onerror;
				this.websock.onclose = this.onclose;
			},
			onerror(e){
					console.log(e,e.code,e.reason,e.wasClean)
			},	
			onopen(e){
					var buildings = this.vuex_call[this.type]
					console.log("socket连接成功")
					if(!buildings){return}
					var d = JSON.stringify({'buildings':buildings, 'type':this.type})
					this.websock.send(d)
					// console.log('发送')
			},
			onclose(e){
					console.log("断开",e.code,e.reason,e.wasClean)
			},
			message(e){
				var data  = JSON.parse(e.data)
				console.log('接受',data)
				if(data['type']==='all_status'){
					var buildings = data['data']['buildings']
					var info = data['data']['info']
					// this.init_room_status(status_dict)
					this.$store.dispatch('save', ['vuex_call.'+this.type,buildings])
					this.$store.dispatch('save', ['vuex_room_user_info',info])
				}else if('send_status' === data['type']){
					console.log('接受新状态')
					var info = data['data']
					var status_type = info['status_type']
					var task_type = "." + info['task_type']
					var status = info['status']
					var room = info['room']
					var b = "." + room.substr(0, room.indexOf('#')+2)
					var r = "." + room.slice(-2)
					var key = ''
					if(status_type==='room'){
						key = 'vuex_call'+task_type+b+r+'.status'
					}else if(status_type==='user'){
						var username = info['username']
						key = 'vuex_call'+task_type+b+r+'.'+username
					}
					this.$store.dispatch('save', [key,status])
				}
			},
			// 初始化楼层状态
			init_room_status(status_dict){
				// status_dict.forEach(e=>{
				// 	console.log(e)
				// })
				let _obj = JSON.stringify(this.vuex_call);
				let vuex_call = JSON.parse(_obj);
				console.log(vuex_call)
				for(var k in status_dict){
					var status = status_dict[k]
					var ks = k.split('_')
					var room = ks[0]
					var floor =  room.substr(0,3) + ''
					var r = room.substr(3,4) + ''
					// var username = ''
					// if (ks.length === 3) {
					// 	username = ks[2]
					// }
					if (room==='3#101'){
						console.log(room,status)
					}
					try{
						
						vuex_call[floor][r][this.vuex_task.type_name] =  1 //status.parseInt()
						vuex_call[floor][r]['t'] = status
					}catch{
						
					}
					
				}
				this.$store.dispatch('save', ['vuex_call',vuex_call])
				console.log(vuex_call)
			},
			
			// 加载楼层数据
			init_floor() {
				this.$data.floor_list = this.vuex_task.rooms
			},

			// 跳转到房间列表
			to_room(floor, layer) {
				this.$store.dispatch('save', ['vuex_floor_now', {
					id: floor,
					name: floor
				}])
				this.$store.dispatch('save', ['vuex_layer_now', {
					id: layer,
					name: layer
				}])
				this.$u.route('/pages/attendance/room')
			}
		}
	};
</script>

<style lang="scss">
	@import url('./css/main.scss');

	.floor {
		padding: 20rpx;
	}
	.level{
	}
</style>
