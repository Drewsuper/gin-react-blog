package types

type (
	UserLoginReq struct {
		Uname string `json:"username"`
		PWD   string `json:"pwd"`
	}
	UserNewReq struct {
		Uname string `json:"uname"`
		Pwd   string `json:"pwd"`
	}
	UserUpdatePwdByIdReq struct {
		Id  int    `json:"id"`
		Pwd string `json:"pwd"`
	}
	UserUpdatePwdByUNameReq struct {
		UName string `json:"uname"`
		Pwd   string `json:"pwd"`
	}
)
