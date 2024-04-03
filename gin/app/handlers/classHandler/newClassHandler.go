package classHandler

import (
	"gin-new/app/models/blogClasses"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

func NewClassHandler(ctx *gin.Context) {
	var reqData types.NewClassReq
	err := ctx.BindJSON(&reqData)
	if err != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		classData := reqData.ToClassesModel()
		_, errCreate := blogClasses.AddNewClass(&classData)
		if errCreate != nil {
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
