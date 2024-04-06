import Home from "../views/Home"
import Page404 from "../views/Page404"
import About from "../views/About";
import Markdown from "../views/Detail.js";
import Links from "../views/Links.js";
import MyHistory from "../views/MyHistory";


const routers = [
    {
        path:"/",
        element:<Home></Home>,
        meta:{
            title:"主页"
        }
    },
	{
		path:"/about",
		element:<About></About>,
		meta:{
			title:"关于我们"
		}
	},
	{
		path:"/detail",
		element: <Markdown></Markdown>,
	},
	{
		path:"/links",
		element: <Links></Links>
	},
	{
		path:"/hist",
		element:<MyHistory></MyHistory>
	},
	{
	    path:"*",
	    element:<Page404></Page404>,
	    meta:{
	        title: "错误页面"
	    }
	},

]
export {
    routers
} 