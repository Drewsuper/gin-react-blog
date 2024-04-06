import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { Empty } from "antd";

import MyMenu from "../components/MyMenu.js";
import Footer from "../components/Footer.js";


const Links = function(){
	useEffect(() => {
		console.log("links");
	},[])
	
	return (
		<div>
			<Helmet>
				<title>{"友链 -- 泉城飘叶"}</title>
			</Helmet>
			<MyMenu />
			<div style={{"minHeight":"80vh"}}>
				<Empty  style={{"marginTop":"10vh"}}/>
			</div>
			<Footer />
		</div>
	)
} 
export default Links;