package types

import (
	"gin-new/app/models/blogModel"
	"time"
)

const timeLayout = "2006-01-02 15:04:05"

type (
	BlogFindReq struct {
		ID int `json:"id"`
	}

	BlogNewReq struct {
		BName    string    `json:"b_name"`
		BDate    time.Time `json:"b_date"`
		BContext string    `json:"b_context"`
		BUpDate  time.Time `json:"up_date"`
		BUp      int       `json:"b_up"`
		ClassID  int       `json:"class_id"`
		TagId    int       `json:"tag_id"`
		Des      string    `json:"des"`
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
		Des       string `json:"des"`
	}
)

func (b BlogNewReq) ToBlogModel() blogModel.BlogModel {
	if len(b.BUpDate.Format(timeLayout)) == 0 {
		b.BUpDate = time.Now()
	}
	if len(b.BDate.Format(timeLayout)) == 0 {
		b.BDate = time.Now()
	}
	return blogModel.BlogModel{
		Title:      b.BName,
		ClassId:    b.ClassID,
		TagsId:     b.TagId,
		Des:        b.Des,
		Content:    b.BContext,
		CreateTime: b.BDate,
		UpdateTime: b.BUpDate,
	}
}
