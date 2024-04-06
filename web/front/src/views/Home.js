import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Pagination } from "antd";
import MyMenu from "../components/MyMenu";
import Helmet from "react-helmet";
import {Typewriter} from 'react-simple-typewriter'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FieldTimeOutlined } from "@ant-design/icons"
import Footer from "../components/Footer.js"
import { getBlogPage,getBlogAllPage } from "../utils/dataApi.js";
import { getAllByAltText } from "@testing-library/react";

const Home = function (){
	const dispatch = useDispatch();
	const navigate  =  useNavigate();
	const BackGround = require("../imgDir/index.jpg");
	const [ready,setReady] = useState(true);
	const [allPage,setAllPage] = useState(10);
	var arr = [
		{
			title:"article1",
			data:{
					UserName: 'Zhou Maomao',
					Telephone: '1810000000',
					Live: 'Hangzhou, Zhejiang',
			}
		},{
			title:"artical4",
			data:{
					UserName: 'Zhou Maomao',
					Telephone: '1810000000',
					Live: 'Hangzhou, Zhejiang',
			}
		},
		{
			title:"artical5",
			data:{
					UserName: 'Zhou Maomao',
					Telephone: '1810000000',
					Live: 'Hangzhou, Zhejiang',
			}
		},{
			title:"artical6",
			data:{
					UserName: 'Zhou Maomao',
					Telephone: '1810000000',
					Live: 'Hangzhou, Zhejiang',
			}
		},
		{
			title:"artical7",
			data:{
					UserName: 'Zhou Maomao',
					Telephone: '1810000000',
					Live: 'Hangzhou, Zhejiang',
			}
		}
	];
	useEffect( () => {
		getBlogPage(1).then((res)=>{
			if (res.err === null){
				console.log(res.data)
			}
		});
		getBlogAllPage().then((res) =>{
			if (res.err === null){
				setAllPage(res.data)
			}
		})
		if  (window.sessionStorage.getItem("start") == null){
			window.sessionStorage.setItem("start",2);
			setTimeout( () => {
				setReady(false);
			}, 9000);
		}else{
			setReady(false);
		}
	}, [] )
	const [style,setStyle] = useState(true);
	const changePagination = (page,pageSize) =>{
		console.log(page)
		// getBlogPage(page).then((res) => {
		// 	if (res.err === null){
		// 		arr = res.data
		// 	}
		// })
	}
	
	
    return (	
        <div>
			<Helmet>
				<title>{"主页 -- 泉城飘叶"}</title>
			</Helmet>
			{
				ready? (
					<div style={{"backgroundImage":"url("+BackGround + ")","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat","minHeight":"100vh"}}>
						<center style={{"color": "palegreen","opacity":"90%","fontSize":"50px","padding":"15% 0 0 0"}}>
							<Typewriter
								loop={1}
								cursor={style}
								cursorStyle="_"
								typeSpeed={200}
								delaySpeed={3000}
								words={['WELCOME TO MY VLOG SYSTEM!']}
								onLoopDone={()=>{
									setStyle(false)
								}}
							/>
						</center>
					</div>
				):(
					<div>
						<MyMenu style={{opacity:"50%"}}/>
						<center style={{"minHeight":"10vh"}}>
							<p style={{"padding":"1% 0","fontSize":"40px"}}>人必有所执,方能有所成.</p>
						</center>
						<div>
							{
								arr.map((itme) => {
									return (
									<div style={{"padding":".1% .1%"}}>
										<Card title={itme.title} bordered={false} hoverable onClick={()=>{
											navigate(`/detail?id=${itme.title}`);
										}}>
											<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />:{itme.data.UserName}</p>
											<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />:{itme.data.Telephone}</p>
											<p style={{"float":"left", "paddingLeft":"5%"}}><FieldTimeOutlined />:{itme.data.Live}</p>
										</Card>
									</div>
									)
								})
							}
						</div>
						<center><Pagination style={{"margin":"1% 0"}} defaultCurrent={1}  total={allPage} onChange={changePagination}/></center>
						<Footer/>
					</div>
				)
			}
        </div>   
    );
}

export default Home;