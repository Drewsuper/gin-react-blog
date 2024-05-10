const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
	app.use(
	createProxyMiddleware('/api', {
		target: "http://localhost:8081/v1/api/",
		changeOrigin: true,
		pathRewrite:{'^/api':''}
	})
	)
}