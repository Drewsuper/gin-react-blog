package main

import (
	"gin-new/app/config"
	"gin-new/app/models"
	"gin-new/app/routers"
	"gin-new/cache"
	"github.com/gin-gonic/gin"
	"log"
	"os"
	"time"
)

func main() {
	//gin.SetMode(gin.ReleaseMode)
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	log.Printf("\033[0;36m[System]: running...\033[0m")
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
	log.Printf("\u001B[0;32m[System]: config is %v\u001B[0m\n", config.Config)
	time.Sleep(100)
	//gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	routers.InitRouters(r)
	err := r.Run(config.Config.Host + ":" + config.Config.Port)
	if err != nil {
		log.Print(err)
		return
	}
}
