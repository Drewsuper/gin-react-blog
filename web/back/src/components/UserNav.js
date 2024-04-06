import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

import {getCookie, clearCookie } from '../utils/token.js';


const UserNav = ()=>{
	const [token, setToken] = useState("");
	const navigate = useNavigate();
	const items = [
		{
			label: "logout",
			key: 'logout',
		},
	];
	const onClick = (e)=>{
		if (e.key === "logout" ){
			navigate("/login")
			clearCookie()
		}
	}
	
	useEffect(()=>{
		setToken(getCookie('token'))
	}, [])
	
	return (
		<>
			<Dropdown 
				menu={{
					items,
					onClick,
				}}
			>
				<Avatar size={40} icon={<UserOutlined />} />
			</Dropdown>
		</>
	)
}

export default UserNav;