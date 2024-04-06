import React from "react";


const Footer = function(){
	const year = new Date().getFullYear();
	// <!-- 社交平台 -->
	return (
		<div style={{"backgroundColor":"black","color":'rgba(255,255,255,0.6)',"marginBottom":"0vh","minHeight":"5vh"}}>
		    <div style={{"padding":"5% 0 5% 1%"}}>
		        <p>
		            &copy; 2014 - {year}, Content By 李翰. All Rights Reserved.<br /><br/>
			        <a style={{"color": "rgba(255,255,255,0.6)"}} target="_blank" href="http://beian.miit.gov.cn/">鲁ICP备2024054937号</a>
			    </p>
			    </div>
			<div class="social">
		        
			</div>
			<div class="clearfix"> </div>
		</div>
	)
}

export default Footer;