


import {createApi} from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../config/service'



export const dashBoardApi = createApi({
    reducerPath:"dashBoardApi",
    baseQuery:axiosBaseQuery(),
//     responseHandler:async(response)=>{

//         if(!response.ok){
//             const error = await response.json()

//              return Promise.reject(error)
//         }
// return response.json()

// },
endpoints:(builder)=>({

    getBillsList:builder.query({
        query:()=>{


            return{
                url:'personalfinance',
                method:"GET"
            }
        }
    }),
    addNewBill:builder.mutation({

        query:({body})=>{

            return{

                url:'personalfinance',
                method:"POST",
                data:body
            }
        }
    }),
    deleteBill:builder.mutation({
        query:({billId})=>{


            return{
                url:`personalfinance/${billId}`,
                method:"DELETE"
            }
        }
    })


})
})


export const {useGetBillsListQuery,useLazyGetBillsListQuery,useAddNewBillMutation,useDeleteBillMutation} = dashBoardApi
