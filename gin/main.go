package main

import (
	"gin-new/app/config"
	"gin-new/app/models"
	"gin-new/app/routers"
	"gin-new/app/types"
	"gin-new/cache"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	//gin.SetMode(gin.ReleaseMode)
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	log.Printf("\033[0;36m[System]: starting...\033[0m")
	errC := config.InitConfig()
	if errC != nil {
		os.Exit(-2)
	}
	cache.InitCache(config.Config)
	errB := models.InitDataBase()
	if errB != nil {
		os.Exit(-1)
	}
	log.Println("\u001B[0;33m[System]: routers  is initializing ...\033[0m")
	gin.SetMode(config.Config.Mode)
	r := gin.Default()
	r.LoadHTMLGlob("./web/*")
	r.GET("/", func(ctx *gin.Context) {
		ctx.HTML(200, "index.html", map[string]interface{}{
			"data": types.CommonRps{
				Code: 200,
				Mes:  "successsfully",
			},
		})
		return
	})
	routers.InitRouters(r)
	log.Printf("\033[0;32m[System]: starting successfully \033[0m")
	err := r.Run(config.Config.Host + ":" + config.Config.Port)
	if err != nil {
		log.Print(err)
		return
	}
}
