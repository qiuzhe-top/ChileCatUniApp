const qiniu = require('qiniu-js')
import config from "@/config/config.js"

class Uploader {
	constructor() {}
		
	async upload_qiniu(file) {
		return new Promise(async (resolve, reject) => {
			let token = await this.getToken();
			const observable = qiniu.upload(file, null, token)
			const subscription = observable.subscribe(this.observer) // 上传开始
			subscription.unsubscribe() // 上传取消
			resolve(subscription)
		})
	}
	
	async getToken() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: config.qiniuTokenApi,
				method: "GET",
				success(res) {
					resolve(res.data.data)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	
	}
}
	

export default new Uploader();
