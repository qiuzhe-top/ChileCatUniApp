<!--
 * @Author: your name
 * @Date: 2021-08-01 09:51:07
 * @LastEditTime: 2021-08-03 18:49:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
	<view class="floor">
		<Floor :init_floor_store="'dorm_storey_info'" :room_url="'health_room'"></Floor>
	</view>
</template>

<script>
import Floor from './component/floor.vue';

export default {

	data() {
		return {

		};
	},
	components: {
		Floor
	}

};
</script>

