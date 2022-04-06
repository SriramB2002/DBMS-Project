import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "loggedin",
    initialState:{value:{isloggedIn:false}},
    reducers:{
        loginst:(state,action)=>{
            state.value.isloggedIn = action.payload;
        }
    }
});
export const {loginst} = userSlice.actions;
export default userSlice.reducer;
