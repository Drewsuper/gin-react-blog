package blogHandler

import (
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

func UpdateBlogContext(ctx *gin.Context) {
	var data types.BlogUpdateRep
	err := ctx.BindJSON(&data)
	if err == nil {
		ctx.JSON(200, types.CommonRps{
			Code: 200,
			Mes:  "success",
		})
		return
	}
	ctx.JSON(200, types.CommonRps{
		Code: 400,
		Mes:  "failed",
	})
	return
}
