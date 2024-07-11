package handlers

import (
	"gin-new/app/utils"
	"github.com/gin-gonic/gin"
)

type auth struct {
	Auth string `json:"auth"`
}

func CheckAuth(ctx *gin.Context) {
	var data auth
	err := ctx.BindJSON(&data)
	if err != nil {
		ctx.JSON(200, gin.H{
			"data": nil,
			"code": 400,
		})
		return
	} else {
		_, errJWT := utils.ParseToken(data.Auth)
		if errJWT != nil {
			ctx.JSON(200, gin.H{
				"data": nil,
				"code": 400,
			})
			return
		} else {
			ctx.JSON(200, gin.H{
				"data": nil,
				"code": 200,
			})
			return
		}
	}
}
