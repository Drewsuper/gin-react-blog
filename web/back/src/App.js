import { useEffect } from "react";
import { useRoutes,useLocation } from "react-router-dom";
import {routers} from "./router/index";
import { useDispatch } from "react-redux";
import { setMenu  } from "./slice/menuSlice.js";


function App(props) {
	var location = useLocation();
	const dispatch = useDispatch();
	useEffect(()=>{
		var key = location.pathname.split("/");
		key = key[key.length - 1];
		if (key.length === 0){
			key = "home";
		}
		dispatch(setMenu(key));
	},[]);
    const elements = useRoutes(routers);
    return elements;
  }

  export default App;
  