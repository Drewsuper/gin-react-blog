import axios from "axios";

const getBlogContext =  async (dataId)=>{
	var reqData = {
		err: "failed",
		data: null,
	}
	var data = {id : dataId}
	 await axios.post("/api/blog/find_by_id",JSON.stringify(data)).then( (res) =>{
		if(res.data.code === 200){
			reqData.data = res.data.data.content;
		}
	}).catch((err) => {
		reqData.err = err;
	})
	return reqData;
}


const getBlogPage = async (dataPage) =>{
	var postData = {page: dataPage};
	var data = {
		err: "failed",
		data: null,
	};
	await axios.post("/api/blog/find_page",JSON.stringify(postData)).then( (res) => {
		if (res.data.code === 200){
			data.err = null
			data.data = res.data.data;
		}else{
			data.data = null;
			data.err = "failed"
		}
	}).catch( (err) =>{
		data.err = err.message;
	})
	return data;
}


const getBlogAllPage = async ()=>{
	var data = {
		err: "failed",
		data: null
	} 
	await axios.get("/api/blog/get_size").then((res)=>{
		if(res.data.code === 200){
			if (res.data.data < 10){
				data.data = 10;
			}else{
				data.data = res.data.data;
			}
			data.err = null;
		}
	}).catch((err) =>{
		data.err = err.message;
		data.data = null;
	})
	return data
}



export {
	getBlogContext,
	getBlogPage,
	getBlogAllPage,
}