<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
			<LateCall v-show="current==0"></LateCall>
			<Discipline v-show="current==1"></Discipline>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar height="40px" :before-switch="beforeSwitch" 	active-color='#303133' inactive-color='#606266' v-model="current" :list="list" ></u-tabbar>
	</view>
</template>

<script>
	import LateCall from './late_call.vue'
	import Discipline from './late_discipline.vue'
	export default {
		data() {
			return {
				list: [{
						text: '点名',
			
					},
					{
						text: '违纪',
					}
				],
				current: 0
			}
		},
		components:{
			LateCall,
			Discipline
		},
		onLoad() {
			console.log(11)
			this.load_rull()
			this.load_class()
		},
		methods: {
				beforeSwitch(index) {
					// 只能切换偶数项
					console.log(this.$data.current)
					return true;					
				},
				// 加载规则
				load_rull()						{
					this.$api.SchoolAttendance.rule({codename:"0#002"}).then(res=>{
						this.$store.commit('SchoolAttendance/SET_ROLL_CALL_LIST',res.data.data)
					})
					this.$api.SchoolAttendance.rule({codename:"0#003"}).then(res=>{
						this.$store.commit('SchoolAttendance/SET_VD_RULL_LIST',res.data.data)
					})
				},
				// 加载班级列表
				load_class(){
					this.$api.SchoolAttendance.late_class({task_id:this.$store.getters.task_now.id}).then(res=>{
						this.$store.commit('SchoolAttendance/SET_CLASS_LIST',res.data.data)
					})
				}
				
			}
	}
</script>