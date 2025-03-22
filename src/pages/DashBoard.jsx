import React, { useEffect, useState } from "react";
import {
  useAddNewBillMutation,
  useDeleteBillMutation,
  useGetBillsListQuery,
  useLazyGetBillsListQuery,
} from "../redux/dashboard/dashBoardQuery";

import { DataGrid } from "@mui/x-data-grid";
import { balanceIcon, expenseIcon, newBillIcon, salaryIcon } from "../assets";

import moneyGif from "./moneyGif.gif";
import AddNewBill from "./components/AddNewBill";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const [getBillsList, { data, isSuccess, isError }] =
    useLazyGetBillsListQuery();

  const [income, setIncome] = useState(5000);
  const [totalAmount, setTotalAmount] = useState(0);

  const [addNewBill,{isLoading:isAddBillLoading}] = useAddNewBillMutation();

  const [deleteBill,{deletedata,isSuccess:isDeleteBillSuccess,isError:isDeleteBillError}]= useDeleteBillMutation()
  const [addBill, setAddBill] = useState(false);


  const navigate = useNavigate()


  const rows = [{ id: 1, name: "John Doe" }];

  const getBillListData = async () => {
    try {
      const response = await getBillsList();
      console.log(response.isSuccess);

      if (response.isSuccess) {
        const tempTotalamount = response.data?.reduce(
          (prev, cur) =>parseInt(prev)  + parseInt(cur?.amount),
          0
        );

        console.log(tempTotalamount);
        setTotalAmount(tempTotalamount);
      }
    } catch (error) {
      console.log(error);
    }
  };


const deleteBillHandler=async(billId)=>{

console.log(billId)
    try{

        const response =  await deleteBill({billId:billId})
        getBillListData()
console.log(response)
    }catch(error){
        console.log(error)
    }
}


const columns = [
  { field: "sl", headerName: "SL", width: 100 },
  { field: "transaction", headerName: "Transction", width: 300 },
  { field: "date", headerName: "Date", width: 200, renderCell: (date) => 
      new Date(date.value).toLocaleDateString()  },
  { field: "amount", headerName: "Amount", width: 200},
  { field: "note", headerName: "Notes", width: 400},
  { field: "id", headerName: "Delete", width: 200 ,renderCell:(data)=>
  <button
   className=" cursor-pointer"
  onClick={()=>{deleteBillHandler(data?.id)}}
  >Delete</button>
},
];

  useEffect(() => {
    getBillListData();
  }, []);
 


  
  function MyTable() {

    const formattedRows = data?.map((row, index) => ({
        ...row,
        sl: index + 1, 
        id:row?.id
      })) || [];
    return <DataGrid rows={formattedRows}  sortingMode="client"  columns={columns} pageSizeOptions={[5, 10]}  
    
    sx={{
        '& .MuiDataGrid-root': {
          width: 'auto',
        },
      }}/>;
  }

  const addnewBillHandler = async (data) => {

    const body={...data,date: new Date(data.date).getTime() }

    try {
      const response = await addNewBill({ body: body });

      console.log(response);

      setAddBill(false);

      getBillListData();
    } catch (error) {
      console.log(error);
    }
  };


  const navigateHandler=(path)=>{
navigate(`/${path}`)
  }

  return (
    <div className=" p-4 px-10 flex flex-col  gap-4  ">
  
      <div className=" flex justify-between">
        <div className=" w-1/6 flex-col h-[120px] rounded-md bg-[#C6E4FF]   items-start justify-between px-4 ">
          <img src={salaryIcon} className=" w-20" />
          <div className="flex w-full  px-2 justify-between">
            <p className=" font-bold text-lg">Income</p>{" "}
            <p className=" text-lg font-semibold"> Rs/-{income}</p>
          </div>
        </div>

        <div className=" w-1/6 flex-col h-[120px] rounded-md bg-[#C6E4FF]   items-start justify-center px-4 ">
          <img src={expenseIcon} className=" w-20" />
          <div className="flex w-full  px-2 justify-between">
            <p className=" font-bold text-lg">Expenses</p>{" "}
            <p className=" text-lg font-semibold"> Rs/-{totalAmount}</p>
          </div>
        </div>

        <div className=" w-1/6 flex-col h-[120px] rounded-md bg-[#C6E4FF]   items-start justify-between px-4 ">
          <img src={balanceIcon} className="w-20" />
          <div className="flex w-full  px-2 justify-between">
            <p className=" font-bold text-lg">Balance</p>{" "}
            <p className=" text-lg font-semibold">
              {" "}
              Rs/-{income - totalAmount}
            </p>
          </div>
        </div>

        <div
          className=" w-1/6 flex-col cursor-pointer h-[120px] rounded-md bg-[#C6E4FF]   items-start justify-between px-4 "
          onClick={() => {
            setAddBill(true);
          }}
        >
          <img src={newBillIcon} className="w-20" />
          <div className="flex w-full  px-2 justify-between">
            <p className=" font-bold text-lg">Add Bill</p>{" "}
            <p className=" text-lg font-semibold"> + </p>
          </div>
        </div>

        {/* <div>{totalAmount}</div> */}
      </div>


      <div className=" flex justify-between">
      <div className=" px-2 bg-[#C6E4FF] py-2 cursor-pointer flex justify-center items-center  font-semibold text-lg rounded-md w-1/6 "
    
      >Dashboard</div>

        <div className=" px-2 bg-[#C6E4FF] py-2 cursor-pointer flex justify-center items-center  font-semibold text-lg rounded-md w-1/6 "
        onClick={()=>{navigateHandler('statistics')}}
        >Statistics</div>
        </div>
      <MyTable />
      {addBill && (
        <div>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold">New Bill</h2>
              {/* <p className="mt-2 text-gray-600 dark:text-gray-300">
              This is a simple Tailwind CSS modal.
            </p> */}

            {
              
isAddBillLoading  ?
            
          

      <div className=" flex  flex-col items-center justify-center">
        <img src={moneyGif} className=" w-1/6"/>
        <p>Loading</p>
        </div>
         :
              <AddNewBill onsubmiHandler={addnewBillHandler} />
              
              
              
              }

              <div className="mt-4 flex justify-end gap-2">
                {/* <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 cursor-pointer bg-gray-300 text-gray-700 rounded-md"
                >
                  Add
                </button> */}
                <button
                  onClick={() => setAddBill(false)}
                  className="px-4 cursor-pointer py-2 bg-blue-500 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
