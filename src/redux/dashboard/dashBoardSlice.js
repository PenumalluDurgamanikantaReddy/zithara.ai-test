



import { createSlice } from "@reduxjs/toolkit";
import { dashBoardApi } from "./dashBoardQuery";




const dashboardSlice = createSlice({
    name:"dashboardSlice",
    initialState:{
      bills:[]

    },extraReducers:(builder)=>{


      builder
      .addMatcher(
        dashBoardApi.endpoints.getBillsList.matchPending, (state,{payload}) => {
            // state.loading = true
         })
         builder
         .addMatcher(
           dashBoardApi.endpoints.getBillsList.matchFulfilled, (state,{payload}) => {
            // state.loading = true
            state.bills = payload
            console.log(payload)
         })
         builder
         .addMatcher(
           dashBoardApi.endpoints.getBillsList.matchRejected, (state,{payload}) => {
            // state.loading = true
         })

    }
})

export default dashboardSlice.reducer