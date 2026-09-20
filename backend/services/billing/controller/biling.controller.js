// import plans from "../config/plan.js"


// const billing = async(req,res)=>{
// try{
//     const {userId}=req.headers['x-user-id']
//     const {plan}= req.body
//     const selectedplan=plans[plan] 
//     if(!selectedplan){
//         return res.status(404).json({message:"plan not found"})
//     }
// }catch(error){
       
// }
   
// }


import crypto from "crypto";
import { payment } from "../models/payment.model.js";
import plans from "../config/plan.js"
import axios from "axios";
import { razorpay } from "../config/razorpay.js";
// ==========================================
// CREATE ORDER
// ==========================================

export const createOrder = async (req, res) => {
  try {
    const userId = req.headers['x-user-id']

    const { plan } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // const selectedPlan=plans[plan] 
      const selectedPlan = plans.find(
      (item) => item.id === plan
    );


    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    // Free plan doesn't need Razorpay
    if (selectedPlan.amount === 0) {
      return res.status(400).json({
        success: false,
        message: "Free plan does not require payment",
      });
    }

    

    const order = await razorpay.orders.create({
      amount: selectedPlan.amount * 100,
      currency: "INR",
      receipt: `receipt_${userId}_${Date.now()}`,
    });

    // Store payment in database
    const newPayment = await payment.create({
      userId: userId.toString(),
      orderId: order.id,
      amount: selectedPlan.amount,
      currency: "INR",
      credits: selectedPlan.credits,
      plan: selectedPlan.name,
      status: "created",
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
      plan: selectedPlan
      
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

// ==========================================
// VERIFY PAYMENT
// ==========================================

export const verifyPayment = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are required",
      });
    }

    // 1. Generate signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.Test_Key_Secret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // 2. Verify signature
    if (generatedSignature !== razorpay_signature) {
      await payment.findOneAndUpdate(
        {
          orderId: razorpay_order_id,
          userId: userId.toString(),
        },
        {
          status: "failed",
        }
      );

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // 3. Find payment record
    const existingPayment = await payment.findOne({
      orderId: razorpay_order_id,
      userId: userId.toString(),
    });

    if (!existingPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // 4. Prevent duplicate processing
    if (existingPayment.status === "paid") {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
        payment: existingPayment,
      });
    }

    // 5. Update payment
    existingPayment.paymentId = razorpay_payment_id;
    existingPayment.status = "paid";

    await existingPayment.save();

    // 6. Update user's plan and credits
    await axios.post(
      `${process.env.AUTH_SERVICE_URL}/update-plan`,
      {
        userId: existingPayment.userId,
        plan: existingPayment.plan,
        credits: existingPayment.credits,
      }
    );

    // 7. Response
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment: existingPayment,
      credits: existingPayment.credits,
    });

  } catch (error) {
    console.error("========== VERIFY PAYMENT ERROR ==========");
    console.error(error);
    console.error("==========================================");

    return res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error.message, // temporarily useful for debugging
    });
  }
};
// ==========================================
// PAYMENT FAILED
// ==========================================

export const paymentFailed = async (req, res) => {
  try {
    const userId = req.headers['x-user-id']

    const { orderId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedPayment = await payment.findOneAndUpdate(
      {
        orderId,
        userId: userId.toString(),
      },
      {
        status: "failed",
      },
      {
        new: true,
      }
    );

    if (!updatedPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment marked as failed",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("PAYMENT FAILED ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update payment",
    });
  }
};

// ==========================================
// GET USER PAYMENT HISTORY
// ==========================================

export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const payments = await payment
      .find({
        userId: userId.toString(),
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("PAYMENT HISTORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get payment history",
    });
  }
};