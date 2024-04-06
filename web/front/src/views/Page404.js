import React from "react";
import errorPng from "../imgDir/404.png";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";


const Page404 = function() {
	const navigate = useNavigate();
    const errorUrl = errorPng;
    return (
        <div>
			<Helmet>{"404 -- 泉城落叶"}</Helmet>
            <center>
				<img src={errorUrl} />
            </center>
			<Button  type="text" onClick={()=>{
				navigate("/");
			}}></Button>
        </div>
    )
}

export default Page404;