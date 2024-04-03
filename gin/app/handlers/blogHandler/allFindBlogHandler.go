package blogHandler

import (
	"gin-new/app/models/blogModel"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

func AllFindBlogHandler(ctx *gin.Context) {
	var data []blogModel.BlogModel
	err := blogModel.AllFindBlog(&data)
	if err == nil {
		ctx.JSON(200, types.CommonRps{
			200,
			"success",
			data,
		})
		return
	} else {
		ctx.JSON(200, types.CommonRps{
			Code: 400,
			Mes:  "failed",
			Data: err,
		})
		return
	}
}
