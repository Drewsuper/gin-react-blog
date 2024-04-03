package fileHandler

import (
	"gin-new/app/config"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
	"path"
	"path/filepath"
	"strconv"
	"time"
)

const file_img_base_path = "static/img/"

func ImageFileUploadHandler(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	if err != nil {
		ctx.JSON(200, types.CommonRps{
			Code: 401,
			Mes:  "file upload failed",
		})
		return
	} else {
		extName := path.Ext(file.Filename)
		fileNameInt := time.Now().Unix()
		fileNameStr := strconv.FormatInt(fileNameInt, 16)
		fileName := fileNameStr + extName
		filePath := filepath.Join(file_img_base_path + fileName)
		errFile := ctx.SaveUploadedFile(file, filePath)
		if errFile != nil {
			ctx.JSON(200, types.CommonRps{
				Code: 400,
				Mes:  "file upload failed",
			})
			return
		} else {
			ctx.JSON(200, types.CommonRps{
				Code: 200,
				Mes:  "file upload success",
				Data: "http://localhost:" + config.Config.Port + "/v1/api/" + file_img_base_path + fileName,
			})
		}

	}
}
