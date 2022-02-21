<template>
	<view class="people">
		<People @record="record" ref="people" :rule_codename_store='"00001"' init_people_store="cache">
		</People>
		<view class="button-sp-area">
			<button type="mini" class="sub-button" v-on:tap="submint">提交</button>
			<text class="msg">白色背景：学生不在寝室</text>
			<view class="simpie_tag u-flex u-row-center u-col-center u-flex-wrap ">
				<u-tag v-for="(item,index) in form_list" :key="item.id" :text="item.name + item.reason" type="info"
					:show="true" />
			</view>
		</view>
	</view>
</template>

<script>
	import People from './component/people.vue';
	export default {
		components: {
			People
		},
		data() {
			return {
				form_list: []
			};
		},
		onLoad: function(option) {
		
		},
		mounted() {
			
		},
		methods: {
			// 个人违纪添加
			record() {
				var user_obj = this.$refs.people.user_obj
				var form = this.$refs.people.form
				if(user_obj.reason==='撤销'){
					uni.showToast({
						title: '撤销',
						icon: 'none'
					});
				}else if (user_obj.reason != undefined && user_obj.reason.length != 0) {
					this.$refs.people.updata_style()
					form.push({
						'name': user_obj.name,
						'user_id': user_obj.user_id,
						'status': user_obj.status,
						'reason_is_custom': user_obj.reason_is_custom,
						'reason': user_obj.reason,
					})
					uni.showToast({
						title: '添加成功',
						icon: 'none'
					});
					this.$refs.people.init_user_obj()
				} else {
					uni.showToast({
						title: '添加失败，原因为空',
						icon: 'none'
					});
				}
				this.$data.form_list = form
			},
			// 发送请求
			submint() {
				var d = this.$refs.people.form
				uni.showLoading({
					title: '加载中'
				});

				this.$u.api.school_attendance_submit_knowing({
					task_id: this.vuex_task.id,
					records: d,
					room_id: this.vuex_room_now,

				}).then(res => {
					uni.showToast({
						title: "提交成功",
						duration: 6000
					});
					// var room = this.vuex_room_now
					// var b = room.substring(0,3)
					// var r = room.substring(3,5)
					// var t = this.vuex_task.type_name
					
					// try{
					// 	this.$store.dispatch('save', ['vuex_call.'+b+'.'+r+'.'+t+'', 1])
					// 	d.forEach(u=>{
					// 		var username = u['user_id']
					// 		this.$store.dispatch('save', ['vuex_call.'+b+'.'+r+'.'+username+'', 0])
					// 	})
					// }catch(e){
						
					// }
					
					setTimeout(function() {
						uni.navigateBack({
							delta: 0.8
						});
					}, 1000);
				});
			},

		}
	};
</script>

<style lang="scss">
	.people .button-sp-area {
		// margin-top: 80rpx;
	}

	.sub-button {
		width: 60%;
		color: #ffffff;
		background-color: #04b8fc;
	}

	.msg {
		display: inline-block;
		width: 100%;
		margin: 20rpx;
		color: $uni-text-color-disable;
		text-align: center;
	}
</style>
