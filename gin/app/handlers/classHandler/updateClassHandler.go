package classHandler

import (
	"gin-new/app/models/blogClasses"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

func UpdateClassHandler(ctx *gin.Context) {
	var reqData types.UpdateClassReq
	errReq := ctx.BindJSON(&reqData)
	if errReq != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		errDB := blogClasses.UpdateClassBy(reqData.Id, reqData.RealName, reqData.ViewName)
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
