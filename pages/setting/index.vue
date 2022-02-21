<template>
	<view>
		<!-- 设置选项 -->
		<u-cell-group>
			<template v-if="vuex_token">
				<u-cell-item icon="setting" v-on:tap="toPage('pages/setting/bed_position')" title="修改床位"></u-cell-item>
				<u-cell-item icon="setting" title="修改密码" @click="up_password_show = true"></u-cell-item>
				<u-cell-item icon="setting" title="退出登录" @click="logout"></u-cell-item>
			</template>
		</u-cell-group>
	
		<u-modal title="修改密码" v-model="up_password_show" @confirm="confirm" ref="uModal"
			:show-cancel-button="true" :async-close="true">
			<view class="up_password">
				<u-input v-model="password_old" placeholder="登录密码" type="password" />
				<u-input v-model="password_new" placeholder="新密码" type="password" />
				<u-input v-model="password_new_repaet" placeholder="再次输入新密码" type="password" />
			</view>
		</u-modal>
			

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: 'https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/03/30/21_avatar_max.jpg',
				up_password_show: false,
				password_new: '',
				password_new_repaet: '',
				password_old: '',
				title: '请登录',
			};
		},
		methods: {
			logout() {
				this.$u.route({
					url:'pages/index/index',type:"reLaunch"
				})
				this.$store.dispatch('logout')
			},
		
			confirm() {
				if(this.$data.password_new.length<6){
					this.$refs.uToast.show({
						title: '密码最短6位',
						type: 'error',
					})
					this.$refs.uModal.clearLoading();
					return
				}
				if(this.$data.password_new != this.$data.password_new_repaet ){
					this.$refs.uToast.show({
						title: '两次密码不一样',
						type: 'error',
					})
					this.$refs.uModal.clearLoading();
					return
				}
				setTimeout(() => {
					this.$u.api.user_edit_password({
							password_old: this.$data.password_old,
							password_new: this.$data.password_new,
							password_new_repaet: this.$data.password_new_repaet,
						}).then(res => {
							this.up_password_show = false;
							this.$refs.uToast.show({
								title: e.data.message,
								type: 'success',
							})
						})
						.catch(e => {
							this.$refs.uToast.show({
								title: e.data.message,
								type: 'error',
							})
							this.$refs.uModal.clearLoading();
						})
				}, 1000)
			},
			toPage(url) {
				this.$u.route(url)
			}
		},
	}
</script>

<style lang="scss">
	// 修改密码框
	.up_password {
		padding: 30rpx;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			// background-color: $uni-bg-color-hover;
		}
	}

	.user-box {
		background-color: #fff;
	}

	.version {
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 25rpx;
		font-size: 15rpx;
		color: #dadada;

		a {
			color: #dadada;
		}
	}
</style>
