import { createSlice } from "@reduxjs/toolkit";

import { subblogList } from "./Data";

const subblogSlice = createSlice({
    name: "subblogs",
    initialState: subblogList,
    reducers: {
        addSubblog: (state, action) => {
            state.push(action.payload); 
        },
        // uu stands for user update and we use it as nonstorageable var
        updateSubblog: (state, action) => {
            const {id,name,img,categoryId} = action.payload;
            // eslint-disable-next-line eqeqeq
            const uu = state.find(subblog => subblog.id == id);
            if(uu){
                uu.name = name ;
                uu.img = img;
                uu.categoryId = categoryId;
            }
        },
        // eslint-disable-next-line consistent-return
        deleteSubblog: (state, action) => {
            const { id } = action.payload;
            console.log('Deleting subblog with ID:', id); 
            const index = state.findIndex(subblog => subblog.id === id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
        
    }
});
export const {addSubblog, updateSubblog, deleteSubblog} = subblogSlice.actions;
export default subblogSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// import { blogList } from "./Data";

// const blogSlice = createSlice({
//     name: "blogs",
//     initialState: blogList,
//     reducers: {
//         addBlog: (state, action) => {
//             state.push(action.payload); 
//         },
//         updateBlog: (state, action) => {
//             const { id, name, img } = action.payload;
//             const blogToUpdate = state.find(blog => blog.id === id);
//             if (blogToUpdate) {
//                 blogToUpdate.name = name;
//                 blogToUpdate.img = img;
//             }
//         },
//         deleteBlog: (state, action) => {
//             const { id } = action.payload;
//             // Modify the state directly
//             const index = state.findIndex(blog => blog.id === id);
//             if (index !== -1) {
//                 state.splice(index, 1);
//             }
//         }
//     }
// });

// export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
// export default blogSlice.reducer;
