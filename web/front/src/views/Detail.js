import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import ReactMarkdown from "react-markdown";
import { Layout, Collapse, ConfigProvider, Spin } from "antd"
import MarkNav from "markdown-navbar";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import "markdown-navbar/dist/navbar.css"
import rehypeRaw from "rehype-raw";
import { useLocation } from "react-router-dom";

import getPath from "../utils/pathGet.js";
import MyMenu from "../components/MyMenu";
import page from "../markdown/README.md";
import MyFooter from "../components/Footer.js";
import { getBlogContext } from "../utils/dataApi.js";


const Markdown = function(){
	const htmlText = ""
	const [markdown, setMarkdwon] = useState("");
	const [loading, setLoading] = useState(true);
	const { Content } = Layout;
	let searchParams = useLocation();
	searchParams = getPath(searchParams.search).id;
	// const md_url = "";
	useEffect(() => {
		window.location.href = "#root";
		getBlogContext(searchParams).then((res) =>{
			if (res.err === null){
				fetch(res.data).then( res => res.text() )
				.then(text => setMarkdwon(text));
			}else{
				fetch(page).then(res => res.text())
				.then(text => setMarkdwon(text));
			}
		});
	},[page]);
	const items = [
		{
			key: "1",
			label: "目录",
			children: <MarkNav source={markdown} updateHashAuto={true}/>
		}
	];
	setTimeout(()=>{
		setLoading(false);
	},1000)
	return (
		<Layout>
			<Helmet>
				<title>{`${searchParams} -- 泉城飘叶`}</title>
			</Helmet>
			<MyMenu/>
			<Spin spinning={loading} tip="lading ....." style={{"minHeight":"100vh","position":"fixed"}}>
				{
					loading ? <div style={{"minHeight":"80vh"}}></div>: (
						<Content className="conent" style={{"backgroundColor":"#e4e6eb"}}>
						<ConfigProvider>
							<Collapse
								style={{"position":"fixed","top":"80px","left":'10px',"width":"19%"}}
								defaultActiveKey={["1"]}
								expandIconPosition={"end"}
								items={items}
								collapsible={"icon"}
							/>
						</ConfigProvider>
						<div style={{"width":"80%","marginLeft":"20vw","padding":"3vh 1vw","backgroundColor":"white", "borderRadius":"10px"}}>
							<ReactMarkdown className={"markdown-body"} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
						</div>
					</Content>
					)
				}
			</Spin>
			<MyFooter/>
		</Layout>
	)
}
export default Markdown;
