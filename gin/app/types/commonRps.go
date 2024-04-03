package types

type (
	CommonRps struct {
		Code int         `json:"code"`
		Mes  string      `json:"mes"`
		Data interface{} `json:"data"`
	}
	DeleteReq struct {
		Id   int `json:"id"`
		IsUp int `json:"is_up"`
	}
)
