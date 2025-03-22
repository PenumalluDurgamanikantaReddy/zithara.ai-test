


import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

function Statastics() {


    const data = useSelector((state)=> state.dashboardSlice.bills)
    const pieChartData = data?.map((eachBill)=>{

      return {name:eachBill.transaction,value:eachBill.amount}
    })
  const [income, setIncome] = useState(50000);

    const totalExpenditureAmount = data.reduce((prev,curr)=> prev+curr?.amount,0)
    
    // [
    //     { name: "Food", value: 4000 },
    //     { name: "Transport", value: 3000 },
    //     { name: "Rent", value: 5000 },
    //     { name: "Shopping", value: 2000 },
    //   ];



      const barChartData = data.map(row => ({
        name: row.transaction,
        amount: row.amount,
      }));


  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

      console.log(barChartData)
  return (
    <div className=' flex flex-col  items-centerjustify-center p-6'>
      
      <div>

        <p className='  text-3xl   font-bold'>Statastics - Expenditure</p>
      </div>

    <div className=' flex w-full justify-between items-center  px-4'>
<div className="flex  flex-col    justify-center">
        <BarChart width={500} height={300} data={[...barChartData,{name:"Balance",amount:income - totalExpenditureAmount}]}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
        <div className=' flex'><p className=' font-semibold text-lg'>Total Income:</p><p className=' font-semibold text-lg'>{income}</p></div>

        <div className=' flex'><p className=' font-semibold text-lg'>Total Expenditure:</p><p className=' font-semibold text-lg'>{totalExpenditureAmount}</p></div>
        <div className=' flex'><p className=' font-semibold text-lg'>Balance Amount:</p><p className=' font-semibold text-lg'>{totalExpenditureAmount-income}</p></div>


      
      </div>

      {/* Pie Chart */}
      <div className="flex flex-col  justify-center">
        <PieChart width={400} height={300}>
          <Pie data={[...pieChartData,{name:"Balance",value:income - totalExpenditureAmount}]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
        <div className=' flex'><p className=' font-semibold text-lg'>Total Income:</p><p className=' font-semibold text-lg'>{income}</p></div>

        <div className=' flex'><p className=' font-semibold text-lg'>Total Expenditure:</p><p className=' font-semibold text-lg'>{totalExpenditureAmount}</p></div>
        <div className=' flex'><p className=' font-semibold text-lg'>Balance Amount:</p><p className=' font-semibold text-lg'>{income-totalExpenditureAmount}</p></div>
      </div>



      </div>
    </div>
  )
}

export default Statastics