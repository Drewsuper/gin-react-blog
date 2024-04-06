import { toBeRequired } from "@testing-library/jest-dom/matchers";
import axios from "axios";
import { config } from "md-editor-rt";
import { useState } from "react";
import { json } from "react-router-dom";

import { setCookie, getCookie } from "./token.js";



const getLogin = async (uname, password) =>{
	var data = {
		username: uname,
		pwd:password,
	}
	var returnData = {
		data: null,
		err:"failed",
	}
	await axios.post("/api/user/login",JSON.stringify(data)).then((res) => {
		if(res.data.code  === 200){
			returnData.err = null;
			setCookie("token",res.data.data,5);
		}
	}).catch((err) =>{
		returnData.err = new Error("api system failed").message;
	})
	return returnData;
}


const getAllBlogClasses = async ()=>{
	var reqData = {
		err:"failed",
		data:null,
	};
	await axios.post("/api/blog/class/find_all_info").then((res) =>{
		if (res.data.code === 200){
			reqData.data = res.data.data;
			reqData.err = null;
		}else{
			reqData.err = "api failed";
			reqData.data = null;
		}
	}).catch((err)=>{
		reqData.err = err.message;
		reqData.data = null;
	})
	axios.interceptors.request.use(config=>{
		config.headers['Authorization'] = getCookie("token");
		return config;
	})
	return reqData;
}
 
 
 const getAllBlogTags = async ()=>{
	 var reqData = {
		 err:"failed",
		 data: null,
	 };
	 await axios.post("/api/blog/tag/find_all_info").then((res) =>{
		if (res.data.code === 200){
			reqData.data = res.data.data;
			reqData.err = null;
		}else{
			reqData.err = "api failed";
			reqData.data = null;
		}
	}).catch((err)=>{
		reqData.err = err.message;
		reqData.data = null;
	})
	axios.interceptors.request.use(config=>{
		config.headers['Authorization'] = getCookie("token");
		return config;
	})
	return reqData;
 }
 
 const getClassLabel = async ()=>{
	var reqData = {
		err: 'failed',
		data: null,
	}
	await axios.post("/api/blog/class/find_all_label").then((res)=>{
		if (res.data.code === 200){
			reqData.err = null;
			reqData.data = res.data.data;
		}else{
			reqData.err = "request happen error";
			reqData.data = null;
		}
	}).catch((err)=>{
		reqData.err = err.message;
		reqData.data = null;
	})
	
	axios.interceptors.request.use(config=>{
		config.headers['Authorization'] = getCookie("token");
		return config;
	})
	return reqData;
 }
 
 const getTagsLabel = async (class_id)=>{
 	var reqData = {
 		err: 'failed',
 		data: null,
 	}
 	await axios.post("/api/blog/tag/find_all_label",JSON.stringify({id:class_id})).then((res)=>{
 		if (res.data.code === 200){
 			reqData.err = null;
 			reqData.data = res.data.data;
 		}else{
 			reqData.err = "request happen error";
			reqData.data = null;
 		}
 	}).catch((err)=>{
 		reqData.err = err.message;
		reqData.data = null;
 	})
 	
 	axios.interceptors.request.use(config=>{
 		config.headers['Authorization'] = getCookie("token");
 		return config;
 	})
 	return reqData;
 }
 
 const getBlogContext = async (dataPage)=>{
	var reqData = {
		data: null,
		err: "no data returned",
	}
	await axios.post("/api/blog/find_page",JSON.stringify({page: dataPage})).then((res)=>{
		if (res.data.code === 200){
			reqData.err = null;
			reqData.data = res.data.data;
		}
	}).catch((err)=>{
		reqData.err = err.message;
		reqData.data = null;
	})
	axios.interceptors.request.use(config=>{
		config.headers['Authorization'] = getCookie("token");
		return config;
	})
	return reqData;
 }
 
 const checkToken = async (token)=>{
	 var reqData = {
		 data:null,
		 err: "failed",
	 }
	 await axios.post("/api/auth/check",JSON.stringify({data:token})).then((res)=>{
		 if (res.data.code == 200){
			 reqData.data = res.data.data;
			 reqData.err = null;
		 }
	 }).catch((err) =>{
		 reqData.err = err.message;
		 reqData.data = null;
	 })
	 return reqData;
 }
 
 
 const getBlogAllInfor = async (data) => {
	var reqData = {
		data: null,
		err: "failed",
	}
	await axios.post("/api/blog/find_by_id_all",JSON.stringify({id:data})).then((res) =>{
		if (res.data.code == 200){
			reqData.data = res.data.data;
			reqData.err = null;
		}
	}).catch((err)=>{
		reqData.err = err.message;
		reqData.data = null;
	})
	axios.interceptors.request.use(config=>{
		config.headers['Authorization'] = getCookie("token");
		return config;
	})
	return reqData;
 }

export {
	getLogin,
	getAllBlogClasses,
	getAllBlogTags,
	getTagsLabel,
	getClassLabel,
	getBlogContext,
	checkToken,
	getBlogAllInfor,
}