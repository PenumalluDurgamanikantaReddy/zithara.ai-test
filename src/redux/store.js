import { configureStore } from "@reduxjs/toolkit";


import { dashBoardApi } from "./dashboard/dashBoardQuery";

import dashboardSlice from '../redux/dashboard/dashBoardSlice'


const store = configureStore({
    reducer:{
        dashboardSlice:dashboardSlice,
[dashBoardApi.reducerPath] : dashBoardApi.reducer
    },
    middleware:(gDm)=> gDm().concat(
        dashBoardApi.middleware
    )
})

export default store