<template>
	<view class="index u-p-20 u-skeleton">
		
		<u-row>
			<u-col span="12">
				<qz-car img_size="200rpx" img="https://s.pc.qq.com/tousu/img/20210824/2753663_1629771793.jpg">
					<userCar></userCar>
				</qz-car>
			</u-col>
		</u-row>
		<view  class="u-m-b-30"></view>
		<u-row>
			<u-col span="6">
				<view @click="ruter('pages/attendance/bulletin')">
					<qz-car img_size="120rpx" :img="vuex_ali_icon + 'announcement.png'">
						<view class="u-p-15">
							<text class="u-block u-font-xl u-m-b-10 u-skeleton-rect">违纪公告</text>
							<text class="u-font-xs u-m-b-20 u-type-info u-line-2 u-skeleton-rect">查看大家在一天\n里的违纪情况</text>
						</view>
					</qz-car>
				</view>
			</u-col>
			<u-col span="6">
				<view @click="ruter('pages/auth/personal_discipline')">
					<qz-car img_size="150rpx" :img="vuex_ali_icon + 'my_record.png'">
						<view class="u-p-15">
							<text class="u-block u-font-xl u-m-b-10 u-skeleton-rect">我的违纪</text>
							<text class="u-font-xs u-m-b-20 u-type-info u-line-2 u-skeleton-rect">我的所有\n违纪记录 </text>
						</view>
					</qz-car>
				</view>
			</u-col>
		</u-row>
		<view  class="u-m-b-30"></view>
		<transition name="fade">
			<u-row v-if="vuex_tasks.length!=0">
				<u-col span="12">
					<qz-car img="https://s.pc.qq.com/tousu/img/20210824/7867424_1629773633.jpg"
						img_size="320rpx">
						<view  class="u-m-b-15">
							<taskCar></taskCar>
						</view>
					</qz-car>
				</u-col>
			</u-row>
		</transition>
		<view  class="u-m-b-30"></view>
		
		<attendanceCar></attendanceCar>
		<!-- 骨架屏 vuex_index_loading -->
		<u-skeleton :loading="vuex_index_loading" :animation="true" bgColor="#f8f8f8"></u-skeleton>
	</view>
</template>

<script>
	import userCar from '../auth/user_car.vue';
	import taskCar from '../task/task_car.vue'
	import attendanceCar from '../attendance/attendance_car.vue'
	export default {
		data() {
			return {}
		},
		components: {
			userCar,
			taskCar,
			attendanceCar
		},
		watch: {
			vuex_token: function() {
				this.init()
				this.$store.commit('INIT_INDEX_LOADING')
			}
		},
		methods: {
			init() {

			},
			ruter(url) {
				this.$u.route(url)
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: $u-bg-color;
	}

	.index {
		.discipline {
			text {
				display: block;
			}
		}
	}
</style>
