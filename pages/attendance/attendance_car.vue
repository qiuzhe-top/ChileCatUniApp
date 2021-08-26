<template>
	<view class="attendanceCar">
		<u-row>
			<u-col span="12" class="u-m-b-30" v-for="(task,index) in vuex_tasks" :key="index">
				<qz-car class="u-p-30" img_size="150rpx" :img="task.img">
					<text class="u-block u-skeleton-rect u-font-xl u-m-b-10">{{task.title}}</text>
					<text class="u-block u-skeleton-rect u-font-xs u-m-b-20 u-type-info u-line-2">{{task.msg1}}</text>
					<text class="u-block u-blok u-skeleton-rect u-font-xs u-m-b-10 u-type-info">{{task.msg2}}</text>
				</qz-car>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		created() {
			this.$store.dispatch('init_my_task')
		},
		methods: {
			go_to(task) {
				var _url = {
					'0': '/pages/school_attendance/knowing_floor', // 查寝
					'1': '/pages/school_attendance/health_floor', // 卫生
					'2': '/pages/school_attendance/late', // 晚自修
				};
				// this.$store.commit('life/SET_WORK_TYPE', task.type);
				this.$store.commit('school_attendance/SET_TASK_NOW', task);
				console.log(task)
				this.$u.route(_url[task.type])
			},
		}
	}
</script>

<style>
</style>
