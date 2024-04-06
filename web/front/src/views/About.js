import React from "react";
import Helmet from "react-helmet";
import { Empty } from "antd";

import MyMenu from "../components/MyMenu.js";
import MyFooter from "../components/Footer.js";


const About = function (){
    return (
        <>
			<Helmet>
				<title>{"关于 -- 泉城落叶"}</title>
			</Helmet>
            <MyMenu />
			<div style={{"minHeight":"80vh"}}>
				<Empty  style={{"marginTop":"10vh"}}/>
			</div>
			
			<MyFooter />
        </>
    );
}

export default About;