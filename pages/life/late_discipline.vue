<template>
	<view class="">
		<view class="input-username">
			<u-input v-model="value" :type="type" scroll-y  scroll-top="30" :border="border" placeholder="请输入学号" />
			
			<u-button >搜索</u-button>
		</view>
		
		
		<view class="user-msg">
			<text>19510144</text>
			<text>张三</text>
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
			
			
		<u-button class="submit">提交</u-button>
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
