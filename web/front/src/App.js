import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import {routers} from "./router/index"
import { useDispatch } from "react-redux";
import { setIndexMenu } from "./slice/indexMenuSlice.js";

function App(props) {
	const dispatch = useDispatch();
    useEffect(() =>{
		var url = window.location.href
		url = url.split("/")
		var index = url.length;
		var key = url[index - 1]
		const flag = 0; 
		if (key.indexOf("#") !== -1){
			key = key.split("#")[0]
			window.sessionStorage.setItem("menu_index",key)
		}else{
			if (key.length === 0){
				window.sessionStorage.setItem("menu_index","home");
			}else{
				if (key === 'hist'){
					key = "history";  
				}
				window.sessionStorage.setItem("menu_index",key);
			}
		}
		key = window.sessionStorage.getItem("menu_index");
		dispatch(setIndexMenu(key));
	},[])
	const elements = useRoutes(routers);
    return elements;
  }

  export default App;
  