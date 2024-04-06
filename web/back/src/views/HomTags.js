import { Button,Form,Input,Select, Drawer,Card,Pagination,Spin,Row,Col,Divider } from "antd"
import { useEffect, useState } from "react";
import { FieldTimeOutlined,PlusCircleOutlined } from "@ant-design/icons"


import { getAllBlogTags } from "../utils/api.js";


const HomeTags = ()=>{
	const [tagsData,setTagsData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newOpen, setNewOpen] = useState(false);
	const [deatilOpen, setDetailOpen] = useState(false);
	const [pagination,setPagination] = useState(0);
	useEffect(()=> {
		getAllBlogTags().then((res)=>{
			if(res.err == null){
				setTagsData(res.data);
				setPagination(tagsData.length);
			}
			setLoading(false);
		})
	}, []);
	const [ form ] = Form.useForm();
	const layout = {
	  labelCol: {
	    span: 8,
	  },
	  wrapperCol: {
	    span: 10,
	  },
	};
	const tailLayout = {
	  wrapperCol: {
	    offset: 7,
		span: 10,
	  },
	};
	
	const onFinishForm = (values) => {
		console.log(values);
	};
	
	const onFinishDrawer = ()=>{
		setNewOpen(false);
	};
	
	const onCloseDrawer = ()=>{
		setNewOpen(false);
	};
	
	const changePagination = (page,pageSize)=>{
		console.log(page,pageSize);
	}
	
	return (
		<div>
			<Row style={{"marginBottom":".2vh"}}>
				<Col>
					<Button onClick={()=>{}} type="text" icon={<PlusCircleOutlined />}>新增</Button>
				</Col>
			</Row>
			<Divider />
			<Spin spinning={loading} tip="lading ....." style={{"minHeight":"100vh","position":"fixed"}}>
				<div>
					{
						tagsData.map((item) => {
							return (
							<div style={{"padding":".1% .1%"}}>
								<Card title={'显示名称：'+item.view_name} bordered={false} hoverable >
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined /> {'真实名称：'+item.real_name}</p>
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined /> {item.up_time}</p>
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined /> class_id:{item.class_id}</p>
								</Card>
							</div>
							)
						})
					}
				</div>
			</Spin>			
			<center><Pagination style={{"margin":"1% 0"}} defaultCurrent={1}  total={pagination} onChange={changePagination}/></center>
			<Drawer onClose={onCloseDrawer} onFinish={onFinishDrawer} open={newOpen} width={"60vw"}>
				<Form {...layout} form={form} onFinish={onFinishForm} style={{"marginTop":"20vh"}}>,
					<Form.Item
						name="class_id"
						label= "所属类"
						rules = {[{required: true},]}
					>
						<Select
							mode="multiple"
						      allowClear
						      style={{
						        width: '100%',
						      }}
						      placeholder="请选择所属class"
						      defaultValue={[]}
							/>
					</Form.Item>
					<Form.Item
						name="real_name"
						label="真实名称"
						rules= {[
							{
								required: true,
							},
						]
						}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="view_name"
						label="显示名称"
						rules= {[
							{
								required: true,
							},
						]
						}
					>
						<Input />
					</Form.Item>
					<Form.Item
					{...tailLayout}
					>
						<Button type="primary" htmlType="submit">提交</Button>
						<Button style={{"marginLeft":"10vw"}} onClick={()=>{
							form.resetFields();
						}}>重置</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	)
}

export default HomeTags;