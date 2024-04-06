import {createSlice} from "@reduxjs/toolkit"


export const userSlice = createSlice({
	name: "user",
	initialState:{
		value: window.sessionStorage.getItem("token")
	},
	reducers:{
		setToken:(state,name) => {
			state.value = name.payload;
			window.sessionStorage.setItem("token",name.payload)
		}
	},
});

export const {setToken} = userSlice.actions;
export default userSlice.reducer;