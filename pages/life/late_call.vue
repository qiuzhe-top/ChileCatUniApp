<template>
	
	<view class="call">


		<u-row gutter="16" justify="space-around">
			
			<!-- 班级选择 -->
			<u-col span="4">
				<u-button type="success" size="mini" @click="open()" plain>{{items_class[class_index].name}}</u-button>
			</u-col>
			
			<!-- 弹出层 选择班级 -->
			<u-popup v-model="show" mode="center" length="80%" height="60%" border-radius="14">
				<radio-group @change="select_sclass" class="class-radio-group">
					<view class="radio-box" v-for="(item, index) in items_class" :key="index">
						<label class="uni-list-cell uni-list-cell-pd">
							<radio :value="str(index)" :checked="index === class_index" />
							{{item.name}}
						</label>
					</view>
				</radio-group>
			</u-popup>
			
			
			<!-- 点名规则 -->
			<u-col span="6">
				<radio-group @change="select_rule" class="class-radio-group">
					
					<label class="radio" v-for="(item,index) in roll_call_list" :key="index">
						<radio :value="str(item.id)" /><text>{{item.name}}</text>
					</label>
					
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
				<t-tr v-for="(item,index) in user_list" :key="index">
					<template v-if="item" >
						<t-td >{{ item.username }}</t-td>
						<t-td>{{ item.name }}</t-td>
						<t-td>
						
						<u-icon v-show="item.flg" name="checkmark" color="#2979ff" size="28"></u-icon>
						<u-icon v-show="item.flg==false" name="close" color="#d30000" size="28"></u-icon>
						</t-td>
						<t-td><u-button type="default" size="mini" @click="submit(item,true)">在</u-button></t-td>
						<t-td><u-button type="default" size="mini" @click="submit(item,false)">不在</u-button></t-td>
					</template>
				</t-tr>
			</t-table>
		
		</u-row>

		
		
		<u-row gutter="16" justify="space-around" class="class-list">
			
			<u-button @click="roll_cal_list(true)" >在</u-button>
			<u-button @click="roll_cal_list(false)">不在</u-button>
			
		</u-row>




		
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
				// 当前班级下标
				class_index: 0,
				// 当前班级名单
				user_list:[
					
				],
				// 当前多选 选中的学生
				select_user_index:[],
				// 点名规则
				roll_call_list:  this.$store.getters.roll_call_list,
				// 当前规则ID
				rule_id: 0,
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
				this.class_index = Number.parseInt(evt.target.value);
				this.$data.user_list=[]
			},
			// 多选更新
			table_change(e){
				this.$data.select_user_index = e.detail
				
				console.log(e.detail)
			},
		
			
			// 选择规则
			select_rule(e){
				this.get_class_user(e.detail.value)
			},
		
			// 获取名单
			get_class_user(id){
				var class_id = this.$data.items_class[this.$data.class_index].id
				var rule_id =  Number.parseInt(id)
				this.$data.rule_id = rule_id
				this.$api.SchoolAttendance.late_class({
					type:1,
					rule_id:rule_id,
					class_id:class_id,
					task_id:this.$store.getters.task_now.id
				}).then(res=>{
					this.$data.user_list = res.data.data
				})
				
			},
			submit(item,flg){
				if(item.flg != null) return
				var user_id = item.username
				this.roll_cal([user_id],flg,function(a){
					item.flg = flg
				})
			},
			// 点名 在/不在
			roll_cal(user_list,flg,fun){
				// 用户ID
				//var user_list_id 
				// 规则ID
				//var rull_id
				// 点名状态
				//var flg
				this.$api.SchoolAttendance.submit({
					type:0,
					task_id:this.$store.getters.task_now.id,
					data:{
						flg:flg,
						rule_id:this.$data.rule_id,
						user_list:user_list,
						type:0
					}
				}).then(res=>{
					// this.$data.user_list = res.data.data
					fun(res.data.code)
				})
			},
			// 批量点名
			roll_cal_list(flg){
				
				// 选中的下标
				var indexs = this.$data.select_user_index
				var user_list = new Array();
				
				indexs.forEach(i=>{
					user_list.push(this.$data.user_list[i].username)
				})
				
				let fun = this.batch_flg
				this.roll_cal(user_list,flg,function(a){
					fun(indexs,flg)
				})
				
			},
			batch_flg(indexs,flg){
				indexs.forEach(i=>{
					this.$data.user_list[i].flg = flg
				})
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
