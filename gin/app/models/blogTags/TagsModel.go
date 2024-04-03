package blogTags

import (
	"errors"
	"gin-new/app/models"
	"time"
)

type TagsModel struct {
	Id         int       `gorm:"column:id;primary_key;AUTO_INCREMENT;NOT NULL" json:"id"`
	RealName   string    `gorm:"column:real_name;default:NULL" json:"real_name"`
	ViewName   string    `gorm:"column:view_name;default:NULL" json:"view_name"`
	CreateTime time.Time `gorm:"column:create_time;default:CURRENT_TIMESTAMP" json:"create_time"`
	UpTime     time.Time `gorm:"column:up_time;default:CURRENT_TIMESTAMP" json:"up_time"`
	ClassId    int       `gorm:"column:class_id;NOT NULL" json:"class_id"`
}

func (TagsModel) TableName() string {
	return "blog_tags"
}

func AddNewTag(data *TagsModel) error {
	tx := models.DB.Begin()
	res := tx.Create(data).RowsAffected
	if res <= 0 {
		tx.Rollback()
		return errors.New("failed")
	} else {
		tx.Commit()
		return nil
	}
}

func DeleteTagById(id int, isUp int) error {
	tx := models.DB.Begin()
	res := tx.Model(&TagsModel{}).Where("id = ? ", id).Updates(map[string]interface{}{"is_up": isUp}).RowsAffected
	if res > 0 {
		tx.Commit()
		return nil
	} else {
		tx.Rollback()
		return errors.New("failed")
	}
}

func FindTagsByClassId(classId int, data *[]TagsModel) error {
	tx := models.DB.Begin()
	tx.Where("class_id = ?", classId).Find(data)
	tx.Commit()
	return nil
}

func FindTagById(id int) (TagsModel, error) {
	tx := models.DB.Begin()
	var data TagsModel
	tx.Where("id = ? ", id).Select("id,view_name,class_id").First(&data)
	tx.Commit()
	return data, nil
}

func FindTagAllInformationById(id int) (TagsModel, error) {
	var data TagsModel
	tx := models.DB.Begin()
	res := tx.Where("id = ?", id).First(&data).RowsAffected
	if res > 0 {
		tx.Commit()
		return data, nil
	} else {
		tx.Rollback()
		return TagsModel{}, errors.New("failed")
	}
}

func FindAllTags(data *[]TagsModel) error {
	tx := models.DB.Begin()
	res := tx.Model(&TagsModel{}).Select("id,view_name").Find(&data).RowsAffected
	tx.Commit()
	if res > 0 {
		return nil
	} else {
		return errors.New("failed")
	}
}

func FindAllTagsAllInformation(data *[]TagsModel) error {
	tx := models.DB.Begin()
	res := tx.Model(&TagsModel{}).Find(&data).RowsAffected
	tx.Commit()
	if res > 0 {
		return nil
	} else {
		return errors.New("failed")
	}
}

func UpdateTagById(id int, realName string, viewName string) error {
	tx := models.DB.Begin()
	res := tx.Model(&TagsModel{}).Where("id = ?", id).Updates(map[string]interface{}{"real_name": realName, "view_name": viewName, "update_time": time.Now()}).RowsAffected
	if res > 0 {
		tx.Commit()
		return nil
	} else {
		tx.Rollback()
		return errors.New("failed")
	}
}

func FindAllTagsLabels(modelData *[]TagsModel, classs_id int) (res int64, err error) {
	tx := models.DB.Begin()
	res = tx.Model(&TagsModel{}).Select("id", "real_name").Where("class_id = ?", classs_id).Find(modelData).RowsAffected
	if res < 0 {
		return res, errors.New("failed get data")
	} else {
		return res, nil
	}
}
