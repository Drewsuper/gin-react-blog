import React, { useState } from "react";
import MyMenu from "../components/MyMenu";
import Helmet from "react-helmet";
import { Breadcrumb, Layout, theme, Col, Row  } from "antd";
import { Outlet } from "react-router-dom";
import UserNav from "../components/UserNav";

 
const Home = function (){
	// const navigate  =  useNavigate(); Header, 
	const {Content, Sider,Footer} = Layout;
	const [collapsed,setCollapsed] = useState(false);
	const {
		token: {colorBgContainer, borderRadiusLG }, 
	} = theme.useToken();
    return (
        <Layout style={{"minHeight":"100vh"}}>
			<Helmet theme="light">
				<title>{"后台主页 -- 泉城飘叶"}</title>
			</Helmet>
			<Sider 
				width="15.1vw" 
				theme="light" 
				collapsible 
				collapsed={collapsed} 
				onCollapse={(value) => setCollapsed(value)} 
			>
				<MyMenu />
			</Sider>
			<Layout>
				<Row style={{'backgroundColor': colorBgContainer}}>
					<Col push={21}><UserNav /></Col>
				</Row>
				<Row style={{'backgroundColor': colorBgContainer,'borderRadius': borderRadiusLG,'margin':".9% 16px"}}>
					<Breadcrumb style={{"margin":"16px 0"}}>
					
					</Breadcrumb>
				</Row>
				<Content  style={{"backgroundColor":colorBgContainer,"borderRadius":borderRadiusLG,"margin":"0 16px"}}>
					<div style={{"padding":"10px"}}>
						<Outlet />
					</div>
				</Content>
				<Footer>
					
				</Footer>
			</Layout>
        </Layout>
    );
}

export default Home;