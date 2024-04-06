import React from "react";
import { Menu, Layout } from "antd";
import { AppstoreOutlined, GithubOutlined, LinkOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import {setIndexMenu, } from "../slice/indexMenuSlice.js";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../imgDir/logo1.png"

const MyMenu = function(){
	const navigate = useNavigate();
    const SelectKey = useSelector((state) => state.indexMenu.value);
	const dispatch = useDispatch();
	const LogoURL = Logo;
    const item = [
        {
            label:"主页",
            key: 'home',
            icon: <AppstoreOutlined />,
			title:"主页"
        },
		{
		    label: '历程',
		    key: 'history',
		    icon: <AppstoreOutlined />,
			title:"历程"
		},
		{
			label: "关于我",
			key: "about",
			icon:<AppstoreOutlined />
		},
		{
			label:"友链",
			key:"links",
			icon:<LinkOutlined />
		},
		{
			label:"git",
			key: "git",
			icon:<GithubOutlined />
		},
		
    ];
	const LogoClick = function(){
			navigate("/");
			dispatch(setIndexMenu("home"));
	};
	const onclick = (e)=>{
		if (e.key === "home" ){
			navigate("/")
		}else if (e.key === "about"){
			navigate("/about")
		}else if (e.key === "links"){
			navigate("/links");
		}else if (e.key == 'history' ){
			navigate("/hist");
		}else if (e.key == "test"){
			navigate("/test")
		}else if (e.key == "git"){
			window.location = "https://www.github.com";
		}
		dispatch(setIndexMenu(e.key));
	}
    return (
		<Layout style={{"borderBottom":"0.1px solid","borderBottomColor":"grey","display":"block","backgroundColor":"#ffffff"}}>
			<div style={{"width":"22%","height":50,"display":"inline-block"}} onClick={LogoClick}>
				<img src={LogoURL}  title="logo" style={{"width":"20%","height":"100%","display":"inline-block"}}/>
			</div>
			<Menu
			style={{
				"width":"78%",
				"height": 39,
				"fontSize":15,
				"display":"inline-block",
				"borderBottom":0,
			}}
			selectedKeys={[SelectKey]}
			mode="horizontal"
			items={item}
			onClick={onclick}/>
		</Layout>
    )
}

export default MyMenu;