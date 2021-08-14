<script>
	import Vue from 'vue';

	export default {
		created() {
			// // #ifdef APP-PLUS
			// plus.navigator.closeSplashscreen(); 
			// // #endif
		},
		onLaunch: function() {
			// uni.getSystemInfo({
			// 	success: function(e) { 
			// 		// #ifndef MP
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		if (e.platform == 'android') {
			// 			Vue.prototype.CustomBar = e.statusBarHeight + 50;
			// 		} else { 
			// 			Vue.prototype.CustomBar = e.statusBarHeight + 45;
			// 		}
			// 		// #endif

			// 		// #ifdef MP-WEIXIN
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		let custom = wx.getMenuButtonBoundingClientRect();
			// 		Vue.prototype.Custom = custom;
			// 		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			// 		// #endif

			// 		// #ifdef MP-ALIPAY 
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			// 		// #endif
			// 	}
			// });
		},

		onShow: function() {
			// console.log('App 开启')
			this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(uni.getStorageSync('store'))));
		},
		onHide: function() {
			// console.log('App 关闭')
			uni.setStorageSync('store', JSON.stringify(this.$store.state));
		},
		mounted() {
			// 创建cnzz统计js
			const script = document.createElement('script')
			script.src = 'https://s4.cnzz.com/z_stat.php?id=1280212062&web_id=1280212062'
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
		watch: {
			'$route': {
				handler(to, from) {
					setTimeout(() => { //避免首次获取不到window._czc
						if (window._czc) {
							let location = window.location;
							let contentUrl = location.pathname + location.hash;
							let refererUrl = '/';
							// 用于发送某个URL的PV统计请求，
							window._czc.push(['_trackPageview', contentUrl, refererUrl])
							window._czc.push(["_setAutoPageview", false]);
						}
					}, 300)
				},
				immediate: true // 首次进入页面即执行
			}
		}

	};
</script>

<style lang="scss">
	/* 公共样式 */
	@import './common/css/iconfont.css';
	@import './common/css/common.css';
	// @import url('https://at.alicdn.com/t/font_2269800_e2lb17yy4z8.css');
	@import 'uview-ui/index.scss';

	body {
		background: #ffffff !important;
	}

	// html,
	// body {
	// 	height: 100%;
	// }
	page {
		max-width: 1200rpx;
		margin: 0 auto;
	}

	a {
		text-decoration: none;
	}

	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
</style>
