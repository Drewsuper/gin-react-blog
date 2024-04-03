package classHandler

import (
	"gin-new/app/models/blogClasses"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

type classLabel struct {
	Value int    `json:"value"`
	Label string `json:"label"`
}

func FindClassById(ctx *gin.Context) {
	var dataReq types.FindClassByIdReq
	errReq := ctx.BindJSON(&dataReq)
	if errReq != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		data, errDB := blogClasses.FindClassById(dataReq.Id)
		if errDB != nil {
			ctx.JSON(200, types.CommonRps{
				Code: 402,
				Mes:  "failed",
			})
			return
		} else {
			ctx.JSON(200, types.CommonRps{
				Code: 200,
				Mes:  "success",
				Data: data,
			})
			return
		}
	}
}

func FindClassAllInformationById(ctx *gin.Context) {
	var dataReq types.FindClassByIdReq
	errReq := ctx.BindJSON(&dataReq)
	if errReq != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		data, errDB := blogClasses.FindClassAllInformationById(dataReq.Id)
		if errDB != nil {
			ctx.JSON(200, types.CommonRps{
				Code: 402,
				Mes:  "failed",
			})
			return
		} else {
			ctx.JSON(200, types.CommonRps{
				Code: 200,
				Mes:  "success",
				Data: data,
			})
			return
		}
	}
}

func FindAllClassInformation(ctx *gin.Context) {
	var dataDB []blogClasses.ClassModel
	err := blogClasses.FindAllClassInformation(&dataDB)
	if err != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 402,
			Mes:  "failed",
		})
		return
	} else {
		ctx.JSON(200, types.CommonRps{
			Code: 200,
			Mes:  "success",
			Data: dataDB,
		})
		return
	}
}

func FindAllClass(ctx *gin.Context) {
	var dataDB []blogClasses.ClassModel
	err := blogClasses.FindAllClasses(&dataDB)
	if err != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 402,
			Mes:  "failed",
		})
		return
	} else {
		ctx.JSON(200, types.CommonRps{
			Code: 200,
			Mes:  "success",
			Data: dataDB,
		})
		return
	}
}

func FindAllClassLabel(ctx *gin.Context) {
	var dataDB []blogClasses.ClassModel
	_, errDB := blogClasses.FindAllClassLabels(&dataDB)
	if errDB == nil {
		var reqData []classLabel
		for _, data := range dataDB {
			reqData = append(reqData, classLabel{Label: data.RealName, Value: data.Id})
		}
		ctx.JSON(200, types.CommonRps{
			Code: 200,
			Mes:  "success",
			Data: reqData,
		})
		return
	} else {
		ctx.JSON(200, types.CommonRps{
			Code: 402,
			Mes:  "failed",
		})
		return
	}
}
