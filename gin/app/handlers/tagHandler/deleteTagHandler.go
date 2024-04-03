package tagHandler

import (
	"gin-new/app/models/blogTags"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

func DeleteTagHandler(ctx *gin.Context) {
	var dataReq types.DeleteReq
	errReq := ctx.BindJSON(&dataReq)
	if errReq != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		errDB := blogTags.DeleteTagById(dataReq.Id, dataReq.IsUp)
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
			})
			return
		}
	}
}
