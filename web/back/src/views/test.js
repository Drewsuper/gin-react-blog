import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select } from "antd";
import "github-markdown-css";
import {MdEditor} from "md-editor-rt";
import 'md-editor-rt/lib/style.css'
import axios from "axios";
import { getClassLabel, getTagsLabel,getBlogAllInfor } from "../utils/api.js";


const Test = function({data}){
	
	const [defToolbar] = useState([
		  'bold',
		  'underline',
		  'italic',
		  '-',
		  'strikeThrough',
		  'sub',
		  'sup',
		  'quote',
		  'unorderedList',
		  'orderedList',
		  'task',
		  '-',
		  'codeRow',
		  'code',
		  'link',
		  'image',
		  'table',
		  'mermaid',
		  'katex',
		  '-',
		  'revoke',
		  'next',
		  '=',
		  'pageFullscreen',
		  'fullscreen',
		  'preview',
		  'htmlPreview',
		  'catalog',
	]);
	
	const [form_data]= Form.useForm();
	const [text, setText] = useState("");
	const [flag,setFlag] = useState(false);
	const customConfig  = {
		headers:{
			'Content-Type':'application/json'
		}
	}
	const [classData, setClassData] = useState([]);
	const [tagsData, setTagsData] = useState([]);
	const [tagSelect, setTagSelect] = useState({disable:true,place:"请先选择类别"});
	 
	const formLayout = {
	  wrapperCol: {
	    span: 10,
	  },
	};
	
	const formTailLayout = {
	  wrapperCol: {
	    offset: 7,
		span: 10,
	  },
	};
	
	useEffect(()=>{
		if(data){
			getBlogAllInfor(data).then((res)=>{
				if(res.err === null){
					console.log(res.data)
				}
			})
		}else{
			
		}
		getClassLabel().then((res)=>{
			if (res.err === null){
				setClassData(res.data);
			}
		});
	},[data])
	
	const upLoadImage = async (files,callback) => {
		const res = await Promise.all(
			files.map((file) => {
				return new Promise((rev,rej) => {
					const form = new FormData();
					form.append('file',file);
					axios.post("/api/file",form)
					.then((res) => rev(res)).catch((error) => rej(error));
				});
			})
		);
		callback(res.map((item) => item.data.data))
	};
	const upMdFile = async function (v){
		if (v.length !== 0 && flag){
			var data = JSON.stringify({content: v});
			const res = await axios.post("/api/md",data,customConfig);
			setFlag(false);
		}
		setFlag(false);
	}
	
	const onSelectData = (values)=>{
		setTagSelect({disable:false,place:"请选择所属标签"});
		getTagsLabel(values).then((res)=>{
			if (res.err === null){
				setTagsData(res.data);
			}
		})
	}
	
	
	const onFinishForm = (values) => {
		console.log(values);
		console.log(text)
	};
	
	return (
		<div>
			<Form {...formLayout} form={form_data} onFinish={onFinishForm} style={{"marginTop":"5vh"}}>
				<Form.Item 
					name="blog_name"
					label="博客标题"
					rules={[
						{
							required:true
						}
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item 
					name="class_id"
					label="所属类别"
					rules={[
						{
							required:true
						}
					]}
				>
					<Select
						allowClear
						style={{"width": '100%',}}
						placeholder="请选择所属类别"
						options={classData}
						onSelect={onSelectData}
						onChange={()=>{form_data.setFieldValue("tag_id",)}}
						onClear={()=>{setTagSelect({disable:true,place:"请先选择类别"})}}
					/>
				</Form.Item>
				<Form.Item 
					name="tag_id"
					label="标签"
					rules={[
						{
							required:true
						}
					]}
				>
					<Select
						disabled={tagSelect.disable}
						allowClear
						style={{"width": '100%',}}
						placeholder={tagSelect.place}
						options={tagsData}
					/>
				</Form.Item>
				<Form.Item
					name="des"
					label="描述"
					rules={[
						{
							required:true
						}
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="blog_context"
					label="博客内容"
				>
				</Form.Item>
				<div style={{"width":"100%"}}>
						<MdEditor 
							modelValue={text}
							onChange={(v) => {
								setText(v);
								setFlag(true);
							}} 
							onSave={(v,h) =>{
								h.then((html)=>{
									console.log(html);
								})
							}} 
							onUploadImg = {upLoadImage}
							toolbars={defToolbar}
						/>
					</div>	
				<Form.Item
				{...formTailLayout}
				style={{marginTop:"5vh"}}
				>
					<Button type="primary" htmlType="submit">提交</Button>
					<Button style={{"marginLeft":"10vw"}} onClick={()=>{
						form_data.resetFields();
						setText("");
						setFlag(0);
					}}>重置</Button>
				</Form.Item>
			</Form>
			
		</div>
	)
}
export default Test;