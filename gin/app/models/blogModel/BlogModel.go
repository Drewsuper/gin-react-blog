package blogModel

import (
	"errors"
	"gin-new/app/models"
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
	Des        string    `gorm:"column:des" json:"des"`
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
	res := tx.Offset(offset).Limit(pageSize).Select("id,title,class_id,tags_id,des").Find(data).RowsAffected
	if res < 0 {
		tx.Rollback()
		return errors.New("failed")
	} else {
		tx.Commit()
		return nil
	}
}

func FindOneById(id int) (BlogModel, error) {
	var blog BlogModel
	tx := models.DB.Begin()
	row := tx.Where("id = ?", id).First(&blog).RowsAffected
	tx.Commit()
	if row >= 0 {
		return blog, nil
	}
	return BlogModel{}, errors.New("failed")
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

func FindAllBlogSize() (num int64, err error) {
	tx := models.DB.Begin()
	res := tx.Model(&BlogModel{}).Count(&num).RowsAffected
	if res < 0 {
		tx.Rollback()
		err = errors.New("failed")
		return
	} else {
		tx.Commit()
		err = nil
		return
	}
}
