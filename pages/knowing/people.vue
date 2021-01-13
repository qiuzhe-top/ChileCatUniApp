<template>
	<view class="people">
		<view class="people-box">
			<view v-for="item in people_list" class="box-map" v-bind:key="item.id" v-on:tap="to_people(item)">
				<view class="level" v-bind:class="{ active: item.status == '0' }">{{ item.name }}</view>
			</view>
		</view>
		<view class="button-sp-area"><button type="mini" class="sub-button" v-on:tap="submint">提交</button></view>



		<!-- 基本示例 -->
		<uni-popup ref="popup" type="dialog" :animation="false">
			<!-- @change="change" -->
			<view class="popup-content">
				<text class="user-name">{{user_obj.name}}</text>
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
						<view><radio :value="item" />{{ item }}</view>
						<!-- <view></view> -->
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view><radio value="其他"  />其他
							<input type="text" value="" @input="input_why" />
						</view>
					</label>
				</radio-group>
				
				<button type="default" v-on:tap="record()">确定</button>
			</view>
		</uni-popup>
		
		
		<!-- 确定框 -->
		<uni-popup ref="popupDialog" type="dialog" >
			<uni-popup-dialog :type="msgType" title="通知" content="欢迎使用 uni-popup!" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			form:[],
			user_obj:{},
			msgType:'',
			rommid:'',
			why:'', // 学生缺勤原因
			items: ["请假","无故"],
			current: 0,
			people_list:[],
			people_list1: [
				{
					id: '1',
					status: '1',
					name: '姓名1'
				},
				{
					id: '2',
					status: '0',
					name: '姓名2'
				},
				{
					id: '3',
					status: '0',
					name: '姓名3'
				},
				{
					id: '4',
					status: '0',
					name: '姓名'
				},
				{
					id: '5',
					status: '0',
					name: '姓名'
				},
				{
					id: '6',
					status: '0',
					name: '姓名'
				}
			]
		};
	},
	methods: {
		// 加载学生数据
		init_people(id) {
			this.$api.stupositioninfo({ id: id }).then(res => {
				if (res.data.code == 2000) {
					var peo_list = res.data.data;
					this.$data.people_list = peo_list;
				
				}
			});
		},
		// 打开原因
		to_people(item,done) {
			if(item.status=="1"){
				item.status="0"
				this.$data.form.unshift(
					{
						id:item.id,
						status:"0",
					}
				)
				uni.showToast({
					title:"撤销",
					icon: "none",
				})
			}else{
				this.$refs.popup.open();
			}
			this.$data.user_obj = item
		},
		// 输入原因
		input_why(evt){
			this.$data.user_obj.why =  evt.target.value
		},
		// 单选选择原因
		radioChange: function(evt) {
			this.$data.user_obj.why = evt.target.value
		},
		// 写入不在列表
		record(){
			if(this.user_obj.why!=undefined){
				this.$data.user_obj.status = "1"
				// this.user_obj.why= this.$data.why
				this.$data.form.unshift(
					{
						id:this.$data.user_obj.id,
						status:this.$data.user_obj.status,
						why:this.$data.user_obj.why,
					}
				)
				uni.showToast({
					title:"添加成功",
					icon: "none",
				})
			}else{
				uni.showToast({
					title:"添加失败，原因为空",
					icon: "none",
				})
			}
			this.$refs.popup.close();
		},
		// 发送请求
		submint(){
			var d = this.$data.form;//[]//this.$data.people_list
			
			// for (var i = 0; i < this.$data.people_list.length; i++) {
			// 	var item = this.$data.people_list[i];
			// 	if(item.status=="1"){//发送前获取房间本就为缺勤的学生
			// 		d.unshift(item)
			// 	}
			// }
			
			uni.showLoading({
			    title: '加载中'
			});
			this.$api.studentleak({datas:d,roomid:this.$data.roomid}).then(res => {
				if(res.data.code==2000){
					uni.showToast({
					    title: res.data.message,
					    duration: 6000,
						success:function(e){
							// console.log(this.$data.form)
							uni.navigateBack({
								delta:1
							})
						}
					});
				}
			})
			
			// this.$data.form=[]
		},
		/**
		 * 对话框点击确认按钮
		 */
		dialogConfirm() {
			// this.$refs.popupMessage.open()
			// console.log('点击确认');
			// 需要执行 done 才能关闭对话框
			
		},
	
		/**
		 * 对话框取消按钮
		 */
		dialogClose(done) {
			// this.msgType = 'info'
			// this.message = '点击了对话框的取消按钮'
			// 需要执行 done 才能关闭对话框
			done()
		},
	},
	onLoad: function(option) {
		this.$data.roomid=option.id
		this.init_people(option.id);
	}
};
</script>

<style>
.people {
	padding-top: 100rpx;
}
.people-box {
	--webkit-display: flex;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
}
.box-map {
	width: 50%;
	text-align: center;
}
.people-box .level {
	/* background-color: rgb(266, 254, 145); */
	padding: 25rpx 60rpx;
	margin-bottom: 60rpx;
	margin-right: 15rpx;
	display: inline-block;
	/* border: #3f536e solid 1rpx; */
	box-shadow: #c3c3c3 1px 1px 10px;
}
.people .popup-content{
	width: 90%;
	background-color: #fff;
	padding: 30rpx;
}
.people .uni-list-cell input{
	margin-top: 10rpx;
	height: 80rpx;
	border: #000000 solid 1rpx;
}
.people .uni-list-cell view{
	/* width: 100%; */
	margin-bottom: 40rpx;
}

.sub-button {
	width: 60%;
	color: #ffffff;
	background-color: #04b8fc;
}
.user-name{
	display: inline-block;
	margin-bottom: 20rpx;
}
.active{
	background-color: #04b8fc;
	color: #F1F1F1;
}
</style>
