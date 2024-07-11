package routers

import (
	"gin-new/app/handlers/cacheHandler"
	"github.com/gin-gonic/gin"
)

func init_cache_ruter(r *gin.RouterGroup) {
	r.POST("/cache/get", cacheHandler.GetValueByKey)
	r.POST("/cache/set", cacheHandler.SetKeyWithoutEx)
	r.POST("/cache/del", cacheHandler.DelValueByKey)
}
