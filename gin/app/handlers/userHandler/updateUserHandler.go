package userHandler

import (
	"gin-new/app/models/userModel"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

func UpdateUserPwdByIdHandler(ctx *gin.Context) {
	var data types.UserUpdatePwdByIdReq
	err_data := ctx.BindJSON(&data)
	if err_data == nil {
		err_update := userModel.UpdatePassWordByID(data.Id, data.Pwd)
		if err_update == nil {
			ctx.JSON(200, types.CommonRps{
				Code: 200,
				Mes:  "success",
				Data: nil,
			})
			return
		} else {
			ctx.JSON(200, types.CommonRps{
				Code: 402,
				Mes:  "failed",
			})
			return
		}
	} else {
		ctx.JSON(200, types.CommonRps{
			Code: 400,
			Mes:  "failed",
		})
		return
	}
}

func UpdateUserPwdByUNameHandler(ctx *gin.Context) {
	var data types.UserUpdatePwdByUNameReq
	err_data := ctx.BindJSON(&data)
	if err_data == nil {
		err_update := userModel.UpdatePassWordByUName(data.UName, data.Pwd)
		if err_update == nil {
			ctx.JSON(200, types.CommonRps{
				Code: 200,
				Mes:  "success",
				Data: nil,
			})
			return
		} else {
			ctx.JSON(200, types.CommonRps{
				Code: 402,
				Mes:  "failed",
			})
			return
		}
	} else {
		ctx.JSON(200, types.CommonRps{
			Code: 400,
			Mes:  "failed",
		})
		return
	}
}
