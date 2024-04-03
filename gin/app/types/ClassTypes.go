package types

import "gin-new/app/models/blogClasses"

type (
	NewClassReq struct {
		RealName string `json:"real_name"`
		ViewName string `json:"view_name"`
	}
	UpdateClassReq struct {
		Id       int    `json:"id"`
		RealName string `json:"real_name"`
		ViewName string `json:"view_name"`
	}
	FindClassByIdReq struct {
		Id int `json:"id"`
	}
)

func (data NewClassReq) ToClassesModel() blogClasses.ClassModel {
	return blogClasses.ClassModel{
		RealName: data.RealName,
		ViewName: data.ViewName,
	}
}
