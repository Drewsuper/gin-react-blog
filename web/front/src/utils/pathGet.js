export default function(str){
	 if(str.indexOf('?')!=-1){
	        let obj={};
	        str.split("?")[1].split("&").map((el)=>{
	            let arr=el.split('=');
	            obj[arr[0]]=arr[1];
	        });
	        return obj;
	    }else{
	        return;
	    }
}