package classHandler

import (
	"gin-new/app/models/blogClasses"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

func DeleteClassHandler(ctx *gin.Context) {
	var reqData types.DeleteReq
	errData := ctx.BindJSON(&reqData)
	if errData != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		errDB := blogClasses.DeleteClassById(reqData.Id, reqData.IsUp)
		if errDB != nil {
			ctx.JSON(200, types.CommonRps{
				Code: 402,
				Mes:  "failed",
			})
			return
		} else {
			ctx.JSON(200, types.CommonRps{
				Code: 200,
				Mes:  "success",
			})
			return
		}
	}
}
