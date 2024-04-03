package blogLinks

import (
	"errors"
	"gin-new/app/models"
)

type LinkModel struct {
	Id       int32  `gorm:"column:id;primary_key;AUTO_INCREMENT;NOT NULL" json:"id"`
	LinkName string `gorm:"column:link_name;default:NULL" json:"link_name"`
	LinkUrl  string `gorm:"column:link_url;default:NULL" json:"link_url"`
}

func (LinkModel) TableName() string {
	return ""
}
func AddNewLink(data *LinkModel) (int64, error) {
	tx := models.DB.Begin()
	result := tx.Create(data).RowsAffected
	if result <= 0 {
		tx.Rollback()
		return -1, errors.New("failed")
	} else {
		tx.Commit()
		return result, nil
	}
}
