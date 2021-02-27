<template>
	<view>
		<view class="card u-m-b-20">
			<u-cell-group :border="false">
				<u-cell-item title="请假类别" arrow-direction="down" @click="ask_type_show = true">
					<!-- <u-icon  size="32" name="search" class="u-m-r-10"></u-icon> -->
					<text slot="icon" class="mark">*</text>
					<text slot="right-icon">{{ form.ask_type }}</text>
					<u-select slot="right-icon" v-model="ask_type_show" :list="list" @confirm="confirm_tim_ask_type"></u-select>
				</u-cell-item>
				<u-cell-item title="开始时间" arrow-direction="down" @click="ask_time_go_show = true">
					<text slot="icon" class="mark">*</text>
					<text slot="right-icon">{{ form.time_go }}</text>
					<u-picker slot="right-icon" mode="time" v-model="ask_time_go_show" :start-year="2020" :params="params" @confirm="confirm_tim_go"></u-picker>
				</u-cell-item>
				<u-cell-item title="结束时间" arrow-direction="down" @click="ask_time_back_show = true">
					<text slot="icon" class="mark">*</text>
					<text slot="right-icon">{{ form.time_back }}</text>
					<u-picker slot="right-icon" mode="time" v-model="ask_time_back_show" :start-year="2020" :params="params" @confirm="confirm_tim_back">
						{{ form.time_back }}
					</u-picker>
				</u-cell-item>
				<u-cell-item title="学生电话" :arrow="false">
					<text slot="icon" class="mark">*</text>
					<u-input slot="right-icon" placeholder="请输入学生电话" input-align="right" :trim="true" type="number" v-model="form.contact_info"></u-input>
				</u-cell-item>
				<u-cell-item title="家长电话" :arrow="false" :border-bottom="false">
					<text slot="icon" class="mark">*</text>
					<u-input placeholder="请输入家长电话" input-align="right" slot="right-icon" :trim="true" type="number" v-model="form.parents_call"></u-input>
				</u-cell-item>
			</u-cell-group>
		</view>

		<view class="card u-m-b-20 u-p-30">
			<text class="mark">*</text>
			请假地点
			<u-input v-model="form.place" type="text" :auto-height="true" placeholder="请输入请假地点(省 市 区 街道)" />
		</view>
		<view class="card u-m-b-60 u-p-30">
			<text class="mark">*</text>
			请假事由
			<u-input v-model="form.reason" type="textarea" :auto-height="true" :height="260" placeholder="请输入请假事由" />
		</view>

		<!-- <button class="u-m-b-60 draft" type="default" @tap=""></button> -->
		<u-button class="draft" :loading="isRotate" type="primary" @click="draft_post()">申请</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				ask_type: '',
				time_go: '年-月-日 时:分',
				time_back: '年-月-日 时:分',
				place: '',
				reason: '',
				contact_info: '',
				parents_call: ''
			},
			list: [
				{
					value: '1',
					label: '病假'
				},
				{
					value: '1',
					label: '其他'
				}
			],
			ask_type_show: false,
			ask_time_go_show: false,
			ask_time_back_show: false,
			time1:'',
			time2:'',
			params: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true
			},
			isRotate: false
		};
	},
	computed:{
	
	},
	onLoad() {
		// this.$store.dispatch('ask/leave_type');
		this.form.ask_type = this.list[0].label;
	},
	methods: {
		// 提交请假条
		draft_post() {
			let arr1 = Object.values(this.form)
			let arr2 = ['年-月-日 时:分','']
			let intersection = arr1.filter(function (val) { return arr2.indexOf(val) > -1 })
			
			if(intersection.length!=0){
				uni.showToast({
					title: '填写的信息不完整',
					icon: 'none',
					duration: 2000
				});
				return
			}
			
			if(this.is_time() || this.form.time_back == this.form.time_go){
				uni.showToast({
					title: '填写的时间不正确',
					icon: 'none',
					duration: 2000
				});
				return
			}
			
			this.isRotate = true
			this.$store
				.dispatch('ask/draft_post', this.form)
				.then(res => {
					// 跳转结果页面
					uni.redirectTo({
						url: '/pages/ask/result?flg=0'
					});
					this.isRotate = false;
				})
				.catch(err => {
					this.isRotate = false;
				});
		},
		// 开始时间回调
		confirm_tim_go(e) {
			this.form.time_go = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute;
			this.time1 = e
			
		},
		// 开始时间回调
		confirm_tim_back(e) {
			this.form.time_back = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute;
			this.time2 = e
		},
		// 请假类别回调
		confirm_tim_ask_type(e) {
			this.form.ask_type = e[0].label;
		},
		// 验证两个时间
		is_time(){
			let l1 = [
				parseInt(this.$data.time1.year),
				parseInt(this.$data.time1.month),
				parseInt(this.$data.time1.day),
				parseInt(this.$data.time1.hour),
				parseInt(this.$data.time1.minute),
			]	
			let l2 = [
				parseInt(this.$data.time2.year),
				parseInt(this.$data.time2.month),
				parseInt(this.$data.time2.day),
				parseInt(this.$data.time2.hour),
				parseInt(this.$data.time2.minute),
			]
			var flg = false
			for(var i = 0;i<l1.length;i++){
				if(l2[i]<l1[i]){
					flg = true
				}
			}
			return flg
		}
		
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: $uni-bg-color-light;
	.card {
		// border-radius: 15px;
		background-color: $uni-bg-color;
		border-bottom-left-radius: 15rpx;
		border-bottom-right-radius: 15rpx;
		padding-bottom: 15rpx;
		box-shadow: 0px 2rpx 5rpx $uni-bg-color-grey;
	}
	.mark {
		margin-right: 10rpx;
		color: $u-type-primary;
	}
	.draft {
		width: 80%;
		margin-bottom: 60rpx;
		height: 100rpx;
	}
}
</style>
