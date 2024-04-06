import {configureStore} from "@reduxjs/toolkit";

import menuSlice from "../slice/menuSlice.js";





export default configureStore({
  reducer: {
	  menu:menuSlice,
  },
});