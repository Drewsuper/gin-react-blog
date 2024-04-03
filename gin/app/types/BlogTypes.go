package types

import (
	"gin-new/app/models/blogModel"
	"time"
)

const timeLayout = "2006-01-02 15:04:05"

type (
	BlogFindReq struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	}

	BlogNewReq struct {
		BName    string `json:"b_name"`
		BDate    string `json:"b_date"`
		BContext string `json:"b_context"`
		BUpDate  string `json:"up_date"`
		BUp      int    `json:"b_up"`
		UserId   int    `json:"u_id"`
	}
	BlogUpdateRep struct {
		Options int    `json:"options"`
		Data    string `json:"data"`
	}
	BlogFindPage struct {
		Page int `json:"page"`
	}
	BlogInformation struct {
		ID        int    `json:"id"`
		ClassId   int    `json:"class_id"`
		TagId     int    `json:"tag_id"`
		BlogTitle string `json:"blog_title"`
		ClassName string `json:"class_name"`
		TagName   string `json:"tag_name"`
	}
)

func (b BlogNewReq) ToBlogModel() blogModel.BlogModel {
	if len(b.BUpDate) == 0 {
		b.BUpDate = time.Now().Format(timeLayout)
	}
	if len(b.BDate) == 0 {
		b.BDate = time.Now().Format(timeLayout)
	}
	return blogModel.BlogModel{}
}
