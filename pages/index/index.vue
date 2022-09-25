<template>
	<view class="index u-p-20 ">
		<view class="u-m-b-20"></view>
		<u-row>
			<u-col span="12">
				<qz-car img_size="200rpx" img="https://s.pc.qq.com/tousu/img/20210824/2753663_1629771793.jpg">
					<userCar></userCar>
				</qz-car>
			</u-col>
		</u-row>
		<view class="u-m-b-30"></view>
		<u-row>
			<!-- 违纪公告 -->
			<u-col span="6">
				<view @click="ruter('pages/attendance/bulletin')">
					<qz-car img_size="120rpx" :img="vuex_ali_icon + 'announcement.png'">
						<view class="u-p-15">
							<text class="u-block u-font-xl u-m-b-10 -rect">考勤公告</text>
							<text class="u-font-xs u-m-b-20 u-type-info u-line-2 -rect">查看大家在一天\n里的出勤情况</text>
						</view>
					</qz-car>
				</view>
			</u-col>
			<!-- 我的违纪 -->
			<u-col span="6">
				<view @click="ruter('pages/auth/personal_discipline')">
					<qz-car img_size="150rpx" :img="vuex_ali_icon + 'my_record.png'">
						<view class="u-p-15">
							<text class="u-block u-font-xl u-m-b-10 -rect">我的记录</text>
							<text class="u-font-xs u-m-b-20 u-type-info u-line-2 -rect">我的所有\n考勤记录 </text>
						</view>
					</qz-car>
				</view>
			</u-col>
		</u-row>
		<view class="u-m-b-30"></view>
		<!-- 寝室违纪 -->
		<!-- 		<u-row>
				<u-col span="12">
					<view @click="ruter('pages/auth/personal_discipline_room')">
						<qz-car img_size="150rpx" :img="vuex_ali_icon + 'my_record.png'">
							<view class="u-p-15">
								<text class="u-block u-font-xl u-m-b-10 -rect">寝室违纪</text>
								<text class="u-font-xs u-m-b-20 u-type-info u-line-2 -rect">查看自己寝室所有违纪情况</text>
							</view>
						</qz-car>
					</view>
				</u-col>
			</u-row> -->
		<view class="u-m-b-30"></view>
		<!-- 我的任务 -->
		<transition name="fade">
			<u-row v-if="vuex_tasks.length!=0">
				<u-col span="12">
					<qz-car img="https://s.pc.qq.com/tousu/img/20210824/7867424_1629773633.jpg" img_size="320rpx">
						<view class="u-m-b-15">
							<taskCar></taskCar>
						</view>
					</qz-car>
				</u-col>
			</u-row>
		</transition>
		<view class="u-m-b-30"></view>
		<attendanceCar></attendanceCar>
		<!-- <advertising1></advertising1> -->
		<!-- 骨架屏 vuex_index_loading -->
		<!-- < :loading="vuex_index_loading" :animation="true" bgColor="#f8f8f8"></> -->
		<!-- <button		<view class="beian">
			<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=xxx" target="_blank">浙ICP备xx号</a>
		</view>
 class="cu-btn bg-cyan" @tap="uploadOne">上传一张图片</button> -->
		<view class="beian u-m-t-100">
			<a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2020045150号-3</a>
		</view>

	</view>

</template>

<script>
	import userCar from '../auth/user_car.vue';
	import taskCar from '../task/task_car.vue'
	import attendanceCar from '../attendance/attendance_car.vue'
	import advertising1 from './component/advertising1.vue'
	export default {
		data() {
			return {}
		},
		components: {
			userCar,
			taskCar,
			attendanceCar,
			advertising1
		},
		watch: {
			vuex_token: function() {
				this.init()
				// this.$store.commit('INIT_INDEX_LOADING')
			}
		},
		methods: {
			init() {

			},
			ruter(url) {
				this.$u.route(url)
			},

			uploadOne() {
				this.$store.dispatch('upload')
			},
		},
		onLoad() {
			this.init()
		},

	}
</script>

<style lang="scss">
	page {
		background-color: $u-bg-color;
	}

	.beian {
		height: 5%;
		width: 100%;
		text-align: center;
		font-size: 10px;
		
		a {
			color: #c8c8c8;
		}
	}

	.index {}

	.index {
		width: 100%;

		.discipline {
			text {
				display: block;
			}
		}
	}
</style>
