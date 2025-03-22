import { useForm } from "react-hook-form";

export default function AddNewBill({onsubmiHandler}) {


  const { register, handleSubmit, watch, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);

  console.log(watch("example")); 



  return (
    <form onSubmit={handleSubmit(onsubmiHandler)} className=" flex flex-col  gap-2 ">

        <div className=" flex flex-col">
            <label>Transaction</label>
      <input   name='transaction' className="px-1 py-2 border border-slate-300 rounded-md" {...register("transaction",{ required: true })} placeholder="Enter transaction name" />
      {errors.transaction && <span>This field is required</span>}
      </div>

      <div className=" flex flex-col">
            <label>Amount</label>
      <input   name='amount'  type="number" className="px-1 py-2 border border-slate-300 rounded-md" {...register("amount",{ required: true,valueAsNumber: true })} placeholder="Enter Amount name" />
      {errors.amount && <span>This field is required</span>}
      </div>


      <div className=" flex flex-col">
            <label>Date</label>
      <input type="date"  className="px-1 py-2 border border-slate-300 rounded-md"  name='date' {...register("date",{ required: true })} placeholder="Enter Date name" />
      {errors.date && <span>This field is required</span>}
      </div>


      <div className=" flex flex-col">
            <label>Note</label>
      <input  type="string "  className="px-1 py-2 border border-slate-300 rounded-md"  name='note' {...register("note",{ required: true })} placeholder="Enter Note name" />
      {errors.note && <span>This field is required</span>}
      </div>


      {/* <input {...register("exampleRequired", { required: true })} /> */}
      
      
      <input type="submit"  className="cursor-pointer  bg-[#C6E4FF]  px-2 py-2  rounded-md"/>
    </form>
  );
}