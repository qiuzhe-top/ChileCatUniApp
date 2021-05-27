<template>
	<view class="call">


		<u-row gutter="16" justify="space-around">
			
			<!-- 班级选择 -->
			<u-col span="4">
				<u-button type="success" size="mini" @click="show = true" plain>{{items_class[class_current]}}</u-button>
			</u-col>
			
			
			<!-- 点名次数 -->
			<u-col span="6">
				<radio-group @change="select_number" class="class-radio-group">
					<label class="radio">
						<radio value="" /><text>第一次</text>
					</label>
					<label class="radio">
						<radio value="" /><text>第二次</text>
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
			
			<u-table>
				
				<u-tr>
					<u-th width="60rpx"></u-th>
					<u-th>学校</u-th>
					<u-th>班级</u-th>
					<u-th>年龄</u-th>
					<u-th>年龄</u-th>
				</u-tr>
				
				<u-tr v-for="item in user_list">
					<u-td>
						<u-checkbox ></u-checkbox>
					</u-td>
					<u-td>
					{{item.username}}</u-td>
					<u-td>{{item.name}}</u-td>
					<u-td>{{item.status}}</u-td>
					<u-td width="160rpx" class="operation">
						<view class="">
						<u-button type="default" size="mini">缺</u-button>
						<u-button type="default" size="mini">缺</u-button>
						</view>
					</u-td>
				</u-tr>
				
							
			</u-table>
				
		</u-row>





		<!-- 弹出层 -->
		<u-popup v-model="show" mode="center" length="80%" height="60%" border-radius="14">
			<radio-group @change="select_sclass" class="class-radio-group">
				<view class="radio-box" v-for="(item, index) in items_class" :key="index">
					<label class="uni-list-cell uni-list-cell-pd">
						<radio :value="item" :checked="index === class_current" />
						{{item}}
					</label>
				</view>
			</radio-group>
		</u-popup>
		
		
	</view>
</template>

<script>
	import pop from '@/components/ming-pop/ming-pop.vue';

	export default {
		data() {
			return {
				// 弹出层
				show: false,
				// 班级列表
				items_class: ['195101', '195102', '195103', '195104'],
				// 当前班级列表
				class_current: 1,
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
					},
				]
			}
		},
		components: {
			pop
		},
		onLoad() {},
		methods: {
			open() {
				// this.$refs.pop.show()
			},
			select_sclass: function(evt) {
				for (let i = 0; i < this.items_class.length; i++) {
					if (this.items_class[i] === evt.target.value) {
						this.class_current = i;
						break;
					}
				}
			}

		}
	}
</script>

<style lang="scss">
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
