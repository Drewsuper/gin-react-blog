import { useEffect,useState,useRef } from "react";
import { Card, Drawer, Spin, Empty, Pagination, Row, Col, Button, Divider } from "antd";
import { FieldTimeOutlined,PlusCircleOutlined,EditOutlined,EllipsisOutlined } from "@ant-design/icons";

import { getBlogContext } from "../utils/api.js";
import Test from "./test.js";

const BlogEdit = ()=>{
	const cRef = useRef(null);
	const [spinLoadding,setSpinLoadding] = useState(true);
	const [pagination, setPagination] = useState(0);
	const [curPagination, setCurPagination] = useState(1);
	const [contextData, setContextData] = useState([{key:"123",data:"123123"},{key:"1243",data:"1231231"},{key:"1263",data:"1231231"},{key:"243",data:"1231231"},{key:"1643",data:"1231231"}]);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [drawerData,setDrawerData] = useState();
	useEffect(()=>{
		// getBlogContext(curPagination - 1).then((res)=>{
		// 	if (res.err == null){
		// 		setContextData(res.data);
		// 	}
		// })
		setTimeout(()=>{
			setSpinLoadding(false);
		},1000)
	},[]);
	const changePagination = (page, pageSize) => {
		setCurPagination(page);
	}
	const clickCard = (key)=>{
		console.log(key);
	}
	
	const onFinishDrawer = ()=>{
		cRef.current && cRef.current.clearData()
		setDrawerOpen(false);
	};
	const openDrawer = (data,id)=>{
		if (data){
			setDrawerOpen(true);
			cRef.current.clearData();
		}else{
			setDrawerOpen(true);
			setDrawerData(id)
		}
	};
	const onCloseDrawer = ()=>{
		setDrawerOpen(false);
	};
	
	
	return (
		<div>
			<Row style={{"marginBottom":".2vh"}}>
				<Col>
					<Button onClick={()=>{openDrawer(1)}} type="text" icon={<PlusCircleOutlined />}>新增</Button>
				</Col>
			</Row>
			<Divider />
			<Spin spinning={spinLoadding} tip="lading ....." style={{"minHeight":"100vh","position":"fixed"}}>
				{contextData == null ?
				 <Empty imageStyle={{"minHeight":"80vh","minWidth":"80vw"}} />:<div>
					{contextData.map((item) => {
						return (
							<div style={{"padding":".1% .1%"}}>
								<Card 
								title={'显示名称：'+item.key} 
								bordered={false} 
								hoverable 
								actions={[
									<EditOutlined onClick={()=>{openDrawer(0,item.key)}} >编辑</EditOutlined>,
									<EllipsisOutlined onClick={()=>{setDrawerOpen(true);}} >隐藏</EllipsisOutlined>
									]}
								>
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />真实名称:</p>
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined /> {item.data}</p>
									<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined /> class_id:</p>
								</Card>
							</div>
						)
					})}
				</div>}
			</Spin>
			<center><Pagination style={{"margin":"1% 0"}} defaultCurrent={1} total={10} onChange={changePagination}/></center>
			<Drawer 
				onClose={onCloseDrawer}
				onFinish={onFinishDrawer}
				open={drawerOpen}
				width={"60vw"}
			>
				<Test data={drawerData} cRef={cRef}></Test>
			</Drawer>
		</div>
	)
}

export default BlogEdit;