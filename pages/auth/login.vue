<template>
	<view class="u-p-50">
		<view class="title">欢迎登录智慧彩云</view>
		<view class="msg">校园信息管理平台</view>
		<view class="box username">
			<u-input v-model="username" placeholder="账号" maxlength="20" />
		</view>
		<view class="box password">
			<u-input v-model="password" placeholder="密码" type="password" maxlength="20" />
		</view>
		<view class="login u-font-xs">
			<u-button class=" " type="primary" :loading="isRotate" @click="startLogin()">登录</u-button>
		</view>
		<!-- <view class="forget u-text-center u-m-t-50 u-font-sm">忘记密码</view> -->
	</view>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				username: '', //用户/电话
				password: '', //密码
				isRotate: false, //是否加载旋转
				isFocus: true // 是否聚焦
			};
		},
		components: {},
		mounted() {
			_this = this;
			if (process.env.NODE_ENV === 'development') {
				this.username = '19510145'
				this.password = '123456'
			}
			this.isLogin();
		},
		methods: {
			isLogin() {
				// 判断缓存中是否登录过，直接登录
				try {
					if (this.vuex_token) {
						//有登录信息
						this.$store.dispatch("setUserData",value); //存入状态
						this.$u.route('pages/index/index')
					}
				} catch (e) {
					// error
				}
			},
			startLogin(e) {
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.username.length == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}

				if (this.password.length < 0) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不能为空'
					});
					return;
				}

				_this.isRotate = true;
				// setTimeout(function() {
				// 	_this.isRotate = false;
				// }, 1000*10);
				this.web_login();
			},
			web_login() {
				var ps = {
					username: this.username,
					password: this.password
				};

				this.$u.api.user_login(ps).then(res => {
						// 缓存token
						uni.setStorageSync('token', res.data.token);
						// 初始化App
						this.$store.dispatch('init_app').then(res=>{
							_this.isRotate = false
						}).catch(e=>{
							_this.isRotate = false
						})
						// 跳转页面
						if (getCurrentPages().length == 1) {
							this.$u.route('/pages/index/index')
						} else {
							uni.navigateBack({
								delta: 1
							});
						}
					
					})
					.catch(error => {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '登录失败'
						});
						_this.isRotate = false;
					})

			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
		}
	};
</script>

<style scoped>
	uni-page-body,
	html,
	body {
		height: auto;
	}
</style>
<style lang="scss">
	// 修改密码框
	.up_password {
		padding: 30rpx;
	}

	.title {
		padding-top: 220rpx;
		font-size: 70rpx;
		color: $uni-text-color;
	}

	.msg {
		margin-top: 20rpx;
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
	}

	.box {
		width: 100%;
		padding: ($uni-spacing-col-lg)-4;
		background-color: $uni-bg-color-hover;
		color: $uni-text-color;
		border-radius: 2rpx;
		font-size: 24rpx;
		// box-shadow: 0 0 10rpx $uni-text-color-disable;
	}

	.username {
		margin-top: 120rpx;
	}

	.password {
		margin-top: 20rpx;
	}

	.login {
		margin-top: 40rpx;
		border-radius: 2rpx;
		box-shadow: 0 0 10rpx $uni-text-color-disable;

		button {
			height: 100rpx;
		}
	}
</style>
