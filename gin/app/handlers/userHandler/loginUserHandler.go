package userHandler

import (
	"gin-new/app/models/userModel"
	"gin-new/app/types"
	"gin-new/app/utils"
	"github.com/gin-gonic/gin"
	"log"
)

func UserLoginHandler(ctx *gin.Context) {
	data := types.UserLoginReq{}
	err := ctx.BindJSON(&data)
	log.Printf("%v", data)
	if err != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "not get params",
		})
		return
	}
	user, err := userModel.FindOneByName(data.Uname)
	if err == nil {
		if user.UserPWD == data.PWD {
			token_string, errToken := utils.NewToken(user.Id)
			if errToken == nil {
				ctx.JSON(200, types.CommonRps{
					Code: 200,
					Mes:  "login success",
					Data: token_string,
				})
				return
			}
			ctx.JSON(200, types.CommonRps{
				Code: 402,
				Mes:  "login failed",
			})
			return
		}
	}
	ctx.JSON(200, types.CommonRps{
		Code: 400,
		Mes:  "login failed",
	})
	return
}
