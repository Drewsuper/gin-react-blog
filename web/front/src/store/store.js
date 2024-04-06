import {configureStore} from "@reduxjs/toolkit";

import indexMenuSlice from "../slice/indexMenuSlice.js";
import userSlice from "../slice/userSlice.js";


export default configureStore({
  reducer: {
	  indexMenu:indexMenuSlice,
	  user:userSlice
  },
});