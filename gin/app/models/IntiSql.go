package models

import (
	"gin-new/app/config"
	"log"
	"time"

	redis "github.com/redis/go-redis/v9"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB          *gorm.DB
	err         error
	RedisClient *redis.Client
)

func InitDataBase() error {
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	log.Printf("\033[0;33m[DataBase]: databases is initializing...\033[0m")
	time.Sleep(5 * time.Second)
	DB, err = gorm.Open(mysql.Open(config.Config.Mysql.DataSource), &gorm.Config{})
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     config.Config.Redis.Addr,
		Password: config.Config.Redis.PWD,
		DB:       0,
	})
	if err != nil {
		log.Printf("\033[0;31m[DataBase]: databases initialize failed %v\033[0m", err.Error())
		return err
	}
	log.Printf("\033[0;32m[DataBase]: databases initialize finished\033[0m")
	return nil
}
