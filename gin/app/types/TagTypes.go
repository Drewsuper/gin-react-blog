package types

import "gin-new/app/models/blogTags"

type (
	NewTagReq struct {
		RealName string `json:"real_name"`
		ViewName string `json:"view_name"`
		ClassId  int    `json:"class_id"`
	}
	UpdateTagReq struct {
		Id       int    `json:"id"`
		ViewName string `json:"view_name"`
		RealName string `json:"real_name"`
	}
	FindTagByIdReq struct {
		Id int `json:"id"`
	}
	FindTagLabelByClassId struct {
		Id int `json:"id"`
	}
)

func (data NewTagReq) ToTagModel() blogTags.TagsModel {
	return blogTags.TagsModel{
		RealName: data.RealName,
		ViewName: data.ViewName,
		ClassId:  data.ClassId,
	}
}
