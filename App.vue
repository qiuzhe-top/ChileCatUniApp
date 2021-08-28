<script>
	export default {
		// 此处globalData为了演示其作用，不是uView框架的一部分
		globalData: {
			username: '白居易'
		},
		onLaunch() {
			// 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
			// 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
			// import httpInterceptor from '@/common/http.interceptor.js'
			// Vue.use(httpInterceptor, app)
			// process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
			/**
			 * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
			 */
			if(uni.getStorageSync('token')){
				this.$store.dispatch('init_app',false)
			}else{
				this.$store.dispatch('logout')
			}
		},
	}
</script>

<style lang="scss">
	// @import  "uview-ui/libs/font/font.css";
	@import "uview-ui/index.scss";
	@import "common/demo.scss";
	@font-face {
	    font-family: 'YouShe'; /* 重命名字体名 */
	    // src: url('static/font/YouSheBiaoTiHe.ttf');
	    src: url('https://zhcy-zjjt.oss-cn-beijing.aliyuncs.com/static/font/YouSheBiaoTiHe.ttf');
	    font-weight: normal;
	    font-style: normal;
	}
	*{
		padding: 0;
		margin: 0;
	}
	body {
		// background: $u-bg-color !important;
	}
	
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