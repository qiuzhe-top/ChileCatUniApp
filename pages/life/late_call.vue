<template>
	
	<view class="call">


		<u-row gutter="16" justify="space-around">
			
			<!-- 班级选择 -->
			<u-col span="4">
				<u-button type="success" size="mini" @click="open()" plain>{{items_class[class_current].name}}</u-button>
			</u-col>
			
			
			<!-- 点名次数 -->
			<u-col span="6">
				<radio-group @change="select_rule" class="class-radio-group">
					
					<label class="radio" v-for="(item,index) in roll_call_list" :key="index">
						<radio :value="str(item.id)" /><text>{{item.name}}</text>
					</label>
					
				<!-- 	<view class="" v-for="(item, index) in items_class" :key="item.value">
						<label class="uni-list-cell uni-list-cell-pd">
							<radio :value="item" :checked="index === class_current" />
							{{item}}
						</label>
					</view> -->
				</radio-group>
			</u-col>
			
		</u-row>


		<u-row gutter="16" justify="space-around" class="class-list">

			<t-table @change="table_change" is-check>
				<t-tr>
					<t-th>学号</t-th>
					<t-th>姓名</t-th>
					<t-th>状态</t-th>
					<t-th></t-th>
					<t-th></t-th>
				</t-tr>
				<t-tr v-for="item in user_list" :key="item.id">
					<template v-if="item" >
						<t-td >{{ item.username }}</t-td>
						<t-td>{{ item.name }}</t-td>
						<t-td>{{ item.status }}</t-td>
						<t-td><u-button type="default" size="mini">在</u-button></t-td>
						<t-td><u-button type="default" size="mini">不在</u-button></t-td>
					</template>
				</t-tr>
			</t-table>
		
		</u-row>

		
		
		<u-row gutter="16" justify="space-around" class="class-list">
			
			<u-button >在</u-button>
			<u-button >不在</u-button>
			
		</u-row>



		<!-- 弹出层 选择班级 -->
		<u-popup v-model="show" mode="center" length="80%" height="60%" border-radius="14">
			<radio-group @change="select_sclass" class="class-radio-group">
				<view class="radio-box" v-for="(item, index) in items_class" :key="index">
					<label class="uni-list-cell uni-list-cell-pd">
						<radio :value="str(item.id)" :checked="index === class_current" />
						{{item.name}}
					</label>
				</view>
			</radio-group>
		</u-popup>
		
		
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
				// 弹出层
				show: false,
				// 班级列表
				items_class: this.$store.getters.class_list,// [{id:1,name:'选择班级'}],
				// 当前班级列表
				class_current: 0,
				// 当前班级名单
				user_list:[
					{
						"username":"19510146",
						"name":"张三",
						"status":true,
					},{
						"username":"19510146",
						"name":"张三",
						"status":true,
					},{
						"username":"19510146",
						"name":"张三",
						"status":true,
					},	{
						"username":"19510146",
						"name":"张三",
						"status":true,
					},{
						"username":"19510146",
						"name":"张三",
						"status":true,
					},{
						"username":"19510146",
						"name":"张三",
						"status":true,
					},
				],
				// 当前多选 选中的学生
				select_user_index:[],
				// 点名规则
				roll_call_list:  this.$store.getters.roll_call_list,
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
			open() {
				this.show = true
			},
			str(n){
				return n+''
			},
			// 选择班级
			select_sclass: function(evt) {
				for (let i = 0; i < this.items_class.length; i++) {
					if (this.items_class[i].id === evt.target.value) {
						this.class_current = i;
						break;
					}
				}
			},
			// 多选更新
			table_change(e){
				this.$data.select_user_index = e.detail
			},
		
			
			// 选择规则
			select_rule(e){
				console.log(e.detail)
			},
		
			// 获取名单
			get_class_user(){
				var class_id = 1
				var rull_id = 1
			},
			// 点名 在/不在
			roll_cal(){
				// 用户ID
				var user_list_id
				// 规则ID
				var rull_id
				// 点名状态
				var flg
			},
			// 批量点名
			roll_cal_list(){
				// 选中的下标
				this.$data.select_user_index
				// 根据下标检索的用户ID
				var user_list_id
				// 点名状态
				var flg
			}
		}
	}
</script>

<style lang="scss">
	.call{
		.u-td{
			padding: 6px 3px;
		}
		table tr td {
		  padding: 0px;
		  height: 40px;
		  position: relative;
		  background-clip: padding-box;
		}
	}
	.class-radio-group {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		padding: 20rpx;
		flex-wrap: wrap;

		.radio-box {
			width: 190rpx;
			border: solid #b0cfff 2px;
			padding: 10rpx;
			margin-bottom: 30rpx;
		}
	}

	.class_button {
		width: 140rpx;
		height: 60rpx;
		border-radius: 1px;
		margin-left: 0;
		font-size: 15rpx;
	}
	
	.class-list{
		padding: 15rpx;
	}
	
	
	.operation{
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>
