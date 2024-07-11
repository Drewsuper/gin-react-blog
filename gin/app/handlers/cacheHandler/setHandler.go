package cacheHandler

import (
	"gin-new/app/config"
	"gin-new/app/types"
	"gin-new/cache"
	"github.com/gin-gonic/gin"
)

type (
	setReq struct {
		Key   string `json:"key"`
		Value any    `json:"value"`
	}
)

func SetKeyWithoutEx(c *gin.Context) {
	var dataReq setReq
	errReq := c.BindJSON(&dataReq)
	if errReq != nil {
		c.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	}
	errCache := cache.SetValue(config.Config.BaseKey.UserKey+dataReq.Key, dataReq.Value)
	if errCache != nil {
		c.JSON(200, types.CommonRps{
			Code: 402,
			Mes:  "failed",
		})
		return
	}
	c.JSON(200, types.CommonRps{
		Code: 200,
		Mes:  "success",
	})
	return
}
