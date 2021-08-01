<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
			<LateCall v-show="current==0"></LateCall>
			<Discipline v-show="current==1"></Discipline>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar class="tab" height="40px" :before-switch="beforeSwitch" 	active-color='#303133' inactive-color='#434351' v-model="current" :list="list" ></u-tabbar>
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
				current:1
			}
		},
		components:{
			LateCall,
			Discipline
		},
		onLoad() {
			this.load_rull()
			this.load_class()
		},
		methods: {
				beforeSwitch(index) {
					// 只能切换偶数项
					return true;					
				},
				// 加载规则
				load_rull()	{
					this.$store.dispatch('school_attendance/rule', {  codename:"0#002" }).then(res=>{
						this.$store.commit('school_attendance/SET_ROLL_CALL_LIST',res.data)
					})
					this.$store.dispatch('school_attendance/rule', {  codename:"0#003" }).then(res=>{
						this.$store.commit('school_attendance/SET_VD_RULL_LIST',res.data)
					})
				},
				// 加载班级列表
				load_class(){
					console.log('加载班级列表')
					this.$store.dispatch('school_attendance/late_class', {  type:0,task_id:this.$store.getters.task_now.id }).then(res=>{
						this.$store.commit('school_attendance/SET_CLASS_LIST',res.data)
					})
				}
				
			}
	}
</script>

<style>
	.tab{
		color: red;
		padding: 15px;
	}
</style>