package blogReply

import (
	"errors"
	"gin-new/app/models"
)

type ReplyModel struct {
	Id      int32  `gorm:"column:id;primary_key;AUTO_INCREMENT;NOT NULL" json:"id"`
	BlogId  int32  `gorm:"column:blog_id;NOT NULL" json:"blog_id"`
	Content string `gorm:"column:content;NOT NULL" json:"content"`
	ReplyId int32  `gorm:"column:reply_id;default:NULL" json:"reply_id"`
}

func (ReplyModel) TableName() string {
	return "blog_reply"
}

func FindReplyByBlogId(id int, data *[]ReplyModel) error {
	tx := models.DB.Begin()
	_, err := tx.Where("blog_id = ?", id).Find(data).Rows()
	tx.Commit()
	return err
}

func AddNewReply(data *ReplyModel) (int64, error) {
	tx := models.DB.Begin()
	result := tx.Create(data).RowsAffected
	if result <= 0 {
		tx.Rollback()
		return result, errors.New("failed")
	} else {
		tx.Commit()
		return result, nil
	}
}
