import React from "react";
import Helmet from "react-helmet";
import { Card, Input, Button, message } from "antd";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, KeyOutlined } from "@ant-design/icons"
import { useState } from "react";
import { getLogin } from "../utils/api.js";
import { useNavigate } from "react-router-dom";

const About = function (){
	const backGroundImage = require("../img/index.jpg");
	const [unameData,setUname] = useState("");
	const [pwdData,setPWD] = useState("");
	const navigate = useNavigate();
	const MyEvent = () =>{
		if (unameData.length !== 0 && pwdData.length !== 0){
			getLogin(unameData,pwdData).then((res)=>{
				if(res.err == null){
					message.success("login success");
					navigate('/home');
				}else{
					message.warning("username or password has error");
				}
			});
		}else{
			message.error("username or password is null");
		}	
	}
    return (
        <>
			<Helmet>
				<title>{"登陆界面--泉城飘叶后台管理"}</title>
			</Helmet>
			<div style={{"backgroundImage":"url('"+ backGroundImage+"')","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat","minHeight":"100vh"}}>
				<Card 
					style={{"position":"absolute","left":"74vw","top":"20vh","width":"25vw","minHeight":"40vh","opacity":"80%"}}
				>
					<center style={{"fontSize":"20px","color":"skyblue","fontWeight":"bold"}}>登&nbsp;&nbsp;&nbsp;&nbsp;录</center>
					<Input 
						style={{"marginTop":"10vh"}}
						prefix={<UserOutlined />}
						vaule={unameData} 
						onChange={e =>{setUname(e.target.value)}}
						onPressEnter = {MyEvent}
					/>
					<Input.Password 
						style={{"marginTop":"5vh"}}
						prefix={<KeyOutlined />} 
						iconRender={(visible) => (visible?<EyeTwoTone/>: <EyeInvisibleOutlined />)}
						value={pwdData}
						onChange={e => setPWD(e.target.value)}
						onPressEnter={MyEvent}
					/>
					<center style={{"marginTop":"2vh"}}>
						<Button type="primary" onClick={MyEvent}>登&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
					</center>
				</Card>
			</div>
        </>
    );
}

export default About;