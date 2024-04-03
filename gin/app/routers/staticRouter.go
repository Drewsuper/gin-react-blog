package routers

import (
	"gin-new/app/handlers/fileHandler"
	"github.com/gin-gonic/gin"
)

func init_static_router(g *gin.RouterGroup) {
	g.Static("/static", "static")
	// 加入授权
	g.POST("/img", fileHandler.ImageFileUploadHandler)
	g.POST("/md", fileHandler.MdFileUpLoadHandler)
}
