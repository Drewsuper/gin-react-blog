package cache

import (
	"gin-new/app/config"
	"github.com/redis/go-redis/v9"
)

var Redis *redis.Client

func InitCache(c *config.ConfigData) {
	Redis = redis.NewClient(&redis.Options{
		Addr:     c.Redis.Addr,
		Password: c.Redis.PWD,
		DB:       c.Redis.DB,
	})
}
