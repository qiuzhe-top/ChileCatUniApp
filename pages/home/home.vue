<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-60 u-p-t-80">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1" v-on:tap="login()">
				<view class="u-font-18 u-p-b-20">{{name}}</view>
				<view class="u-font-14 u-tips-color" v-if="name!=this.title">班级:{{this.$store.getters.grade}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>

		<view class="u-m-t-20" style="">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>

				<template v-if="name!=this.title">
					<u-modal title="修改密码" v-model="up_password_show" @confirm="confirm" ref="uModal" :show-cancel-button="true"
						:async-close="true">
						<view class="up_password">
							<u-input v-model="password_new" placeholder="请输入新密码" type="password" />
							<u-input v-model="password_repeat" placeholder="再次输入密码" type="password" />
						</view>
					</u-modal>
					<u-cell-item icon="setting" title="修改密码" @click="showModal"></u-cell-item>
					<u-cell-item icon="setting" title="退出登录" v-on:tap="logout()"></u-cell-item>
				</template>
			</u-cell-group>
		</view>
		<view class="version">
			V1.1
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: 'https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/03/30/21_avatar_max.jpg',
				up_password_show: false,
				password_repeat: '',
				password_new: '',
				title: '请登录',
			};
		},
		computed: {
			name: function() {
				return this.$store.getters.name ? this.$store.getters.name : this.title
			}
		},
		onLoad() {},
		methods: {
			logout() {
				this.$store.dispatch('user/logout')
			},
			login() {
				if (this.name == this.title) {
					uni.navigateTo({
						url: '/pages/auth/login'
					})
				}
			},
			showModal() {
				this.up_password_show = true;
			},
			confirm() {
				setTimeout(() => {
					// 3秒后自动关闭
					// this.up_password_show = false;
					// 如果不想关闭，而单是清除loading状态，需要通过ref手动调用方法
					// this.$refs.uModal.clearLoading();

					this.$store.dispatch('user/ChangePassword', {
							password_repeat: this.$data.password_repeat,
							password_new: this.$data.password_new,
						}).then(res => {
							this.$store.dispatch('user/logout')
							this.up_password_show = false;
							this.$refs.uToast.show({
								title: '修改成功',
								type: 'success',
								url: '/pages/auth/login'
							})
							
						})
						.catch(e => {
							this.$refs.uModal.clearLoading();
						})
				}, 1000)


			}
	
		}
	};
</script>


<style lang="scss">
	page {
		background-color: $uni-bg-color-light;
	}

	// 修改密码框
	.up_password {
		padding: 30rpx;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: $uni-bg-color-hover;
		}
	}

	.user-box {
		background-color: #fff;
	}

	.version {
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 5rpx;
		font-size: 15rpx;
		color: #dadada;
	}
</style>
