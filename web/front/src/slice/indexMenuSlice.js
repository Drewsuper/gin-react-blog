import {createSlice} from "@reduxjs/toolkit";


export const indexMenuSlice = createSlice({
	name:'menu_index',
	initialState: {
		value:window.sessionStorage.getItem("menu_index"),
	},
	reducers:{
		setIndexMenu:(state,name) => {
			state.value = name.payload;
			window.sessionStorage.setItem("menu_index",name.payload)
		}
	},
});
export const {setIndexMenu} = indexMenuSlice.actions;
export default indexMenuSlice.reducer;