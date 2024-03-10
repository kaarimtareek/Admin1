import { createSlice } from "@reduxjs/toolkit";

import { userList } from "./Data";

const userSlice = createSlice({
    name: "users",
    initialState: userList,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload); 
        },
        // uu stands for user update and we use it as nonstorageable var
        updateUser: (state, action) => {
            const {id,name,email,password,confirmPassword} = action.payload;
            // eslint-disable-next-line eqeqeq
            const uu = state.find(user => user.id == id);
            if(uu){
                uu.name = name ;
                uu.email = email;
                uu.password = password;
                // eslint-disable-next-line no-undef
                uu.confirmPassword = confirmPassword;

            }
        },
        // eslint-disable-next-line consistent-return
        deleteUser: (state,action) => {
            const{id} = action.payload;
            // i use the comment below to make ide accept 2 equals
             // eslint-disable-next-line eqeqeq
            const uu = state.find(user=>user.id == id);
            if(uu){
                // eslint-disable-next-line eqeqeq
                return state.filter( f=> f.id !== id);
            }
        }
    }
});
export const {addUser, updateUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;
