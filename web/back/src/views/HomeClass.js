import {Button, Form, Input, Select, Drawer, Card, Pagination, Spin, Row, Col, Divider, message } from "antd"
import { useEffect, useState} from "react";
import { FieldTimeOutlined, PlusCircleOutlined,EditOutlined,EllipsisOutlined } from "@ant-design/icons"


import { getAllBlogClasses, getClassDataById, updateClassData, newClassData, deleteClass, checkAuth } from "../utils/api.js";
import { genComponentStyleHook } from "antd/es/theme/internal.js";
import { useNavigate } from "react-router-dom";


const HomeClass = () => {
	const navigate = useNavigate();
	const [classData, setClassData] = useState([]);
	const [pagination, setPagination] = useState(0);
	const [loading, setLoading] = useState(true);
	const [newOpen, setNewOpen] = useState(false);
	const [deatilOpen, setDetailOpen] = useState(false);
	const [classId, setClassId] = useState(0);
	const [flag, setFlag] = useState(0);
	useEffect(() => {
		checkAuth().then((res)=>{
			if (res !== 200){
				navigate("/login");
				message.error("登陆过期！请重新登录")
				return 
			}
		})
		getClassData()
	}, []);
	const [form] = Form.useForm();
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
		if (flag) {
			updateClassData({id: classId,real_name: values.real_name,view_name: values.view_name}).then((res) => {
				if (res.err === null) {
					message.success("update success", 5);
				} else {
					message.error("update failed", 5);
				}
			}).catch((err) => {message.error("update failed", 5);})
		} else {
			newClassData({real_name:values.real_name,view_name:values.view_name}).then((res)=>{
				if (res.err == null){
					message.success("update success", 5);
				}else{
					message.error("update failed", 5);
				}
			}).catch((err)=>{
				message.error("update failed", 5);
			})
			setFlag(0);
		}
		setNewOpen(false);
		form.resetFields();
		getClassData();
	};

	const onFinishDrawer = () => {
		setNewOpen(false);
	};

	const onCloseDrawer = () => {
		setNewOpen(false);
		form.resetFields();
		setFlag(0);
		setClassId(0);
	};
	const onOpenNewDrawer = (id) => {
		setFlag(1);
		getClassDataById(id).then((res) => {
			if (res.err === null) {
				setClassId(res.data.id);
				form.setFieldValue("real_name", res.data.real_name);
				form.setFieldValue("view_name", res.data.view_name);
				setNewOpen(true);
			} else {
				message.error("data get failed");
				return
			}
		})
	}

	const deleteClassData = (id,up,is_up)=>{
		if (up === is_up){
			return message.warning("状态以为要设定的状态！");
		}else{
			deleteClass(id,up).then((res)=>{
				if(res.err === null){
					return message.success("更新成功！",5)
				}else{
					return message.error("更新失败！",5)
				}
			})
		}
		getClassData()
	}

	const getClassData = () => {
		getAllBlogClasses().then((res) => {
			setLoading(true)
			if (res.err == null) {
				setClassData(res.data);
				setPagination(classData.length);
			}
			setTimeout(()=>{
				setLoading(false);
			},1000)
			
		})
	}

	const changePagination = (page, pageSize) => {
		console.log(page, pageSize);
	}

	return (
		<div>
			<Row style={{"marginBottom":".2vh"}}>
				<Col>
					<Button onClick={()=>{setNewOpen(true);setFlag(0)}} type="text" icon={<PlusCircleOutlined />}>新增</Button>
				</Col>
			</Row>
			<Divider />
			<Spin spinning={loading} tip="loading ....." style={{"minHeight":"100vh","position":"fixed"}}>
				<div>
				{
					loading?<div style={{"minHeight":"80vh"}}></div>:
						classData.map((item) => {
							return (
								<div style={{"padding":".1% .1%"}}>
									<Card 
										title={"真实名称："+item.real_name} 
										bordered={false} 
										hoverable 
										actions={[
											<Button type="text" onClick={()=>{onOpenNewDrawer(item.id)}} icon={<EditOutlined />}>编辑</Button>,
											<Button type="text" onClick={()=>{deleteClassData(item.id,0,item.is_up)}} danger icon={<EditOutlined />}>下线</Button>,
											<Button type="text" onClick={()=>{deleteClassData(item.id,1,item.is_up)}} >上线</Button>
											]}
										>
										<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />:{"显示名称："+item.view_name}</p>
										<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />:{item.create_time}</p>
										<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />:{item.update_time}</p>
										<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />状态:{item.is_up ? "上线":"下线"}</p>
										<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />删除:{item.is_del ? "否":"是"}</p>
									</Card>
								</div>
								)
						})
					}
				</div>
				<center><Pagination style={{"margin":"1% 0"}} defaultCurrent={1}  total={pagination} onChange={changePagination}/></center>
				<Drawer onClose={onCloseDrawer} onFinish={onFinishDrawer} open={newOpen} width={"60vw"}>
					<Form {...layout} form={form} onFinish={onFinishForm} style={{"marginTop":"20vh"}}>
						<Form.Item
						name="real_name"
						label="real_name"
						rules= {[{
								required: true,
								},]
						}>
							<Input/>
						</Form.Item>
						<Form.Item
							name="view_name"
							label="view_name"
							rules= {[
								{
									required: true,
								},]
							}>
								<Input/>
						</Form.Item>
						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit">提交</Button>
							<Button style={{"marginLeft":"10vw"}} onClick={()=>{form.resetFields();}}>重置</Button>
						</Form.Item>
					</Form>
				</Drawer>
			</Spin>
		</div>
	)
}

export default HomeClass;