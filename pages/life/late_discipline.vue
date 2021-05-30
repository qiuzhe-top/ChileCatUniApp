<template>
	<view class="">
		<view class="input-username">
			<u-input v-model="username" :type="type" scroll-y  scroll-top="30" :border="border" placeholder="请输入学号" />
			
			<u-button @click="search()">搜索</u-button>
		</view>
		
		
		<view class="user-msg">
			<text>{{user.username}}</text>
			<text>{{user.name}}</text>
		</view>
		
		
		
		<u-row gutter="16" justify="space-around" class="table-list">
		
		 <scroll-view style="height: 600rpx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		                @scroll="scroll">
					  <t-table @change="table_change" is-check>
						<t-tr>
							<t-th>规则</t-th>
							<t-th>分值</t-th>
						</t-tr>
						<t-tr v-for="item in rule_list" :key="item.id">
							<template v-if="item" >
								<t-td>{{ item.name }}</t-td>
								<t-td>{{ item.score }}</t-td>
							</template>
						</t-tr>
					  </t-table>
		</scroll-view>
		
		</u-row>
			
			
		<u-button class="submit" @click="submit()">提交</u-button>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import pop from '@/components/ming-pop/ming-pop.vue';
	
	export default {
		data() {
			return {
				value: '',
				type: 'text',
				// 滑动
				border: true,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				// 待搜索的用户名
				username:'',
				// 用户
				user:{},
				// 被选中的规则下标
				select_role_index:[],
				// 规则列表
				rule_list:[
					{
						name:'规则1',
						score:'1',
					},{
						name:'规则1',
						score:'1',
					},{
						name:'规则1',
						score:'1',
					},		{
						name:'规则1',
						score:'1',
					},{
						name:'规则1',
						score:'1',
					},{
						name:'规则1',
						score:'1',
					},		{
						name:'规则1',
						score:'1',
					},{
						name:'规则1',
						score:'1',
					},{
						name:'规则1',
						score:'1',
					},		{
						name:'规则1',
						score:'1',
					},{
						name:'规则1',
						score:'1',
					},{
						name:'规则1',
						score:'1',
					},
				]
			}
		},
		components: {
			tTable,
			tTh,
			tTr,
			pop,
			tTd
		},
		 methods: {
		        upper: function(e) {
		            console.log(e)
		        },
		        lower: function(e) {
		            console.log(e)
		        },
		        scroll: function(e) {
		            console.log(e)
		            this.old.scrollTop = e.detail.scrollTop
		        },
		        goTop: function(e) {
		            this.scrollTop = this.old.scrollTop
		            this.$nextTick(function() {
		                this.scrollTop = 0
		            });
		            uni.showToast({
		                icon:"none",
		                title:"纵向滚动 scrollTop 值已被修改为 0"
		            })
		        },
				// 搜索用户
				search(){
					this.$api.SchoolAttendance.student_information({
						username:this.$data.username
					}).then(res=>{
						this.$data.user = res.data.data
					})
				},
				// 多选更新
				table_change(e){
					this.$data.select_role_index = e.detail
					console.log(e.detail)
				},
				// 提交
				submit(){
					
					var indexs = this.$data.select_role_index
					var list = new Array()
					indexs.forEach(n=>{
					 list.push(	this.$data.rule_list[n].id)
					})
					
					var username = this.$data.user.username
					this.$api.SchoolAttendance.submit({
						type:0,
						task_id:this.$store.getters.task_now.id,
						data:{
							rule_id_list:list,
							username: this.$data.user.username,
							type:1
						}
					}).then(res=>{
						// this.$data.user_list = res.data.data
					})
					
				}
		    }
	}
</script>

<style lang="scss">
	.input-username{
		display: flex;
		width: 80%;
		padding: 30rpx 0;
		
		margin: 0 auto;
		button{
				
			height: 75rpx;
		}
	}
	.user-msg{
		text-align: center;
		margin-bottom: 40rpx;
		text{
			// display: block;
			margin: 0 40rpx;
		}
	}
	.table-list{
		padding: 0 20rpx;
	}
	.submit{
		width: 50%;
		margin-top: 40rpx;
	}
</style>
