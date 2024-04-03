package types

type (
	FileNewMd struct {
		Content string `json:"content"`
	}
	FileUpdate struct {
		FileName    string `json:"file_name"`
		FileContent string `json:"file_content"`
	}
)
