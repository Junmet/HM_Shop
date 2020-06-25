const base_url = 'http://localhost:8082'

let httpNumber = 0

export const http = (params) => {

	httpNumber++
	uni.showLoading({
		title: "正在加载....",
		mask: true
	})

	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + params.url,
			method: params.method || 'GET',
			data: params.data || {},
			success: (res) => {
				if (res.statusCode !== 200) {
					return uni.showToast({
						title: '获取数据失败'
					})
					console.log(res)
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			},
			complete: () => {
				httpNumber--
				if (httpNumber === 0) {
					// 关闭提示正在加载中的窗口
					 uni.hideLoading();
				}
			}
		})
	})
}
