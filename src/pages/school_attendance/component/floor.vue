<!--
 * @Author: your name
 * @Date: 2021-08-01 09:51:07
 * @LastEditTime: 2021-08-03 18:46:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ChileCat-Vscode-uniapp-project\src\pages\life\knowing_floor.vue
-->
<template>
	<view class="floor">
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
	props:{
		init_floor_store:String,
		room_url:String
	},
	data() {
		return {
			// 楼层数据
			floor_list: []
		};
	},
	components: {
		uniPopup,
		uniPopupMessage,
		uniPopupDialog
	},
	mounted() {
		this.init_floor();
	},
	methods: {
		// 加载楼层数据

		init_floor() {
			this.$store.dispatch('school_attendance/'+this.$props.init_floor_store,{task_id:this.$store.getters.task_now.id,type:'0'}).then(res => {
				this.$data.floor_list = res.data;
			});
		},
		
		// 跳转到房间列表
		to_room(floor, layer) {
			this.$store.commit('school_attendance/SET_FLOOR_NOW', { id: floor.id, name: floor.name });
			this.$store.commit('school_attendance/SET_LAYER_NOW', { id: layer.id, name: layer.name });
			uni.navigateTo({
				url: '/pages/school_attendance/'+this.$props.room_url
			});
		}
	}
};
</script>

<style lang="scss">
@import url('../css/main.scss');
.floor {
	padding: 20rpx;
}
</style>
