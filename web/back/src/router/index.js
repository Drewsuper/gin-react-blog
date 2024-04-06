import Page404 from "../views/Page404.js";
import AuthRouter from "../views/AuthRouter.js";
import About  from "../views/LoginPage.js";
import HomeClass from "../views/HomeClass.js";
import Home from "../views/Home.js";
import BlogEdit from "../views/BlogEdit.js";
import HomeTags from "../views/HomTags.js";


const routers = [
    {
        path:"/home",
        element:<AuthRouter><Home></Home></AuthRouter>,
        children: [
			{path:"/home/class",element: <HomeClass />},
			{path:"/home/tags",element:<HomeTags />},
			{path:"/home/cts",element:<BlogEdit />}
		]	
    },
	{
		path:"/",
		element:<AuthRouter><Home></Home></AuthRouter>
	},
	{
		path:"/login",
		element:<About></About>,
		meta:{
			title:"login"
		}
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