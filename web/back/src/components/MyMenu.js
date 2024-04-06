import React from "react";
import { Menu , } from "antd";
import { SettingOutlined, } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import {setMenu, } from "../slice/menuSlice.js";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../img/logo.png"

const MyMenu = function(){
	const navigate = useNavigate();
    const SelectKey = useSelector((state) => state.menu.value);
	const dispatch = useDispatch();
	const LogoURL = Logo;
    const item = [
        {
            label:"主页",
            key: 'home',
            icon: <SettingOutlined />,
			title:"主页",
        },
		{
		    label: '文章设置',
		    key: 'setting',
		    icon: <SettingOutlined />,
			title:"文章设置",
			children :[
				{
					label:"分类设置",
					key:"class",
					title:'分类设置',
				},
				{
					label:"标签设置",
					key:"tags",
					title:"标签设置",
				},
				{
					label:"文章设置",
					key:"cts",
					title:"文章设置",
				}
			]
		},
    ];
	const LogoClick = function(){
			navigate("/");
			dispatch(setMenu("home"));
	};
	const onclick = (e)=>{
		if (e.key === "home" ){
			navigate("/")
		}else if (e.key === "tags"){
			navigate("/home/tags");
		}else if (e.key === "class"){
			navigate("/home/class");
		}else if (e.key == "cts"){
			navigate("/home/cts");
		}
		dispatch(setMenu(e.key));
	};
	const open =["setting"];
    return (
		<div>
			<div style={{"width":"80%","height":50,"display":"inline-block"}} onClick={LogoClick}>
				<img src={LogoURL}  title="logo" style={{"width":"50%","height":"100%","display":"inline-block"}}/>
			</div>
			<Menu
				style={{
					"width":"100%",
					"fontSize":15,
					"borderBottom":0,
				}}
				selectedKeys={[SelectKey]}
				mode="horizontal"
				items={item}
				onClick={onclick}
				mode="inline"
				defaultOpenKeys={open}
			/>
		</div>
    )
}

export default MyMenu;