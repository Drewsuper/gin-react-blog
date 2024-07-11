package tagHandler

import (
	"gin-new/app/models/blogTags"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

func NewTagHandler(ctx *gin.Context) {
	var dataReq types.NewTagReq
	errReq := ctx.BindJSON(&dataReq)
	if errReq != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		tagsData := dataReq.ToTagModel()
		errDB := blogTags.AddNewTag(&tagsData)
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
				Data: nil,
			})
			return
		}
	}
}
