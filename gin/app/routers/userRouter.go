package routers

import (
	"gin-new/app/handlers/userHandler"
	"gin-new/app/middleware"
	"github.com/gin-gonic/gin"
)

func init_user_routers(g *gin.RouterGroup) {
	g.POST("/user/login", userHandler.UserLoginHandler)
	g.POST("/user/new", userHandler.NewUser)
	g.POST("/user/update_pwd_id", middleware.Auth(), userHandler.UpdateUserPwdByIdHandler)
}
