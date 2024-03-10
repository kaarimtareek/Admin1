import { createSlice } from "@reduxjs/toolkit";

import { coponList } from "./Data";

const coponSlice = createSlice({
    name: "copons",
    initialState: coponList,
    reducers: {
        addCopon: (state, action) => {
            state.push(action.payload); 
        },
        // uu stands for user update and we use it as nonstorageable var
        updateCopon: (state, action) => {
            const {id,name,amount,img,expireDate} = action.payload;
            // eslint-disable-next-line eqeqeq
            const uu = state.find(copon => copon.id == id);
            if(uu){
                uu.name = name ;
                uu.amount = amount;
                uu.expireDate = expireDate;
                uu.img = img;
            }
        },
        // eslint-disable-next-line consistent-return
        deleteCopon: (state, action) => {
            const { id } = action.payload;
            console.log('Deleting Copon with ID:', id); 
            const index = state.findIndex(copon => copon.id === id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
        
    }
});
export const {addCopon, updateCopon, deleteCopon} = coponSlice.actions;
export default coponSlice.reducer;

