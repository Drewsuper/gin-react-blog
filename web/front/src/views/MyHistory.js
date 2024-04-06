import React from "react";
import Helmet from "react-helmet"
import { Empty } from "antd";


import MyMenu from "../components/MyMenu";
import  Footer from "../components/Footer.js";

const MyHistory = function(){
	
	return (
		<div>
			<Helmet>
				<title>{"历程 -- 泉城飘叶"}</title>
			</Helmet>
			<MyMenu />
			<div style={{"minHeight":"80vh"}}>
				<Empty  style={{"marginTop":"10vh"}}/>
			</div>
			<Footer />
		</div>
	)
	
}

export default MyHistory;