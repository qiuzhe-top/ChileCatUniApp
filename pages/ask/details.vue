<template>
	<view class="details">
		<view class="ask-type u-font-40">{{ form.ask_type }}</view>

		<view class="box time u-flex u-row-between">
			<view class="start-time ">{{ form.start_time }}</view>
			<view class="end-time ">{{ form.end_time }}</view>
		</view>

		<view class="hr"></view>
		<view class="box students-name ">
			<text>请假人：</text>
			<text>{{ form.students_name }}</text>
		</view>
		<view class="box students-name ">
			<text>地点：</text>
			<text>{{ form.place }}</text>
		</view>
		<view class="box students-name ">
			<text>原因：</text>
			<text>{{ form.reason }}</text>
		</view>
	
		<view class="hr"></view>
		
		<view class="box continue " @click="continue_show=true" v-if="ex_show">
			
			<text>续假日期：{{ time.replace('/', "-") }} （点击选择时间完成续假）</text>
			<u-picker  mode="time" v-model="continue_show" :start-year="2020" :params="params" @confirm="confirm_tim_continue">
				
			</u-picker>
		</view>

		<view class="btn u-flex u-row-between">
			<u-button type="primary" @tap="draft_delete()" v-if="de_show">撤销请假</u-button>
			<u-button type="primary" @tap="extend_leave()" v-if="ex_show">续假</u-button>
			<u-button type="primary" @tap="download()" :disabled="dow">下载假单</u-button>
			<web-view v-if="dow"  :src="word_url"></web-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			word_url:'http://10.147.20.45:8000/api/ask/exportword?ask_id=',
			form: {},
			dow:false,
			time: '',
			continue_show: false,
			params: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true
			},
		};
	},
	computed:{
		de_show(){
			return  ['first_audit'].includes(this.form.status)
		},
		ex_show(){
			return  ['passed'].includes(this.form.status)
		},
	},
	onLoad: function() {
		this.draft_get();
	},
	methods: {
		// 获取详情
		draft_get() {
			this.$store.dispatch('ask/draft_get', { id: this.$store.getters.ask_now.id }).then(res => {
				this.$data.form = res.data;
				this.time = res.data.end_time
				this.word_url = this.word_url + res.data.id
				console.log(this.word_url)
			});
		},
		// 续假
		extend_leave() {
			this.$store
				.dispatch('ask/draft_put', { id: this.form.id, extra_time: 1, time_back: this.time })
				.then(res => {
					if (res.code != 2000) return true;
					uni.redirectTo({
						url: '/pages/ask/result?flg=2'
					});
				})
				.catch(err => {
					console.log(err.data);
				});
		},
		// 撤销请假条
		draft_delete() {
			this.$store.dispatch('ask/draft_delete', { id: this.form.id }).then(res => {
				uni.redirectTo({
					url: '/pages/ask/result?flg=1'
				});
			});
		},
		confirm_tim_continue(e){
			this.time = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute;
		},
		download(){
			// this.$api.ask.draft_exportword({ask_id:this.form.id})
			this.dow = true
			setTimeout(function () {
			    this.dow = false
			}, 1000);
			return
			uni.downloadFile({
			    url: 'http://10.147.20.45:8000/api/ask/exportword?ask_id='+this.form.id, //仅为示例，并非真实的资源
			    success: (res) => {
			        if (res.statusCode === 200) {
						  // var tempFilePaths = res.tempFilePaths;
						var tempFilePaths = res.tempFilePaths;
						
						let eleLink = document.createElement('a')
						let blob = res.tempFilePath
						let url = window.URL.createObjectURL(blob)
						eleLink.href = url
						eleLink.download = name
						document.body.appendChild(eleLink)
						eleLink.click()
						window.URL.revokeObjectURL(url)
					
			            console.log('下载成功',tempFilePaths);
						  //  uni.saveFile({
							 // tempFilePath: res.tempFilePath,
							 // success: function (res) {
							 //   var savedFilePath = res.savedFilePath;
							 // }
						  //  });
			        }
			    }
			});
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
	padding: 10rpx;

	// background-color: $uni-bg-color-light;
}

.ask-type {
	margin-top: 50rpx;
}
.start-time {
}
.end-time {
}
.box {
	// margin-top: 40rpx;
	padding-top: 40rpx;
	text:nth-child(1) {
		color: $uni-text-color-grey;
	}
}
.hr {
	height: 1px;
	background-color: $uni-bg-color-light;
	margin: 5rpx 0;
}
.btn {
	button {
		width: 45%;
		margin-top: 60rpx;
	}
}
</style>
