package blogClasses

import (
	"gin-new/app/models"
	"github.com/pkg/errors"
	"time"
)

type ClassModel struct {
	Id         int       `json:"id" gorm:"column:id;primary_key;AUTO_INCREMENT;NOT NULL" json:"id"`
	RealName   string    `json:"real_name" gorm:"column:real_name;default:NULL" json:"real_name"`
	ViewName   string    `json:"view_name" gorm:"column:view_name;default:NULL" json:"view_name"`
	CreateTime time.Time `json:"create_time" gorm:"column:create_time;default:CURRENT_TIMESTAMP" json:"create_time"`
	UpdateTime time.Time `json:"update_time" gorm:"column:update_time;default:CURRENT_TIMESTAMP" json:"update_time"`
	IsUp       int       `json:"is_up" gorm:"column:is_up;default:1"`
	IsDel      int       `json:"is_del" gorm:"column:is_del;default:1"`
}

func (ClassModel) TableName() string {
	return "blog_classes"
}

func FindAllClassInformation(data *[]ClassModel) error {
	tx := models.DB.Begin()
	rows := tx.Model(&ClassModel{}).Find(data).RowsAffected
	tx.Commit()
	if rows < 0 {
		return errors.New("failed")
	} else {
		return nil
	}
}

func FindAllClasses(data *[]ClassModel) error {
	tx := models.DB.Begin()
	err := tx.Select("id", "view_name").Find(data).Error
	tx.Commit()
	return err
}

func FindClassAllInformationById(id int) (ClassModel, error) {
	tx := models.DB.Begin()
	var data ClassModel
	err := tx.Where("id = ?", id).First(&data).Error
	tx.Commit()
	if err != nil {
		return ClassModel{}, err
	} else {
		return data, nil
	}
}

func FindClassById(id int) (ClassModel, error) {
	tx := models.DB.Begin()
	var data ClassModel
	err := tx.Where("id = ?", id).Select("id", "view_name").First(&data).Error
	tx.Commit()
	if err != nil {
		return ClassModel{}, err
	} else {
		return data, nil
	}
}

func DeleteClassById(id int, is_up int) error {
	tx := models.DB.Begin()
	res := tx.Model(&ClassModel{}).Where("id = ?", id).Updates(map[string]interface{}{"is_up": is_up}).RowsAffected
	if res < 0 {
		tx.Rollback()
		return errors.New("failed")
	} else {
		tx.Commit()
		return nil
	}
}

func UpdateClassBy(id int, realName string, viewName string) error {
	tx := models.DB.Begin()
	res := tx.Model(&ClassModel{}).Where("id = ?", id).Updates(map[string]interface{}{"real_name": realName, "view_name": viewName}).RowsAffected
	if res < 0 {
		tx.Rollback()
		return errors.New("failed")
	} else {
		tx.Commit()
		return nil
	}
}

func AddNewClass(classModel *ClassModel) (int64, error) {
	tx := models.DB.Begin()
	result := tx.Create(classModel).RowsAffected
	if result < 0 {
		tx.Rollback()
		return -1, errors.New("failed")
	} else {
		tx.Commit()
		return result, nil
	}
}

func FindAllClassLabels(modelData *[]ClassModel) (res int64, err error) {
	tx := models.DB.Begin()
	res = tx.Model(&ClassModel{}).Select("id", "real_name").Find(modelData).RowsAffected
	tx.Commit()
	if res < 0 {
		return res, errors.New("failed get data")
	} else {
		return res, nil
	}
}
