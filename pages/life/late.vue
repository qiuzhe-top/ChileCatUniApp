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
		methods: {
				beforeSwitch(index) {
					// 只能切换偶数项
					console.log(this.$data.current)
					return true;					
				}
			}
	}
</script>