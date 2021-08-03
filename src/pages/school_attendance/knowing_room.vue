<!--
 * @Author: your name
 * @Date: 2021-08-01 09:51:07
 * @LastEditTime: 2021-08-03 18:52:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ChileCat-Vscode-uniapp-project\src\pages\school_attendance\knowing_room.vue
-->
<template>
	<view class="room">
		<Room :init_room_store="'knowing_room_info'"></Room>
	</view>
</template>

<script>
import Room from './component/room.vue';

export default {
	components: {
		Room
	},
};
</script>

<style>
@import url('./css/main.scss');
.room {
	padding: 20rpx;
}
</style>
