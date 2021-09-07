

// 项目公共配置
let config = {
	// 接口前缀
	baseUrl:'http://douban-api.gek6.cn',
	qiniuTokenApi: "http://127.0.0.1:8000/api/manage/upload"
	
}

if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
	// 这里可配置开发环境的baseUrl等参数
	config['http']
}else{
    console.log('生产环境')
}





export default {
	install:function(Vue){
		Vue.prototype.$config = config
	},
	...config
}
