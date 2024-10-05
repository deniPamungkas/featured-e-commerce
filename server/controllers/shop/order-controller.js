// const paypal = require("../../helpers/paypal");
import OrderSchema from "../../models/order.js";
import CartSchema from "../../models/cart.js";
import ProductSchema from "../../models/product.js";
import midtransClient from "midtrans-client";
import keys from "../../config/keys.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      customer_details,
      orderDate,
    } = req.body;

    const newlyCreatedOrder = new OrderSchema({
      userId,
      cartId,
      cartItems,
      addressInfo,
      customer_details,
      orderDate,
      orderStatus: "pending",
      paymentStatus: "unpaid",
      totalAmount: cartItems.reduce(
        (acc, value) => acc + value.price * value.quantity,
        0
      ),
    });

    const { midtransSecret, midtransClientSecret } = keys;

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: midtransSecret,
      clientKey: midtransClientSecret,
    });

    let parameter = {
      transaction_details: {
        order_id: newlyCreatedOrder._id,
        gross_amount: newlyCreatedOrder.cartItems.reduce(
          (acc, value) => acc + value.price * value.quantity,
          0
        ),
      },
      item_details: cartItems,
      customer_details,
      orderDate,
    };

    snap.createTransaction(parameter).then(async (transaction) => {
      await newlyCreatedOrder.save();
      return res.status(201).json({
        success: true,
        data: newlyCreatedOrder,
        transaction,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const capturePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    let order = await OrderSchema.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";

    for (let item of order.cartItems) {
      let product = await ProductSchema.findById(item.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await CartSchema.findByIdAndDelete(getCartId);

    await order.save();

    console.log(order);

    return res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    return res.status(555).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const failedPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    let order = await OrderSchema.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "expired";
    order.orderStatus = "rejected";

    const getCartId = order.cartId;
    await CartSchema.findByIdAndDelete(getCartId);

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order failed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await OrderSchema.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderSchema.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateStatusBasedOnMistransResponse = async (transaction_id, data) => {
  let responseData = null;
  let transactionStatus = data.transaction_status;
  let fraudStatus = data.fraud_status;

  if (transactionStatus == "capture") {
    if (fraudStatus == "accept") {
      const { order_id } = req.body;

      let order = await OrderSchema.findById(order_id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order can not be found",
        });
      }

      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";

      for (let item of order.cartItems) {
        let product = await ProductSchema.findById(item.id);

        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Not enough stock for this product ${product.title}`,
          });
        }

        product.totalStock -= item.quantity;

        await product.save();
      }

      const getCartId = order.cartId;
      await CartSchema.findByIdAndDelete(getCartId);

      await order.save();

      return res.status(200).json({
        message: "success",
        data: order,
      });
    }
  } else if (transactionStatus == "settlement") {
    // TODO set transaction status on your database to 'success'
    // and response with 200 OK
  } else if (
    transactionStatus == "cancel" ||
    transactionStatus == "deny" ||
    transactionStatus == "expire"
  ) {
    // TODO set transaction status on your database to 'failure'
    // and response with 200 OK
  } else if (transactionStatus == "pending") {
    // TODO set transaction status on your database to 'pending' / waiting payment
    // and response with 200 OK
  }
};

export const trxNotif = async (req, res) => {
  const data = req.body;

  updateStatusBasedOnMistransResponse(data.transaction_id, data);

  return res.status(200).json({
    success: true,
    message: "payment status notification",
  });
};
