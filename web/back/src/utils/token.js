const setCookie = (cname,cdata,exhours) =>{
	var date = new Date();
	date.setTime(date.getTime() + (exhours * 60 * 60 * 10000));
	var expires = "expires="+ date.toGMTString();
	document.cookie = cname + "=" + cdata + ";" + expires;
}

const getCookie = (cname)=>{
	var cdata = document.cookie.split(";");
	var name = cname + "=";
	for(var i=0; i < cdata.length; i++){
		var c = cdata[i].trim();
		if (c.indexOf(name) === 0){
			return c.substring(name.length,c.length);
		}
	}
	return "";
}

const clearCookie = ()=>{
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}


export {
	setCookie,
	getCookie,
	clearCookie,
}