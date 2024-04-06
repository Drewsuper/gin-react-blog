import {createSlice} from "@reduxjs/toolkit";


export const menuSlice = createSlice({
	name:'menu',
	initialState: {
		value:window.sessionStorage.getItem("menu"),
	},
	reducers:{
		setMenu:(state,name) => {
			state.value = name.payload;
			window.sessionStorage.setItem("menu",name.payload)
		}
	},
});
export const {setMenu} = menuSlice.actions;
export default menuSlice.reducer;