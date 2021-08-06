<!--
 * @Author: your name
 * @Date: 2021-08-01 09:51:07
 * @LastEditTime: 2021-08-03 18:52:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
	<view class="room">
		<Room :init_room_store="'dorm_room_info'" :to_page_url="'health_people'"></Room>
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
