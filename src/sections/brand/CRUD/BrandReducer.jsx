import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const createAsyncThunk = from require("@reduxjs/toolkit").createAsyncThunk ;

export const getBrands = createAsyncThunk('brands/getBrands', ()=>{
    const baseUrl = import.meta.env.VITE_BASE_API_URL;

    return axios.get(`${baseUrl}/brand`)
            .then((res)=> res.data.brand);
});
const initialState = {
    brands: [],
    loading: false,
    status: 'idle',
    error: null
  }
const brandSlice = createSlice({
    name: "brands",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getBrands.pending, (state)=>{
            state.loading = true;
            state.status = 'working';
            console.log('loading now is true');
        });
        builder.addCase(getBrands.fulfilled, (state, action)=>{
            state.loading = false;
            console.log('loading now is true fulfilled');
            state.status = 'fulfilled';
            state.brands = action.payload;
        });
        builder.addCase(getBrands.rejected, (state,action)=>{
            state.loading = false;
            state.brands = [];
            state.status = 'rejected';
            console.log('loading now is false rejected');
            state.error = action.error.message;
        });
        

    },
    reducers: {
        addBrand: (state, action) => {
            state.push(action.payload); 
        },
        // uu stands for user update and we use it as nonstorageable var
        updateBrand: (state, action) => {
           
            try {
                const baseUrl = import.meta.env.VITE_BASE_API_URL;
                
                console.log(`base URL is ${baseUrl}`);
                axios.get(`${baseUrl}/brand`)
                .then((response) => response.data)
                .then((json) => {
                  console.log('json', json);
                 
                })
                .catch((error) => {
                  console.log(error);
                });
            
                fetch(`${baseUrl}/brand`, {
                    method: 'GET'
                }).then((response)=> {
                    if(!response.ok)
                    {
                        console.log('error in fetching brands');
                    }
                    else
                    {
                        console.log(response);
                    }
                });
               
                const {id,name,img} = action.payload;
                // eslint-disable-next-line eqeqeq
                const uu = state.find(brand => brand.id == id);
                if(uu){
                    uu.name = name ;
                    uu.img = img;
                }
                
            } catch (error) {
                console.error(`error in updating brand with error ${error}`);
            }

           
        },
        // eslint-disable-next-line consistent-return
        deleteBrand: (state, action) => {
          
            const { id } = action.payload;
          
            const index = state.findIndex(brand => brand.id === id);
            if (index !== -1) {
                state.splice(index, 1);
                console.log(`brand with id ${id} is deleted`); 
            }
            else{
                console.log(`deleting brand with id ${id} not found`);
            }
        },
        
    }
});
export const {addBrand, updateBrand, deleteBrand} = brandSlice.actions;
export const selectAllBrands = state => state.brands

export default brandSlice.reducer;



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
