package blogHandler

import (
	"gin-new/app/models/blogModel"
	"gin-new/app/types"

	"github.com/gin-gonic/gin"
)

func FindBlogHandler(ctx *gin.Context) {
	data := types.BlogFindReq{}
	err := ctx.BindJSON(&data)
	if err == nil {
		blog, err := blogModel.FindOneById(data.ID)
		if err == nil {
			ctx.JSON(200, types.CommonRps{
				Code: 200,
				Mes:  "success",
				Data: blog,
			})
			return
		}
	}
	ctx.JSON(200, types.CommonRps{
		Code: 401,
		Mes:  "failed",
	})
	return
}

func FindBlogContextHandler(ctx *gin.Context) {
	data := types.BlogFindReq{}
	err := ctx.BindJSON(&data)
	if err == nil {
		blog, err := blogModel.FindBlogContextById(data.ID)
		if err == nil {
			ctx.JSON(200, types.CommonRps{
				Code: 200,
				Mes:  "success",
				Data: blog,
			})
			return
		}
	}
	ctx.JSON(200, types.CommonRps{
		Code: 401,
		Mes:  "failed",
	})
	return
}

func FindBlogSize(ctx *gin.Context) {
	num, err := blogModel.FindAllBlogSize()
	if err != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 402,
			Mes:  "failed",
		})
		return
	} else {
		ctx.JSON(200, types.CommonRps{
			Code: 200,
			Mes:  "success",
			Data: num,
		})
		return
	}
}
