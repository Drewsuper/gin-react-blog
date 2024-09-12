package routers

import (
	"gin-new/app/handlers"
	"gin-new/app/handlers/blogHandler"
	"gin-new/app/handlers/classHandler"
	"gin-new/app/handlers/tagHandler"
	"gin-new/app/middleware"

	"github.com/gin-gonic/gin"
)

func init_blog_router(g *gin.RouterGroup) {
	g.POST("/blog/find_by_id_all", middleware.Auth(), blogHandler.FindBlogHandler)
	g.POST("/blog/find_by_id", blogHandler.FindBlogContextHandler)
	g.POST("/blog/new", middleware.Auth(), blogHandler.NewBlogHandler)
	g.POST("/blog/find_all", blogHandler.AllFindBlogHandler)
	g.POST("/blog/find_page", blogHandler.FindPageBlogHandler)
	g.GET("/blog/get_size", blogHandler.FindBlogSize)
	g.POST("/blog/find_all_info_id", middleware.Auth())
	g.POST("/blog/class/new", middleware.Auth(), classHandler.NewClassHandler)
	g.POST("/blog/class/update", middleware.Auth(), classHandler.UpdateClassHandler)
	g.POST("/blog/class/delete", middleware.Auth(), classHandler.DeleteClassHandler)
	g.POST("/blog/class/find_id", classHandler.FindClassById)
	g.POST("/blog/class/find_id_info", middleware.Auth(), classHandler.FindClassAllInformationById)
	g.POST("/blog/class/find", classHandler.FindAllClass)
	g.POST("/blog/class/find_all_label", middleware.Auth(), classHandler.FindAllClassLabel) //鉴权
	g.POST("/blog/class/find_all_info", middleware.Auth(), classHandler.FindAllClassInformation)
	g.POST("/blog/tag/new", middleware.Auth(), tagHandler.NewTagHandler)
	g.POST("/blog/tag/delete", middleware.Auth(), tagHandler.DeleteTagHandler)
	g.POST("/blog/tag/update")
	g.POST("/blog/tag/find_id", tagHandler.FindTagById)
	g.POST("/blog/tag/find_id_info", middleware.Auth(), tagHandler.FindTagAllInformationById)
	g.POST("/blog/tag/find", tagHandler.FindAllTag)
	g.POST("/blog/tag/find_all_info", middleware.Auth(), tagHandler.FindAllTagsAllInformation)
	g.POST("/blog/tag/find_class_id", tagHandler.FindTagsByClassId)
	g.POST("/blog/tag/find_all_label", middleware.Auth(), tagHandler.FindAllTagsLabel) // 鉴权
	g.POST("/check", handlers.CheckAuth)
}
