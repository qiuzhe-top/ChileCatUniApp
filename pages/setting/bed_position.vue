<template>
	<view class="">
		<PeopleList @to_people="to_people" :is_position_mode="true" :init_people_store="'mybedroom'"
			ref="people_list_vue"></PeopleList>
		<u-modal v-model="show" @confirm="confirm" :async-close="true" :content="content" :mask-close-able="true"
			:show-title="false"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import PeopleList from '@/pages/attendance/component/people_list.vue'
	export default {
		data() {
			return {
				show: false,
				content: '',
				bed: {}
			}
		},
		components: {
			PeopleList
		},
		methods: {
			to_people(item) {

				// 获取当前点击的学生床位 对象 
				var index_user = this.$refs.people_list_vue.current_user
				var user_list = this.$refs.people_list_vue.people_list
				var user_obj = user_list[index_user]
				// 弹窗信息
				if (user_obj.user_id) {
					this.content = '确定和 ' + user_obj.name + ' 交换床位吗?'
				} else {
					this.content = '确定换到新的床位吗?'
				}
				this.bed = user_obj
				this.show = true
			},
			// 加载我的寝室数据
			confirm() {
				const that = this
				let modal = this.$refs.uModal

				this.$u.api.school_information_update_beds({
					position: this.bed.bed_position
				}).then(res => {
					setTimeout(() => {
						this.$refs.uToast.show({
							title: '修改成功 请刷新页面',
							type: 'success',
						})
						this.show = false;
					}, 500)
				}).catch(err => {
					this.show = false;
				})
			},
			// 页面位置调换
			transposition() {
				var user_list = this.$refs.people_list_vue.people_list
				var current_index = this.$refs.people_list_vue.current_user // 点击的床位用户下表
				var user_obj = user_list[current_index]

				// 自己的床位下表
				var my_index = -1
				for (var i = 0; i < user_list.length; i++) {
					if (user_list[i].name == this.vuex_user.username) {
						my_index = i
						break
					}
				}

				this.$refs.people_list_vue.people_list[1].name = '1' // 无法直接修改子组件 需要添加事件触发

			}
		}
	}
</script>

<style>
</style>
