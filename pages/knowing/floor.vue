<template>
	<view class="floor">
		<!-- 输入验证码 -->
		<uni-popup ref="dialogInput" type="dialog" @change="change">
			<uni-popup-dialog mode="input" title="输入验证码" value="" placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		
		<!-- 主体 -->
		<view v-for="item in floor_list" v-bind:key="item.id">
			<view class="title">{{item.name}}</view>
			<view class="floor-box">
				<view class="level"  v-for="item2 in item.list" v-bind:key="item2.id" v-on:tap="to_room(item.name,item2)">{{item2.name}}</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';

export default {
	data() {
		return {
			type: 'top',
			msgType: 'success',
			message: '这是一条成功消息提示',
			value: '默认输入的内容',
			floor_list:	[]
		};
	},
	components: {
		uniPopup,
		uniPopupMessage,
		uniPopupDialog
	},
	onLoad() {
		// this.init_floor()
	},
	mounted() {
		let idcode = uni.getStorageSync('idcode');
		if (idcode) {
			this.rep_vfcode(idcode);
		} else {
			this.show_message_box();
		}
		
	},
	methods: {
		// 加载楼层数据
		init_floor(){
			this.$api.buildinginfo().then(res=>{
				if(res.data.code==2000){
					this.$data.floor_list=res.data.data
				}
			})
		},
		// 显示弹窗
		show_message_box: function() {
			this.$refs.dialogInput.open();
		},
		// 发送验证码
		rep_vfcode: function(idcode,done) {
			console.log("done=" + done,"idcode=" + idcode)
			this.$api.idcode_post({ idcode: idcode }).then(res => {
				if (res.data.code == 2000) {
					uni.setStorageSync('idcode', idcode);
					this.init_floor()
					try{
						done();
					}catch(e){
					}
				} else {
					this.show_message_box();
				}
			});
		},
		/**
		 * popup 状态发生变化触发
		 * @param {Object} e
		 */
		change(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
		},
		
		/**
		 * 输入对话框的确定事件
		 */
		dialogInputConfirm(done, val) {
			uni.showLoading({
				// title: '3秒后会关闭'
			});
			console.log(val);
			this.rep_vfcode(val,done);
			this.value = val;
			setTimeout(() => {
				uni.hideLoading();
				// 关闭窗口后，恢复默认内容
			}, 500);
		},
		// 跳转到房间列表
		to_room(floor,room){
			// console.log(floor,room)
			uni.navigateTo({
				url:"/pages/knowing/room?id="+room.id+"&floor_name="+floor+"&room_name="+room.name,
			})
		}
			
	}
};
</script>

<style>
.floor {
	padding: 20rpx;
}
.floor .title {
	font-size: 56rpx;
	color: #3da7cf;
}
.floor-box {
	--webkit-display: flex;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
}
.floor-box .level {
	/* background-color: rgb(266, 254, 145); */
/* 	
	margin-bottom: 15rpx;
	margin-right: 15rpx;
	border: #3f536e solid 1rpx; */
	padding: 10rpx 40rpx;
	margin: 10px 0;
	margin-right: 7px;
	display: inline-block;
	box-shadow: #e8e8e8 1px 1px 10px;
}
.logout{
	margin-top: 200rpx;
	color: #8F8F94;
	width: 60%;
	background-color: rgb(255,255,255);
	/* back */
}
</style>
