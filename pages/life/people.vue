<template>
	<view class="people">
		<view class="people-box">
			<view v-for="item in people_list" class="box-map" v-bind:key="item.id" v-on:tap="to_people(item)">
				<view class="level" v-bind:class="{ active: item.status == '0' }">{{ item.name }}</view>
			</view>
		</view>
		<view class="button-sp-area" v-if="work_type == 'health'">
			<button type="mini" class="sub-button" v-on:tap="showTree">
				卫生扣分
				<text v-show="score != 0">（-{{ score }}）</text>
			</button>
		</view>
		<view class="button-sp-area"><button type="mini" class="sub-button" v-on:tap="submint">提交</button></view>

		<tki-tree
			ref="tkitree"
			:selectParent="selectParent"
			:multiple="multiple"
			:range="dorm_point_rules"
			:foldAll="flod"
			rangeKey="name"
			@confirm="treeConfirm"
			@cancel="treeCancel"
		></tki-tree>

		<!-- 基本示例（弹窗） -->
		<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="80">
			<text class="user-name">姓名：{{ user_obj.name }}</text>
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in miss_items" :key="index">
					<view>
						<radio :value="item" />
						{{ item }}
					</view>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<radio value="其他" />
						其他
						<input type="text" value="" @input="input_why" />
					</view>
				</label>
			</radio-group>
			<button type="default" v-on:tap="record()">确定</button>
		</pop>
	</view>
</template>

<script>
import pop from '@/components/ming-pop/ming-pop.vue';

export default {
	components: {
		pop
	},
	data() {
		return {
			// 缺勤名单
			form: [],
			// 用户卫生扣分名单
			user_points: [],
			// 用户扣分规则
			user_point_rules:[],
			// 当前用户对象
			user_obj: {},
			msgType: '',
			// 房间id
			rommid: '',
			// 学生缺勤原因
			why: '',
			// 生活部工作类型
			work_type: 'health', //this.$store.getters.work_type,
			// 寝室分数
			score: 0,
			// 缺勤原因
			miss_items: ['请假', '无故'],
			current: 0,
		
			// 寝室卫生扣分规则
			dorm_point_rules: [
				{
					id: 6,
					name: '扣分4'
				},
				{
					id: 2,
					name: '扣分规则',
					children: [
						{
							id: 11,
							name: '扣分1'
						},
						{
							id: 223,
							name: '扣分2'
						}
					]
				}
			],
			// 切换单、多选
			multiple: true,
			// 切换父级可选
			selectParent: false,
			// 折叠已打开的子集
			flod: false,
			people_list: [],
			people_list1: [
				{
					id: '1',
					status: '0',
					name: 'Y1'
				},
				{
					id: '2',
					status: '0',
					name: 'R1'
				},
				{
					id: '3',
					status: '0',
					name: 'Y1'
				},
				{
					id: '4',
					status: '0',
					name: 'Y1'
				},
				{
					id: '5',
					status: '0',
					name: 'Y1'
				},
				{
					id: '6',
					status: '0',
					name: 'Y1'
				}
			]
		};
	},
	methods: {
		// 加载学生数据
		init_people(id) {
			this.$api.life.stupositioninfo({ id: id }).then(res => {
				if (res.data.code == 2000) {
					var peo_list = res.data.data;
					this.$data.people_list = peo_list;
				}
			});
		},
		// 打开原因
		to_people(item, done) {
			if (item.status == '1') {
				item.status = '0';
				this.$data.form.unshift({
					id: item.id,
					status: '0'
				});
				uni.showToast({
					title: '撤销',
					icon: 'none'
				});
			} else {
				this.$refs.pop.show();
			}
			this.$data.user_obj = item;
		},
		// 输入原因
		input_why(evt) {
			this.$data.user_obj.why = evt.target.value;
		},
		// 单选选择原因
		radioChange: function(evt) {
			this.$data.user_obj.why = evt.target.value;
		},
		// 写入不在列表
		record() {
			if (this.user_obj.why != undefined) {
				this.$data.user_obj.status = '1';
				// this.user_obj.why= this.$data.why
				this.$data.form.unshift({
					id: this.$data.user_obj.id,
					status: this.$data.user_obj.status,
					why: this.$data.user_obj.why
				});
				uni.showToast({
					title: '添加成功',
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: '添加失败，原因为空',
					icon: 'none'
				});
			}
			this.$refs.pop.close();
		},
		// 发送请求
		submint() {
			var d = this.$data.form; //[]//this.$data.people_list

			// for (var i = 0; i < this.$data.people_list.length; i++) {
			// 	var item = this.$data.people_list[i];
			// 	if(item.status=="1"){//发送前获取房间本就为缺勤的学生
			// 		d.unshift(item)
			// 	}
			// }

			uni.showLoading({
				title: '加载中'
			});
			this.$api.life.studentleak({ datas: d, roomid: this.$data.roomid, code: this.$store.getters.knowing_code }).then(res => {
				if (res.data.code == 2000) {
					uni.showToast({
						title: res.data.message,
						duration: 6000
					});

					setTimeout(function() {
						uni.navigateBack({
							delta: 0.8
						});
					}, 1000);
				}
			});

			// this.$data.form=[]
		},
		// 显示树形选择器
		showTree() {
			this.$refs.tkitree._show();
		},
		// 确定回调事件
		treeConfirm(e) {
			console.log(e);
		},
		// 取消回调事件
		treeCancel(e) {
			console.log(e);
		}
	},
	onLoad: function(option) {
		this.$data.roomid = option.id;
		if (this.work_type == 'health') {
			this.$data.people_list = this.$data.people_list1;
		} else {
			this.init_people(option.id);
		}
	}
};
</script>

<style lang="scss">
.people {
	padding-top: 20rpx;
	.title {
		text-align: right;
		padding-right: 40rpx;
		color: red;
	}
}
.people-box {
	--webkit-display: flex;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	margin-top: 100rpx;
}
.box-map {
	width: 50%;
	text-align: center;
}
.people-box .level {
	/* background-color: rgb(266, 254, 145); */
	min-width: 110rpx;
	padding: 25rpx 60rpx;
	margin-bottom: 60rpx;
	margin-right: 15rpx;
	display: inline-block;
	/* border: #3f536e solid 1rpx; */
	box-shadow: #c3c3c3 1px 1px 10px;
}
.people .popup-content {
	width: 90%;
	background-color: #fff;
	padding: 30rpx;
}
.people .uni-list-cell input {
	margin-top: 10rpx;
	height: 80rpx;
	border: #000000 solid 1rpx;
}
.people .uni-list-cell view {
	/* width: 100%; */
	margin-bottom: 40rpx;
}
.people .button-sp-area {
	margin-top: 80rpx;
}
.sub-button {
	width: 60%;
	color: #ffffff;
	background-color: #04b8fc;
}
.user-name {
	display: inline-block;
	margin-bottom: 20rpx;
	/* min-width: 200rpx; */
}
.active {
	background-color: #04b8fc;
	color: #f1f1f1;
}
</style>
