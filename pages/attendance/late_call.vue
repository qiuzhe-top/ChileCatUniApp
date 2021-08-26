<template>
	<view class="call">
		<u-row justify="space-around">
			<!-- 班级选择 -->
			<u-col span="3">
				<u-button type="success" size="mini" @click="open()" plain>{{vuex_class_list[class_index]['name']}}
				</u-button>
			</u-col>

			<!-- 弹出层 选择班级 -->
			<u-popup :open="popup_open()" v-model="show" mode="center" length="80%" height="60%" border-radius="14">
				<radio-group @change="select_sclass" class="class-radio-group">
					<view class="radio-box" v-for="(item, index) in vuex_class_list" :key="index">
						<label class="uni-list-cell uni-list-cell-pd">
							<radio :value="str(index)" :checked="index === class_index" />
							{{item.name}}
						</label>
					</view>
				</radio-group>
			</u-popup>

			<!-- 点名规则 -->
			<u-col span="5">
				<radio-group @change="select_rule" class="class-radio-group">

					<label class="radio" v-for="(item,index) in vuex_call_rules" :key="index">
						<radio :value="str(item.id)" /><text>{{item.name}}</text>
					</label>

				</radio-group>
			</u-col>

			<uni-col span="1">
				<u-checkbox v-model="is_check" name="多选">
					多选
				</u-checkbox>
			</uni-col>
		</u-row>


		<u-row gutter="16" justify="space-around" class="class-list u-table-height-70">
			<u-table class="u-table u-m-t-0 " align="center" @change="table_change">
				<u-tr>
				<!-- 	<u-th  width="90rpx">
						<u-checkbox v-model="is_check" v-if="is_check">
						</u-checkbox>
						<text v-else-if="!is_check">序号</text>
					</u-th> -->
					<u-th width="160rpx">学号</u-th>
					<u-th width="140rpx">姓名</u-th>
					<u-th width="100rpx">状态</u-th>
					<u-th></u-th>
					<u-th height='100rpx'></u-th>
				</u-tr>
				<u-tr v-for="(item,index) in user_list" :key="index">
					<template v-if="item">
						<!-- <u-td v-show="is_check" width="90rpx">{{index+1}}</u-td> -->
						<u-td width="160rpx">{{ item.username }}</u-td>
						<u-td width="140rpx">{{ item.name }}</u-td>
						<u-td width="100rpx">
							<u-icon v-show="item.flg" name="checkmark" color="#2979ff" size="28"></u-icon>
							<u-icon v-show="item.flg==false" name="close" color="#d30000" size="28"></u-icon>
						</u-td>
						<u-td >
							<u-button type="default" v-show="item.flg==null" size="mini" @click="submit(item,true)">在
							</u-button>
						</u-td>
						<u-td >
							<u-button type="default" v-show="item.flg==null" size="mini" @click="submit(item,false)">不在
							</u-button>
						</u-td>
					</template>
				</u-tr>
			</u-table>
		</u-row>


		<!-- 组件问题 -->
		<u-row gutter="16" justify="space-around" class="class-list" v-show="is_check">

			<u-button @click="roll_cal_list(true)">在</u-button>
			<u-button @click="roll_cal_list(false)">不在</u-button>

		</u-row>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 弹出层
				show: false,
				// 当前班级下标
				class_index: 0,
				// 当前班级名单
				user_list: [

				],
				// 表格是否加载
				table_show: true,
				// 当前多选 选中的学生
				select_user_index: [],
				// 当前规则ID
				rule_id: 0,
				// 表格对象
				table_obj: null,
				// 是否多选提交
				is_check: false
			}
		},
		methods: {
			open() {
				this.show = true
				uni.showLoading({
					icon: 'loading',
					mask: true,
				});
			},
			str(n) {
				return n + ''
			},
			// 选择班级
			select_sclass: function(evt) {
				this.class_index = Number.parseInt(evt.target.value);
				this.user_list = []
				this.select_user_index = []
			},
			// 多选更新
			table_change(e) {
				this.table_obj = e
				this.select_user_index = e.detail
				console.log(e.detail)
			},
			// 弹出层打开
			popup_open() {
				uni.hideLoading();
			},
			// 选择规则
			select_rule(e) {
				this.get_class_user(e.detail.value)
			},

			// 获取班级名单
			get_class_user(id) {
				var class_id = this.vuex_class_list[this.class_index].id
				var rule_id = Number.parseInt(id)
				this.rule_id = rule_id
				uni.showLoading({
					icon: 'loading',
					mask: true,
				});
				this.$u.api.school_attendance_late_class({
					type: 1,
					rule_id: rule_id,
					class_id: class_id,
					task_id: this.vuex_task.id
				}).then(res => {
					this.user_list = res.data
					uni.hideLoading();
				})
			},
			submit(item, flg) {
				if (item.flg != null) return

				var records = {
					"user_id": item.user_id,
					"reason_is_custom": false,
					"reason": this.rule_id,
					"status": 0,
				}
				console.log(item)
				this.roll_cal([records], flg, function(a) {
					item.flg = flg
				})
			},
			// 点名 在/不在
			roll_cal(records, flg, fun) {
				// 用户ID
				//var user_list_id 
				// 规则ID
				//var rull_id
				// 点名状态
				//var flg
				uni.showLoading({
					icon: 'loading',
					mask: true,
				});
				this.$u.api.school_attendance_submit_late({
					task_id: this.vuex_task.id,
					flg: flg,
					records: records,
				}).then(res => {
					fun(res.code)
					uni.hideLoading();
				})
			},
			// 批量点名
			roll_cal_list(flg) {

				// 选中的下标
				var indexs = this.select_user_index
				var user_list = new Array();

				indexs.forEach(i => {
					user_list.push({
						user_id: this.user_list[i].id
					})
				})

				let fun = this.batch_flg
				this.roll_cal(user_list, flg, function(a) {
					fun(indexs, flg)
				})

			},
			batch_flg(indexs, flg) {
				indexs.forEach(i => {
					this.user_list[i].flg = flg
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.call {
		.u-td {
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

	.class-list {
		padding: 15rpx;
	}


	.operation {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	// .class-list ::v-deep .u-table {
	// 	.u-tr{
	// 		.u-td{
	// 			height: 70rpx;
	// 		}
	// 	}
	// }
</style>
