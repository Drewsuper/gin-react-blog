package blogModel

import (
	"errors"
	"gin-new/app/models"
	"log"
	"time"
)

const pageSize = 10

type BlogModel struct {
	Id         int       `gorm:"column:id;primary_key;AUTO_INCREMENT;AUTO_INCREMENT;NOT NULL" json:"id"`
	Title      string    `gorm:"column:title;NOT NULL" json:"title"`
	Content    string    `gorm:"column:content;default:NULL" json:"content"`
	CreateTime time.Time `gorm:"column:create_time;default:CURRENT_TIMESTAMP" json:"create_time"`
	UpdateTime time.Time `gorm:"column:update_time;default:CURRENT_TIMESTAMP" json:"update_time"`
	ClassId    int       `gorm:"column:class_id;NOT NULL" json:"class_id"`
	TagsId     int       `gorm:"column:tags_id;NOT NULL" json:"tags_id"`
}

func (BlogModel) TableName() string {
	return "blog_contents"
}

func AllFindBlog(data *[]BlogModel) error {
	tx := models.DB.Begin()
	rows, err := tx.Find(data).Rows()
	_ = rows.Close()
	tx.Commit()
	return err
}

func FindPageBlog(data *[]BlogModel, page int) error {
	tx := models.DB.Begin()
	offset := pageSize * (page - 1)
	row, err := tx.Offset(offset).Limit(pageSize).Select("id,title,class_id,tags_id").Find(data).Rows()
	_ = row.Close()
	tx.Commit()
	return err
}

func FindOneById(id int) (BlogModel, error) {
	var blog BlogModel
	tx := models.DB.Begin()
	row, err := tx.Where("id = ?", id).First(&blog).Rows()
	_ = row.Close()
	tx.Commit()
	if err == nil {
		return blog, nil
	}
	log.Printf("\033[0;31m%v\033[0m", err)
	return BlogModel{}, err
}

func NewBlogContext(blog *BlogModel) (int64, error) {
	tx := models.DB.Begin()
	row := tx.Create(&blog).RowsAffected
	if row > 0 {
		tx.Commit()
		return row, nil
	} else {
		tx.Rollback()
		return -1, errors.New("插入失败")
	}
}
