<template>
	<view class="">
		<PeopleList @to_people="to_people" :is_position_mode="true"  :init_people_store="'school_information/mybedroom'" ref="people_list_vue" ></PeopleList>
		<u-modal v-model="show" @confirm="confirm" :async-close="true" :content="content" :mask-close-able="true" :show-title="false"></u-modal>
	</view>
</template>

<script>
	import PeopleList from '@/pages/school_attendance/component/people_list.vue'
	export default{
		data(){
			return {
				show:false,
				content:'',
				bed:{}
			}
		},
		components:{
			PeopleList
		},
		created() {
		},
		methods:{
			to_people(item){
				if(item.user_id){
					this.content = '确定和 ' + item.name +' 交换床位吗?'
				}else{
					this.content = '确定换到新的床位吗?'
				}
				this.bed=item
				this.show=true
			},
			// 加载我的寝室数据
			confirm() {
				let modal = this.$refs.uModal
				this.$store.dispatch('school_information/update_beds',{position:this.bed.bed_position}).then(res=>{
					setTimeout(() => {
						this.show = false;
					}, 500)
				}).catch(err=>{
					this.show = false;
				})
			}
		}
	}
</script>

<style>
</style>
