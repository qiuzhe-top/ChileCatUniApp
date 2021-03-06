<template>
	<view class="floor">
		<!-- 输入验证码 -->
		<uni-popup ref="dialogInput" type="dialog" @change="change">
			<uni-popup-dialog mode="input" title="输入验证码" value="" placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>

		<!-- 楼=>层 列表展示 -->
		<view v-for="item in floor_list" v-bind:key="item.id">
			<view class="title">{{ item.name }}</view>
			<view class="box">
				<view class="level" v-for="item2 in item.list" v-bind:key="item2.id" v-on:tap="to_room(item, item2)">{{ item2.name }}</view>
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
			// 楼层数据
			floor_list: [],
	
		};
	},
	components: {
		uniPopup,
		uniPopupMessage,
		uniPopupDialog
	},
	onLoad() {
		// this.init_floor();
	},
	mounted() {
		// 判断是否需要输入验证码
		let work_type = this.$store.getters.work_type;
		let idcode = '';
		if(work_type=='absence'){
			 idcode = this.$store.getters.knowing_code;
		}else if(work_type='health'){
			 idcode = this.$store.getters.hygienist_code;
		}
		console.log(idcode)
		// return
		if (idcode) {
			this.post_vfcode(idcode);
		} else {
			this.show_message_box();
		}
	},
	methods: {
		// 加载楼层数据
		init_floor() {
			this.$api.life.buildinginfo().then(res => {
				if (res.data.code == 2000) {
					this.$data.floor_list = res.data.data;
				}
			});
		},
		// 显示弹窗
		show_message_box: function() {
			this.$refs.dialogInput.open();
		},
		// 发送验证码
		post_vfcode: function(idcode, done) {
			this.$api.life
				.idcode_post({ idcode: idcode, type: this.$store.getters.work_type })
				.then(res => {
					if (res.data.code == 2000) {
						
						// 保存验证码
						if(this.$store.getters.work_type=='absence'){
							 this.$store.commit('life/SET_KNOWING_CODE', idcode);
						}else if(this.$store.getters.work_type='health'){
							this.$store.commit('life/SET_HYGIENIST_CODE', idcode);
						}
						
						this.init_floor();
						
						try {
							done();
						} catch (e) {}
					} else {
						this.show_message_box();
					}
				})
				.catch(err => {
					this.show_message_box();
				});
		},
		// 输入对话框的确定事件
		dialogInputConfirm(done, val) {
			this.post_vfcode(val, done);
			this.value = val;
		
		},
		// 跳转到房间列表
		to_room(floor, layer) {
			this.$store.commit('life/SET_FLOOR_NOW', { id: floor.id, name: floor.name });
			this.$store.commit('life/SET_LAYER_NOW', { id: layer.id, name: layer.name });
			uni.navigateTo({
				url: '/pages/life/room'
			});
		},
		// popup 状态发生变化触发
		change(e) {
			// console.log('popup ' + e.type + ' 状态', e.show);
			if(!e.show){
				uni.navigateBack({
					delta:1
				})
			}
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
