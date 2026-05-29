import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { async } from './../../node_modules/@reduxjs/toolkit/src/query/standardSchema';
import { learningAPI } from "./../constants/axios";
import { propertyRequest } from "./../constants/requests"


const initial_state = {
  property: [],
  status: "idle",
  error: null,
};

export const getProperties = createAsyncThunk("properties/fetch", async () => {
  try {
    const response = await learningAPI.get("/properties");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const addProperties = createAsyncThunk(
  "properties/add",
  async (propertyData) => {
    try {
      const response = await learningAPI.post(
        propertyRequest.property,
        propertyData,
      );

      return response.data.property;
    } catch (error) {
      return error.response.data;
    }
  },
);

const propertySlice = createSlice({
  name: "property",
  initialState:initial_state,
  extraReducers:(builder)=>{
    builder.addCase(getProperties.pending,(state,action)=>{
        state.status="loading"
    })
    .addCase(getProperties.rejected,(state,action)=>{
        state.error =action.error.message
        state.status = "rejected"
    })
    .addCase(getProperties.fulfilled ,(state,action)=>{
        state.property = action.payload  
        //state.property= action.payload.properties
        state.status="success"
    })
    .addCase(addProperties.pending,(state,action)=>{
        state.status="loading"
    })
    .addCase(addProperties.rejected,(state,action)=>{
        state.error =action.error.message
        state.status = "rejected"
    })
    .addCase(addProperties.fulfilled,(state,action)=>{
        if (action.payload){
         state.property.push(action.payload)
        }
        state.status="success"
    })

  } 
});
export default propertySlice.reducer