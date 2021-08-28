<template>
	<view>

		<u-row>
			<u-col span="7" offset="1">
				<u-input v-model="username" :type="type" scroll-y scroll-top="30" :border="border"
					placeholder="请输入学号" />
			</u-col>
			<u-col span="3">
				<u-button @click="search()">搜索</u-button>
			</u-col>
		</u-row>

		<view class="user-msg">
			<text>{{user.username}}</text>
			<text>{{user.name}}</text>
		</view>

		<u-row gutter="16" class="">
			<u-col span="10" offset="1">
				<scroll-view style="height: 600rpx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
					@scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
					<u-table @change="table_change" is-check>
						<u-tr>
							<u-th width="20rpx">
								<u-checkbox v-model="is_select_all"></u-checkbox>
							</u-th>
							<u-th>规则</u-th>
							<u-th width="90rpx">分值</u-th>
						</u-tr>

						<u-tr v-for="item in rule_list" :key="item.id">
							<u-td width="30rpx">
							<u-checkbox v-model="item.checked"></u-checkbox>
							</u-td>
							<u-td>{{ item.name }}</u-td>
							<u-td width="90rpx">{{ item.score }}</u-td>
						</u-tr>

					</u-table>
				</scroll-view>
			</u-col>
		</u-row>


		<u-row>
			<u-col span="5" offset="1">
				<u-button @click="submit()">提交</u-button>
			</u-col>
			<u-col span="5">
				<u-button @click="open_rule_box">
					自定义提交
				</u-button>
			</u-col>
		</u-row>

		<u-toast ref="uToast" />

		<u-modal v-model="u_modal_show" @confirm="confirm" :show-cancel-button="true">
			<view>
				<u-field v-model="role_name" label="名称" placeholder="请填违纪名称">
				</u-field>
				<u-field v-model="role_score" label="分值" type="number" maxlength="1" placeholder="请填写对应分值">
				</u-field>
			</view>
		</u-modal>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'text',
				// 滑动
				border: true,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				// 待搜索的用户名
				username: '',
				// 用户
				user: {},
				// 规则列表
				rule_list: [],
				// 自定义规则
				u_modal_show: false,
				role_name: '',
				role_score: 1,
				// 是否全选
				is_select_all: false
			}
		},
		watch: {
			is_select_all: function(e) {
				this.rule_list.forEach(u => {
					u.checked = e
				})
			}
		},
		mounted() {
			this.vuex_discipline_rules.forEach(u => {
				u.checked = false
				this.rule_list.push(this.$u.deepClone(u))
			})
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// 搜索用户
			search() {
				if (!this.username) return
				uni.showLoading({
					icon: 'loading',
					mask: true,
				});
				this.$u.api.school_information_student_information({
					username: this.username
				}).then(res => {
					this.user = res.data
					uni.hideLoading();
				}).catch(e => {
					this.user = {
						username: '没有用户',
						name: ' '
					}
				})
			},
			// 多选更新
			table_change(e) {
				this.$data.select_role_index = e.detail
			},
			// 显示自定义提交
			open_rule_box() {

				this.$data.u_modal_show = true
			},
			// 自定义违纪规则提交
			confirm() {
				uni.showLoading({
					icon: 'loading',
					mask: true,
				});

				this.api([{
					reason: this.$data.role_name,
					score: this.$data.role_score,
					user_id: this.$data.user.id,
					reason_is_custom: true,
					status: 0,
				}])
			},
			// 提交
			submit() {
				var records = new Array();
				var checked_list = new Array();
				this.rule_list.forEach(e => {
					if (e.checked) {

						records.push({
							"user_id": this.$data.user.id,
							"reason_is_custom": false,
							"reason": e.id,
							"status": 0,
						})

						checked_list.push(e)
					}
				})

				if (records.length == 0) {
					this.$refs.uToast.show({
						title: '请重新选择规则',
						type: 'warnin',
					})
					return
				}


				uni.showLoading({
					icon: 'loading',
					mask: true,
				});


				this.api(records)


			},
			api(data) {
				var username = this.$data.user.username
				if (username == '' || username == null || username == undefined) {
					this.$refs.uToast.show({
						title: '请选择学生',
						type: 'warnin',
					})
					uni.hideLoading();
					return
				}
				var request = {}
				request['task_id'] = this.vuex_task.id
				request['records'] = data
				// 发起请求
				this.$u.api.school_attendance_submit_late_discipline(request).then(res => {
					uni.hideLoading();
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success',
					})
					this.$data.select_role_index = []
					// this.$data.user_list = res.data.data
					this.$data.username = ''
					this.$data.user = {}
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss">
	.input-username {

		// width: 80%;
		button {

			height: 75rpx;
		}
	}

	.user-msg {
		text-align: center;
		margin-bottom: 40rpx;

		text {
			// display: block;
			margin: 0 40rpx;
		}
	}
</style>
