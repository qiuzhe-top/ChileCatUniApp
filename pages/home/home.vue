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
				<u-cell-item v-if="name!=this.title" icon="setting" title="退出登录" v-on:tap="logout()"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pic:'https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/03/30/21_avatar_max.jpg',
			show:true,
			title: '请登录',
		};
	},
	 computed: {
		name: function () {
		  return this.$store.getters.name ? this.$store.getters.name : this.title
		}
	  },
	onLoad() {
	},
	methods: {
		logout() {
			this.$store.dispatch('user/logout')
		},
		login(){
			if(this.name ==this.title){
				uni.navigateTo({
					url:'/pages/auth/login'
				})
			}
		}
	}
};
</script>


<style lang="scss">
page{
	background-color: $uni-bg-color-light;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: $uni-bg-color-hover;
	}
}
.user-box{
	background-color: #fff;
}
</style>
