const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
	app.use(
	createProxyMiddleware('/api', {
		target: "http://127.0.0.1:8008/api/v1/", // /api
		changeOrigin: true,
		pathRewrite:{'^/api':''}
	})
	)
}