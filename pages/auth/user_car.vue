<template>
	<view class="user_car ">
		<view class="u-flex u-col-top u-row-between">

			<view class="u-flex" v-on:click="login">
				<!-- 头像 -->
				<u-image  class="u-skeleton-rect" :width="portrait_height" :height="portrait_height" :src="vuex_user.avatar">
				</u-image>
				<!-- 个人信息 -->
				<view class="username u-flex u-flex-col u-row-center u-m-l-30 ">
					<text
						class="name u-font-xl u-m-b-10 u-main-color u-skeleton-rect">{{msg}}{{vuex_user.username}}</text>
					<view class="organization u-type-info u-skeleton-rect">
						<u-icon name="map u-m-r-5"></u-icon>
						<text class="u-font-xs">浙江交通 {{vuex_user.college}}  {{vuex_user.grade}}</text>
					</view>
				</view>
			</view>

			<!-- 设置 -->
			<view class="set " v-on:click="to">
				<u-icon class="u-skeleton-rect" name="setting"></u-icon>
			</view>
		</view>

		<!-- 进度条 -->
		<view class="progress u-m-b-20">
			<u-line-progress class="u-skeleton-rect" active-color="#7EB9FC" :percent="percent" :show-percent="false"
				:height="8"></u-line-progress>
			<view class="u-flex u-row-between u-font-xs u-type-info ">
				<text>我的经验</text>
				<text> {{vuex_user.experience.a}}/{{vuex_user.experience.b}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
			
				msg: '您好请登录',
				portrait_height: '150rpx',
				percent:0,
			}
		},
		watch: {
			vuex_token: function() {
				this.init()
			}
		},
		created() {
			this.init() 
		},
		methods: {
			init(){
				if (this.vuex_token) {
					this.msg = 'Hello、'
				} else {
					this.msg = '您好 请登录'
				}
				this.percent = (this.vuex_user.experience.a / this.vuex_user.experience.b) * 100
			},
			login() {
				if(!this.vuex_token){
					this.$u.route('/pages/auth/login');
				}
			},
			to(){
				this.$u.route({
					url:'/pages/setting/index'
				})
			}
		}
	}
</script>


<style lang="scss">
	.user_car {
		.username {
			height: 180rpx;
			align-items: flex-start;

			.name {
				font-weight: 800;
			}

			.organization {}
		}

		.set {
			$h: 70rpx;
			width: $h;
			height: $h;
			text-align: center;
			line-height: $h;
		}

		.progress {
			width: 70%;
			margin-top: -8rpx;
		}
	}
</style>
