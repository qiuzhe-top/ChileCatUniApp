<script>
	import Vue from 'vue'
	
	export default {
		created() {
			// #ifdef APP-PLUS
			plus.navigator.closeSplashscreen(); 
			// #endif 
			
			
			
		// 	// 在页面加载时读取sessionStorage里的状态信息
			if (sessionStorage.getItem('store')) {
			  this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
			}
		
			// 在页面刷新时将vuex里的信息保存到sessionStorage里
			window.addEventListener('beforeunload', () => {
			  sessionStorage.setItem('store', JSON.stringify(this.$store.state))
			})
			
			
		},
		onLaunch: function() {
			console.log('App Launch')
			// let a = uni.getStorageSync('token')
			// if(!a){
			// 	console.log('login')
				// uni.navigateTo({
				// 	url:"pages/login/login"
				// })
			// }
			
			uni.reLaunch({
				url: '/pages/login/login'
			});
			// uni.navigateTo({
			// 	url:"pages/login/login"
			// })
			
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
		
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App 开启')
		},
		onHide: function() {
			console.log('App 关闭')
		}
	}
</script>

<style  lang="scss">
	/* 公共样式 */
	// @import './common/css/iconfont.css';
	@import './common/css/common.css';
	@import url('//at.alicdn.com/t/font_2269800_oq1y3uwsvx.css');
	@import "uview-ui/index.scss";
	body{
		background: #FFFFFF !important;
	}
	 uni-page-body,html,body{  
		height: 100%;  
	}  
	.icon {
	  width: 1em;
	  height: 1em;
	  vertical-align: -0.15em;
	  fill: currentColor;
	  overflow: hidden;
	}
</style>
