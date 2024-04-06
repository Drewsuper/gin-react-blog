import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import "antd/dist/reset.css";

import store from "./store/store.js";
import {Provider} from "react-redux"




ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
		<Router basename={"/index"}>
			<App/>
		</Router>
	</Provider>
)