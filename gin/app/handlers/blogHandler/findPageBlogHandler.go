package blogHandler

import (
	"gin-new/app/models/blogClasses"
	"gin-new/app/models/blogModel"
	"gin-new/app/models/blogTags"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
)

func FindPageBlogHandler(ctx *gin.Context) {
	var dataRep types.BlogFindPage
	err := ctx.BindJSON(&dataRep)
	if err != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "failed",
		})
		return
	} else {
		var blogData []blogModel.BlogModel
		var responseData []types.BlogInformation
		errData := blogModel.FindPageBlog(&blogData, dataRep.Page)
		for _, blog := range blogData {
			class, _ := blogClasses.FindClassById(blog.ClassId)
			tag, _ := blogTags.FindTagById(blog.TagsId)
			responseData = append(responseData, types.BlogInformation{ID: blog.Id, BlogTitle: blog.Title, ClassId: class.Id, ClassName: class.ViewName, TagName: tag.ViewName, TagId: tag.Id})
		}
		if errData != nil {
			ctx.JSON(200, types.CommonRps{
				Code: 402,
				Mes:  "failed",
			})
			return
		} else {
			ctx.JSON(200, types.CommonRps{
				Code: 200,
				Mes:  "success",
				Data: responseData,
			})
			return
		}
	}
}
