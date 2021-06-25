<template>
	<view class="">
		<view class="input-username">
			<u-input v-model="username" :type="type" scroll-y scroll-top="30" :border="border" placeholder="请输入学号" />

			<u-button @click="search()">搜索</u-button>
		</view>


		<view class="user-msg">
			<text>{{user.username}}</text>
			<text>{{user.name}}</text>
		</view>



		<u-row gutter="16" justify="space-around" class="table-list">

			<scroll-view style="height: 600rpx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
				@scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
				<t-table @change="table_change" is-check>
					
					<t-tr>
						<t-th>规则</t-th>
						<t-th>分值</t-th>
					</t-tr>

					<!-- <t-tr >
							<t-td>自定义</t-td>
							<t-td>1</t-td>
					</t-tr> -->

					<t-tr v-for="item in rule_list" :key="item.id">
						<template v-if="item">
							<t-td>{{ item.name }}</t-td>
							<t-td>{{ item.score }}</t-td>
						</template>
					</t-tr>
					
				</t-table>
			</scroll-view>

		</u-row>



		<u-toast ref="uToast" />

		<u-button class="submit" @click="submit()">提交</u-button>
		
		<u-modal v-model="u_modal_show"  @confirm="confirm" :show-cancel-button="true">
			<view>
				<u-field v-model="role_name" label="名称" placeholder="请填违纪名称">
				</u-field>
				<u-field v-model="role_score" label="分值" type="number" maxlength="1" placeholder="请填写对应分值">
				</u-field>
			</view>
		</u-modal>
		
		<u-button class="submit" @click="open_rule_box">
			自定义提交
		</u-button>
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
				// 被选中的规则下标
				select_role_index: [],
				// 规则列表
				rule_list: this.$store.getters.vd_rull_list,

				// 自定义规则
				u_modal_show: false,
				role_name: '',
				role_score: 1
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
			

			// 获取规则

			// 搜索用户
			search() {
				uni.showLoading({
					icon: 'loading',
					mask: true,
				});
				this.$api.SchoolAttendance.student_information({
					username: this.$data.username
				}).then(res => {
					this.$data.user = res.data.data
					uni.hideLoading();
				})
			},
			// 多选更新
			table_change(e) {
				this.$data.select_role_index = e.detail
			},
			// 显示自定义提交
			open_rule_box(){
				
				this.$data.u_modal_show = true
			},
			// 自定义违纪规则提交
			confirm() {
				uni.showLoading({
					icon: 'loading',
					mask: true,
				});
				this.api(this.role_name, {
					role_obj: {
						role_name:this.$data.role_name,
						role_score:this.$data.role_score,
					},
					username: this.$data.user.username,
					type: 1
				} )
			},
			// 提交
			submit() {

				// 规则下标转id
				var indexs = this.$data.select_role_index

				if (indexs.length == 0) {
					this.$refs.uToast.show({
						title: '请重新选择规则',
						type: 'warnin',
					})
					return
				}
				
				var list = new Array()
				indexs.forEach(n => {
					list.push(this.$data.rule_list[n].id)
				})

				uni.showLoading({
					icon: 'loading',
					mask: true,
				});

				this.api(list, {
					rule_id_list: list,
					username: this.$data.user.username,
					type: 1
				})
				

			},
			api(list, data) {
				var username = this.$data.user.username
		
				if (username == '' || username == null || username == undefined) {
					this.$refs.uToast.show({
						title: '请选择学生',
						type: 'warnin',
					})
					uni.hideLoading();
					return
				}
			
				// 发起请求
				this.$api.SchoolAttendance.submit({
					type: 0,
					task_id: this.$store.getters.task_now.id,
					data:data
				}).then(res => {
					uni.hideLoading();
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success',
					})
					this.$data.select_role_index = []
					// this.$data.user_list = res.data.data
					this.$data.username = ''
					this.$data.user = {}
				}).catch(err =>{
				})
			}
		}
	}
</script>

<style lang="scss">
	.input-username {
		display: flex;
		width: 80%;
		padding: 30rpx 0;

		margin: 0 auto;

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

	.table-list {
		padding: 0 20rpx;
	}

	.submit {
		width: 50%;
		margin-top: 40rpx;
	}
</style>
