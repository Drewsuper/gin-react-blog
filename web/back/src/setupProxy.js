const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
	app.use(
	createProxyMiddleware('/api', {
		target: "http://localhost:8008/v1/api/", // /api
		changeOrigin: true,
		pathRewrite:{'^/api':''}
	})
	)
}