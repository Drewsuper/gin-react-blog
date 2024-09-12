const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
	app.use(
		createProxyMiddleware('/api', {
				target: "http://192.168.195.135:1010/v1/api/", // /api
				changeOrigin: true,
				pathRewrite:{'^/api':''}
			},
		)
	)
	app.use(
		createProxyMiddleware('/v1', {
				target: "http://192.168.195.135:1010/", // /api
				changeOrigin: true,
				pathRewrite:{'^/v1':''},
			},
		)
	)
}