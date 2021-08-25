module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			// 调试时允许内网穿透，让外网的人访问到本地调试的H5页面
			disableHostCheck: true,
			proxy: {
				'/api': {
					target: 'http://127.0.0.1:8000/api',
					ws: true,
					changeOrigin: true,
					pathRewrite: {
						'^/api': ''
					}
				},
				'/bpi': {
					target: 'https://douban.uieee.com/',
					ws: true,
					changeOrigin: true,
					pathRewrite: {
						'^/bpi': ''
					}
				}
			}
		}
	},
	//productionSourceMap: false,
}
