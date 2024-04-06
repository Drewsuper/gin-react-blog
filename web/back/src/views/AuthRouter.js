import { Navigate }from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/token.js";
import { checkToken } from "../utils/api.js";
import { message } from "antd";
import { genComponentStyleHook } from "antd/es/theme/internal.js";
import { useRef } from "react";
import { current } from "@reduxjs/toolkit";

const getToken = () =>{
	var token1 = getCookie("token")
	return token1 || "";
}
var token = ""
function AuthRouter( {children} ){
	useEffect(()=>{
		token = getToken();
		
		if (token.length <= 0){
			message.error("请先登录！！！")
		}
		// checkToken(token).then((res)=>{
		// 	if (res.err === null){
		// 		setFlag(1);
		// 	}
		// })
	},[])
	if (getToken().length > 0){
		return (<>{children}</>);
	}else{
		return <Navigate to={"/login"}></Navigate>
	}
}

export default AuthRouter;