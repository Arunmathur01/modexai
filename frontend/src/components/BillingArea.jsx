import React from "react";
import { Coins, Crown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/createOrder";
import { verifyPayment } from "../features/verifyPayment";

import fetchCurrentUser from "../App.jsx"




function Billing() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const currentPlan = userData?.plan || "Free";
  const currentCredits = userData?.credits || 100;
  const totalCredits = userData?.totalcredits || 0;

  const creditPercentage =
    totalCredits > 0
      ? Math.min((currentCredits / totalCredits) * 100, 100)
      : 0;

  const handleUpgrade = async(plan) => {

    try{
const data = await createOrder(plan)
const option={
 key:import.meta.env.VITE_RAZORPAY_API_Key,
 amount:data?.order?.amount,
 currency:data?.order?.currency,
 name:"ModexAi",
 description:`${data?.plan?.name} Plan`,
 order_id:data?.order?.id,
 handler:async(response)=>{
   await verifyPayment(response)
     fetchCurrentUser();

 }

}
const razorpay= new window.Razorpay(option)
razorpay.open()
    }catch(error){console.log(error)}
   

    // Call your create order API here
    // createOrder(plan, amount, credits);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#0f1016] text-white">
      <div className="px-5 pt-6 pb-8">

        {/* ================= HEADER ================= */}

        <div className="mb-7 pr-10">
          <h1 className="text-xl font-semibold">
            Billing
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Plans & Credits
          </p>
        </div>

        {/* ================= CURRENT PLAN ================= */}

        <div className="bg-[#151720] border border-gray-800 rounded-xl p-4 mb-5">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-xs text-gray-400 mb-1">
                Current Plan
              </p>

              <h2 className="text-lg font-semibold capitalize">
                {currentPlan}
              </h2>
            </div>

            <Crown
              size={22}
              className="text-yellow-400"
            />
          </div>

          {/* Credits */}

          <div className="mt-5">

            <div className="flex justify-between mb-2">

              <span className="text-xs text-gray-400">
                Credits
              </span>

              <span className="text-xs text-gray-400">
                {currentCredits}/{totalCredits}
              </span>

            </div>

            {/* Progress Bar */}

            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-linear-to-r from-blue-600 to-purple-500 rounded-full transition-all duration-500"
                style={{
                  width: `${creditPercentage}%`,
                }}
              />

            </div>

            {/* Credit Information */}

            <div className="flex justify-between mt-2">

              <span className="text-[11px] text-gray-600">
                {Math.max(
                  totalCredits - currentCredits,
                  0
                )}{" "}
                used
              </span>

              <span className="text-[11px] text-gray-500">
                {currentCredits} remaining
              </span>

            </div>

          </div>
        </div>

        {/* ================= STARTER PLAN ================= */}

       
          <div className="bg-[#151720] border border-gray-800 rounded-xl p-4 mb-4">

            <h3 className="text-sm font-semibold">
              Starter Plan
            </h3>

            <p className="text-2xl font-bold text-blue-400 mt-3">
              ₹199
            </p>

            <div className="flex items-center gap-2 mt-1">

              <Coins
                size={14}
                className="text-yellow-400"
              />

              <span className="text-xs text-gray-400">
                500 Credits
              </span>

            </div>

            <button
              onClick={() =>
                handleUpgrade(
                  "starter"
                 
                )
              }
              className="
                w-full
                mt-4
                py-2.5
                rounded-lg
                bg-linear-to-r
                bg-blue-600 hover:bg-blue-500 
                text-white
                text-sm
                font-medium
                transition
              "
            >
              Upgrade
            </button>

          </div>
       

        {/* ================= PRO PLAN ================= */}

       
          <div className="bg-[#151720] border border-gray-800 rounded-xl p-4">

            <div className="flex items-center justify-between">

              <h3 className="text-sm font-semibold">
                Pro Plan
              </h3>

              <span className="text-[9px] uppercase bg-purple-500/10  text-blue-600 px-2 py-1 rounded-full">
                Popular
              </span>

            </div>

            <p className="text-2xl font-bold  text-blue-400 mt-3">
              ₹499
            </p>

            <div className="flex items-center gap-2 mt-1">

              <Coins
                size={14}
                className="text-yellow-400"
              />

              <span className="text-xs text-gray-400">
                1500 Credits
              </span>

            </div>

            <button
              onClick={() =>
                handleUpgrade(
                  "pro"
                )
              }
              className="
                w-full
                mt-4
                py-2.5
                rounded-lg
                bg-linear-to-r
                bg-blue-600 hover:bg-blue-500 
                text-white
                text-sm
                font-medium
                transition
              "
            >
              Upgrade
            </button>

          </div>
      

      </div>
    </div>
  );
}

export default Billing;