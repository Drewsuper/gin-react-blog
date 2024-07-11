package cacheHandler

import (
	"gin-new/app/config"
	"gin-new/app/types"
	"gin-new/cache"
	"github.com/gin-gonic/gin"
)

type (
	getReq struct {
		Key string `json:"key"`
	}
)

func GetValueByKey(c *gin.Context) {
	var dataReq getReq
	errReq := c.BindJSON(&dataReq)
	if errReq != nil {
		c.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	}
	data, errCache := cache.GetValueKey(config.Config.BaseKey.UserKey + dataReq.Key)
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
		Data: data,
	})
	return
}

func DelValueByKey(c *gin.Context) {
	var dataReq getReq
	errReq := c.BindJSON(&dataReq)
	if errReq != nil {
		c.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	}
	errCache := cache.DeleteKey(config.Config.BaseKey.UserKey + dataReq.Key)
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
