/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

// import store from '@/common/store'
function getToken(){
	var data = ''
	let a = uni.getStorageSync('token') // store.getters.token
	if(a) data = a
	return data
}
function getUrl(){
	if(process.env.NODE_ENV === 'development'){
		return 'http://127.0.0.1:8000'
		// return 'http://47.102.215.230:8000/api/'
	}else{
		// return 'http://47.100.95.58:8000/api/'
		return 'http://47.102.215.230:8000/api/' 
	}
}
export default {

	config: {
		// baseUrl: 'https://mockapi.eolinker.com/EXhGIn9ed87b6462798dd7a08fe15a450cb0d4e9e5a5bc6',

		baseUrl:getUrl(),

		header: {
			'Content-Type':'application/json;charset=UTF-8',
			'Access-Contro1-Allow-origin':'*'
			// 'Content-Type':'application/x-www-form-urlencoded'
		},  
		data: {},
		method: "GET",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		//TODO 加密数据
		
		//TODO 数据签名
		/* 
		_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
		_sign = {'sign': sign(JSON.stringify(options.data))}
		options.header = Object.assign({}, options.header, _token,_sign) 
		*/
	   options.header = {
	   	// 'Content-Type': 'application/x-www-form-urlencoded',
	   	'token': getToken(),
	   }
	  
		return new Promise((resolve, reject) => {
			let _config = null
	
			options.complete = (response) => {
				// uni.hideLoading();
				let statusCode = response.statusCode
				response.config = _config
				
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
			
				// 统一的响应日志记录
				_reslog(response)
				if (statusCode == 200) {
					resolve(response.data);
				}else{
					if (process.env.NODE_ENV === 'development') {
						console.log("【" + _config.requestId + "】 请求失败 结果：" + JSON.stringify(response.data))
					}
					uni.showToast({
						title: response.data.message,
						icon: "none",
						duration: 2000
					});
					reject(response)					
				}
				
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			// 统一的请求日志记录
			_reqlog(_config)

			if (process.env.NODE_ENV === 'development') {
				//console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					//console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}

			uni.request(_config);
		});
	}
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		//console.log("【" + req.requestId + "】 地址：" + req.url)
		if (req.data) {
			//console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		//console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
		if (res.config.data) {
			//console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		//console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch(_statusCode){
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}

