import CartSchema from "../../models/cart.js";
import ProductSchema from "../../models/product.js";
import userSchema from "../../models/user.js";

export const addTocart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not Logged In",
      });
    }

    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (quantity <= 0) {
      return res.status(401).json({
        success: false,
        message: "Quantity must be minimum one item",
      });
    }

    const product = await ProductSchema.findById(productId);

    if (!product) {
      return res.status(401).json({
        success: false,
        message: "Product not exist",
      });
    }

    let cart = await CartSchema.findOne({ userId });

    if (!cart) {
      cart = new CartSchema({ userId, items: [] });
    }

    const findCurrentProductInCart = cart.items.findIndex((item) => {
      return item.productId == productId;
    });

    if (findCurrentProductInCart == -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductInCart].quantity += quantity;
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Success adding item to cart",
      data: cart,
    });
  } catch (error) {
    console.log(error, "addTocart");
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again",
    });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await CartSchema.findOne({ userId }).populate({
      path: "items.productId",
      select: "salePrice price image title",
    });

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "cart not found",
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error, "fetchCartItems");
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again",
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await CartSchema.findOne({ userId });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "cart not found",
      });
    }

    const isItemExist = cart.items.filter(
      (item) => item.productId.toString() == productId
    );

    if (!isItemExist.length) {
      return res.status(404).json({
        success: false,
        message: "item is not on the cart",
      });
    }

    cart.items = cart.items.filter((item) => {
      return item.productId.toString() !== productId;
    });

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image salePrice price title",
    });

    const populatedCart = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      message: "successfully delete item",
      data: { ...cart._doc, items: populatedCart },
    });
  } catch (error) {
    console.log(error, "deleteCartItem");
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again",
    });
  }
};

export const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await CartSchema.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error, "updateCartItemQty");
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
