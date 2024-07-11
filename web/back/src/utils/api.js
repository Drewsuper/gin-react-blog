import { toBeRequired } from "@testing-library/jest-dom/matchers";
import axios from "axios";
import { config } from "md-editor-rt";
import { useState } from "react";
import { json } from "react-router-dom";

import { setCookie, getCookie } from "./token.js";

const checkAuth = async ()=>{
	const {data:res } = await axios.post("/api/check",JSON.stringify({auth:getCookie("token")}))
	if (res.code === 200){
		return 200;
	}
	else{
		return 400;
	}
}

const getLogin = async (uname, password) =>{
	var data = {
		username: uname,
		pwd:password,
	}
	var returnData = {
		data: null,
		err:"failed",
		code:200,
	}
	await axios.post("/api/user/login",JSON.stringify(data)).then((res) => {
		returnData.code = res.data.code;
		if(res.data.code  === 200){
			returnData.err = null;
			setCookie("token",res.data.data,5);
		}
	}).catch((err) =>{
		returnData.code = 400;
		returnData.err = new Error("api system failed").message;
	})
	return returnData;
}


const getAllBlogClasses = async ()=>{
	var reqData = {
		err:"failed",
		data:null,
		code:200,
	};
	await axios.post("/api/blog/class/find_all_info").then((res) =>{
		reqData.code = res.data.code;
		if (res.data.code === 200){
			reqData.data = res.data.data;
			reqData.err = null;
		}else{
			reqData.err = "api failed";
			reqData.data = null;
		}
	}).catch((err)=>{
		reqData.code = 400;
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
		code:200,
	 };
	 await axios.post("/api/blog/tag/find_all_info").then((res) =>{
		reqData.code = res.data.code;
		if (res.data.code === 200){
			reqData.data = res.data.data;
			reqData.err = null;
		}else{
			reqData.err = "api failed";
			reqData.data = null;
		}
	}).catch((err)=>{
		reqData.code = 400;
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
		code:200,
	}
	await axios.post("/api/blog/class/find_all_label").then((res)=>{
		reqData.code = res.data.code;
		if (res.data.code === 200){
			reqData.err = null;
			reqData.data = res.data.data;
		}else{
			reqData.err = "request happen error";
			reqData.data = null;
		}
	}).catch((err)=>{
		reqData.code = 400;
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
		code:200,
 	}
 	await axios.post("/api/blog/tag/find_all_label",JSON.stringify({id:class_id})).then((res)=>{
		reqData.code = res.data.code;
 		if (res.data.code === 200){
 			reqData.err = null;
 			reqData.data = res.data.data;
 		}else{
 			reqData.err = "request happen error";
			reqData.data = null;
 		}
 	}).catch((err)=>{
		reqData.code = 400;
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
		code:200,
	}
	await axios.post("/api/blog/find_page",JSON.stringify({page: dataPage})).then((res)=>{
		reqData.code =res.data.code;
		if (res.data.code === 200){
			reqData.err = null;
			reqData.data = res.data.data;
		}
	}).catch((err)=>{
		reqData.code = 400;
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
		 code:200,
	 }
	 await axios.post("/api/auth/check",JSON.stringify({data:token})).then((res)=>{
		 reqData.code = res.data.code;
		 if (res.data.code == 200){
			 reqData.data = res.data.data;
			 reqData.err = null;
		 }
	 }).catch((err) =>{
		 reqData.code = 400;
		 reqData.err = err.message;
		 reqData.data = null;
	 })
	 return reqData;
 }
 
 
 const getBlogAllInfor = async (data) => {
	var reqData = {
		data: null,
		err: "failed",
		code:200,
	}
	await axios.post("/api/blog/find_by_id_all",JSON.stringify({id:data})).then((res) =>{
		reqData.code = res.data.code;
		if (res.data.code == 200){
			reqData.data = res.data.data;
			reqData.err = null;
		}
	}).catch((err)=>{
		reqData.code = 400;
		reqData.err = err.message;
		reqData.data = null;
	})
	axios.interceptors.request.use(config=>{
		config.headers['Authorization'] = getCookie("token");
		return config;
	})
	return reqData;
 }
 
 const getTagetDataById = async (data) =>{
 	var reqData = {
 		data:null,
 		err:"failed",
		code:200,
 	}
 	await axios.post("/api/blog/tag/find_id_info",JSON.stringify({id:data})).then((res)=>{
		reqData.code = res.data.code;
 		if (res.data.code === 200){
 			reqData.data = res.data.data;
 			reqData.err = null;
 		}else{
 			reqData.data = null;
 			reqData.err = "failed";
 		}
 	}).catch((err)=>{
		reqData.code = 400;
 		reqData.data = null;
 		reqData.err = "failed";
 	})
 	return reqData;
 }

 const getClassDataById = async (data) =>{
	var reqData = {
		data:null,
		err:"failed",
		code:200,
	}
	await axios.post("/api/blog/class/find_id_info",JSON.stringify({id:data})).then((res)=>{
		reqData.code = res.data.code;
		if (res.data.code === 200){
			reqData.data = res.data.data;
			reqData.err = null;
		}else{
			reqData.data = null;
			reqData.err = "failed";
		}
	}).catch((err)=>{
		reqData.code = 400;
		reqData.data = null;
		reqData.err = "failed";
	})
	return reqData;
 }
 
 const updateClassData = async (data)=>{
	var reqData = {
		data:null,
		err: 'failed',
		code:200,
	}
	await axios.post("/api/blog/class/update",JSON.stringify(data)).then((res)=>{
		reqData.code = res.data.code;
		if(res.data.code === 200){
			reqData.data = res.data.data;
			reqData.err = null;
		}else{
			reqData.data = null;
			reqData.err = "failed";
		}
	}).catch((err)=>{
		reqData.code = 400;
		reqData.data = null;
		reqData.err = "failed";
	})
	return reqData;
 }
 
 const newClassData = async (data)=>{
	var reqData = {
		data:null,
		err: "failed",
		code:200,
	}
	await axios.post("/api/blog/class/new",JSON.stringify(data)).then((res)=>{
		reqData.code = res.data.code;
		if  (res.data.code === 200){
			reqData.data = res.data.data;
			reqData.err = null;
		}else{
			
		}
	}).catch((err)=>{
		reqData.code = 400;
		reqData.data = null;
		reqData.err = "failed";
	})
	return reqData;
 }
 
 const newTagsData = async (data)=>{
 	var reqData = {
 		data:null,
 		err: "failed",
 		code:200,
 	}
 	await axios.post("/api/blog/tag/new",JSON.stringify(data)).then((res)=>{
 		reqData.code = res.data.code;
 		if  (res.data.code === 200){
 			reqData.data = res.data.data;
 			reqData.err = null;
 		}else{
 			
 		}
 	}).catch((err)=>{
 		reqData.code = 400;
 		reqData.data = null;
 		reqData.err = "failed";
 	})
 	return reqData;
 }
 
 const deleteClass = async (id,up)=>{
	var reqData = {
		err: 'failed',
		data: null,
		code:200,
	}
	await axios.post("/api/blog/class/delete",JSON.stringify({id:id,is_up:up})).then((res)=>{
		reqData.code = res.data.code;
		if (res.data.code === 200){
			reqData.err = null;
		}else{
			reqData.err = "failed";
		}
	}).catch((err)=>{
		reqData.code = 400;
		reqData.err = "failed";
	})
	return reqData;
 }
 
 const deleteTags = async (id,up)=>{
 	var reqData = {
 		err: 'failed',
 		data: null,
 		code:200,
 	}
 	await axios.post("/api/blog/tag/delete",JSON.stringify({id:id,is_up:up})).then((res)=>{
 		reqData.code = res.data.code;
 		if (res.data.code === 200){
 			reqData.err = null;
 		}else{
 			reqData.err = "failed";
 		}
 	}).catch((err)=>{
 		reqData.code = 400;
 		reqData.err = "failed";
 	})
 	return reqData;
 }

const upMDFile = async (data)=>{
	var code = 200;
	await axios.post("/api/md",JSON.stringify({conten:data})).then((res)=>{
		if (res.data.code === 200){
			return 200;
		}else{
			return 400;
		}
	}).catch((err)=>{
		return 400;
	})
}

export {
	checkAuth,
	getLogin,
	getAllBlogClasses,
	getAllBlogTags,
	getTagsLabel,
	getClassLabel,
	getBlogContext,
	checkToken,
	getBlogAllInfor,
	getClassDataById,
	updateClassData,
	newClassData,
	newTagsData,
	deleteClass,
	deleteTags,
	getTagetDataById,
	upMDFile,
	
}