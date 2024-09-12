import { Button,Form,Input,Select, Drawer,Card,Pagination,Spin,Row,Col,Divider, message } from "antd"
import { useEffect, useState } from "react";
import { FieldTimeOutlined,PlusCircleOutlined,EditOutlined } from "@ant-design/icons"


import { getAllBlogTags,getClassDataById,getClassLabel,getTagetDataById,newTagsData,deleteTags } from "../utils/api.js";


const HomeTags = ()=>{
	const [tagsData,setTagsData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newOpen, setNewOpen] = useState(false);
	const [deatilOpen, setDetailOpen] = useState(false);
	const [pagination,setPagination] = useState(0);
	const [flag,setFlag] = useState(0);
	const [classData,setClassData] = useState();
	useEffect(()=> {
		getTagsData();
		getClassLabel().then((res)=>{
			if (res.err === null){
				setClassData(res.data);
			}
		});
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
		newTagsData(values).then((res)=>{
			if (res.err === null){
				message.success('添加成功！',5)
			}else{
				message.error('添加失败！',5)
			}
			onCloseDrawer();
			getTagsData();
		})
	};
	
	const onFinishDrawer = ()=>{
		if (flag){
			message.success("1.1更新成功！",5);
		}else{
			message.success("1.2更新成功！",5);
		}
		setFlag(0);
		form.resetFields();
		setNewOpen(false);
	};
	
	const onOpenDrawer = (id)=>{
		getTagetDataById(id).then((res)=>{
			if (res.err == null){
				form.setFieldValue("real_name",res.data.real_name);
				form.setFieldValue("view_name",res.data.view_name);
				setNewOpen(true);
			}else{
				message.error("data get failed");
			}
		})
		setFlag(1);
	}
	
	const onCloseDrawer = (data)=>{
		form.resetFields();
		setNewOpen(false);
	};
	
	const changePagination = (page,pageSize)=>{
		console.log(page,pageSize);
	}
	
	const getTagsData = ()=>{
		getAllBlogTags().then((res)=>{
			setLoading(true);
			if(res.err == null){
				setTagsData(res.data);
				setPagination(tagsData.length);
			}
			setTimeout(()=>{
				setLoading(false);
			},2000);
		})
	} 
	
	const deleteClassData = (id,up,is_up)=>{
		if (up === is_up){
			return message.warning("状态以为要设定的状态！");
		}else{
			deleteTags(id,up).then((res)=>{
				if(res.err === null){
					return message.success("更新成功！",5)
				}else{
					return message.error("更新失败！",5)
				}
			})
		}
		getTagsData()
	}
	
	const getSelectData = ()=>{
		console.log("ser")
		getClassLabel().then((res)=>{
			message.success("success",5);
		}).catch((err)=>{
			message.error("data get failed", 5);
		})
	}
	
	return (
		<div>
			<Row style={{"marginBottom":".2vh"}}>
				<Col>
					<Button onClick={()=>{setNewOpen(true)}} type="text" icon={<PlusCircleOutlined />}>新增</Button>
				</Col>
			</Row>
			<Divider />
			<Spin spinning={loading} tip="lading ....." style={{"minHeight":"100vh","position":"fixed"}}>
				<div>
					{
						loading?<div style={{"minHeight":"80vh"}}></div>:
						tagsData.map((item) => {
							return (
							<div style={{"padding":".1% .1%"}}>
								<Card title={'显示名称：'+item.view_name} bordered={false} hoverable 
									actions = {[
										<Button type="text" onClick={()=>{onOpenDrawer(item.id)}} icon={<EditOutlined />}>编辑</Button>,
										<Button type="text" onClick={()=>{deleteClassData(item.id,0,item.is_up)}} danger icon={<EditOutlined />}>下线</Button>,
										<Button type="text" onClick={()=>{deleteClassData(item.id,1,item.is_up)}}>上线</Button>
									]} 
								>
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined /> {'真实名称：'+item.real_name}</p>
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined /> {item.up_time}</p>
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined /> 所属类别的ID:{item.class_id}</p>
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />状态:{item.is_up ? "上线":"下线"}</p>
								</Card>
							</div>
							)
						})
					}
				</div>
			</Spin>			
			<center><Pagination align="center" style={{"margin":"1% 0"}} defaultCurrent={1}  total={pagination} onChange={changePagination}/></center>
			<Drawer onClose={onCloseDrawer} onFinish={onFinishDrawer} open={newOpen} width={"60vw"}>
				<Form {...layout} form={form} onFinish={onFinishForm} style={{"marginTop":"20vh"}}>,
					<Form.Item
						name="class_id"
						label= "所属类"
						rules = {[{required: true},]}
					>
						<Select
							// mode="multiple"
						      allowClear
						      style={{
						        width: '100%',
						      }}
						      placeholder="请选择所属class"
							  options={classData}
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