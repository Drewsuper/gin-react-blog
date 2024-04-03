package tagHandler

import (
	"gin-new/app/models/blogTags"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

type tagsLabel struct {
	Value int    `json:"value"`
	Label string `json:"label"`
}

func FindTagById(ctx *gin.Context) {
	var dataReq types.FindTagByIdReq
	errReq := ctx.BindJSON(&dataReq)
	if errReq != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		dataDB, errDB := blogTags.FindTagById(dataReq.Id)
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
				Data: dataDB,
			})
			return
		}
	}
}

func FindTagsByClassId(ctx *gin.Context) {
	var dataReq types.FindClassByIdReq
	errReq := ctx.BindJSON(&dataReq)
	if errReq != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		var dataDB []blogTags.TagsModel
		errDB := blogTags.FindTagsByClassId(dataReq.Id, &dataDB)
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
				Data: dataDB,
			})
			return
		}

	}
}

func FindTagAllInformationById(ctx *gin.Context) {
	var dataReq types.FindTagByIdReq
	errReq := ctx.BindJSON(&dataReq)
	if errReq != nil || dataReq.Id == 0 {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		dataDB, errDB := blogTags.FindTagAllInformationById(dataReq.Id)
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
				Data: dataDB,
			})
			return
		}
	}
}

func FindAllTagsAllInformation(ctx *gin.Context) {
	var dataDB []blogTags.TagsModel
	errDB := blogTags.FindAllTagsAllInformation(&dataDB)
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
			Data: dataDB,
		})
		return
	}
}

func FindAllTag(ctx *gin.Context) {
	var dataDB []blogTags.TagsModel
	errDB := blogTags.FindAllTags(&dataDB)
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
			Data: dataDB,
		})
		return
	}
}

func FindAllTagsLabel(ctx *gin.Context) {
	var dataReq types.FindTagLabelByClassId
	errReq := ctx.BindJSON(&dataReq)
	if errReq != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 402,
			Mes:  "failed",
		})
		return
	}
	var dataDB []blogTags.TagsModel
	_, errDB := blogTags.FindAllTagsLabels(&dataDB, dataReq.Id)
	if errDB == nil {
		var reqData []tagsLabel
		for _, data := range dataDB {
			reqData = append(reqData, tagsLabel{Label: data.RealName, Value: data.Id})
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
