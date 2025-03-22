

import React,{lazy} from "react";



const DashBoard =  lazy(()=>import('../pages/DashBoard'))


const Statistics = lazy(()=>import('../pages/charts/Statistics'))



const routes = [
    {
path:"",
element:<DashBoard/>
},
{
    path:"/dashboard",
    element:<DashBoard/>
    },
    {
        path:"/statistics",
        element:<Statistics/>
        },

]


export default routes