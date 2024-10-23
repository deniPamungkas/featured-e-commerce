import OrderSchema from "../../models/order.js";

export const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await OrderSchema.find({});

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

export const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderSchema.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await OrderSchema.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    const updatedOrder = await OrderSchema.findByIdAndUpdate(id, {
      orderStatus,
    });

    res.status(200).json({
      data: updatedOrder,
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
