<template>
	<view class="level">
		<text class="title">今日心情:</text>
		<view class="page-section">
			<u-radio-group style="display: flex; justify-content: space-around;" v-model="value" @change="radioGroupChange">
				<u-radio @change="radioChange" v-for="(item, index) in items" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
			</u-radio-group>
		</view>
		<text class="title">想说的话:</text>
		<view class="section"><textarea v-model="mobile" bindinput="bindTextAreaBlur" maxlength="999" placeholder="写这里" /></view>
		<button @click="send()">发送</button>
		<text class="msg" selectable="false" space="false" decode="false">我的心情只会分享给心理老师，不会给其他人看到</text>
	</view>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{ value: '1', name: '一星', disabled: false },
				{ value: '2', name: '二星', disabled: false },
				{ value: '3', name: '三星', disabled: false },
				{ value: '4', name: '四星', disabled: false },
				{ value: '5', name: '五星', disabled: false }
			],
			value: '五星',
			mobile: '',
			index:1,
		};
	},
	methods: {
		// 选中某个单选框时，由radio时触发
		radioChange(e) {
			// console.log(e);
		},
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {
			console.log(e);
			this.value = e
		},
		// 发送
		send() {
			this.$api.user.mood({ mod_level: this.value, message: this.mobile }).then(res=>{
				uni.showToast({
					title:'已分享'
				})
				this.mobile = ''
			});
		}
	}
};
</script>
<style scoped>
page-section >>> .u-radio__icon-wrap {
	background-color: red;
}
.u-radio__icon-wrap--checked[data-v-da6758f0] {
	background-color: red;
}
</style>
<style lang="scss">
.level {
	padding: 10px;
}
.level .title {
	line-height: 100rpx;
	color: #07c160;
	font-weight: bold;
}
.level .page-section radio-group {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.level .page-section radio-group label {
	padding: 10rpx;
}

.level .section {
	border: dashed 1rpx #05a352;
	height: 500rpx;
	padding: 15rpx;
}
.level .section textarea {
	height: 100%;
	width: 100%;
}

.level button {
	margin-top: 40rpx;
	background-color: #05a352;
	color: white;
}
.level .msg {
	display: inline-block;
	width: 100%;
	margin: 0 auto;
	text-align: center;
	font-size: 20rpx;
	color: #585858;
}
</style>
