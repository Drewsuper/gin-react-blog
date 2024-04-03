package fileHandler

import (
	"bufio"
	"gin-new/app/types"
	"github.com/gin-gonic/gin"
	"log"
	"os"
	"strconv"
	"time"
)

const file_root_path = "static/md/"

func MdFileUpLoadHandler(ctx *gin.Context) {
	var fileData types.FileNewMd
	errFile := ctx.BindJSON(&fileData)
	log.Printf("\n%v\n", errFile)
	if errFile == nil {
		fileInt := time.Now().Unix()
		fileName := strconv.FormatInt(fileInt, 16) + ".md"
		fp, errFile := os.Create(file_root_path + fileName)
		defer fp.Close()
		if errFile == nil {
			bw := bufio.NewWriter(fp)
			_, errWrite := bw.WriteString(fileData.Content)
			if errWrite == nil {
				ctx.JSON(200, types.CommonRps{
					Code: 200,
					Mes:  "success",
					Data: file_root_path + fileName,
				})
				bw.Flush()
				return
			}
		}
	}
	ctx.JSON(200, types.CommonRps{
		Code: 400,
		Mes:  "failed ",
	})
	return
}
