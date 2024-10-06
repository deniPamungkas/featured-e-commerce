import Address from "@/components/user/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import UserCartItemsContent from "@/components/user/cart-item";
import { createOrder, failedPayment } from "@/store/shop/order-slice";
import { createTransaction } from "@/store/shop/transaction-slice";

const ShoppingCheckout = () => {
  const { currentCart } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();

  const totalCartAmount =
    currentCart && currentCart.items && currentCart.items.length > 0
      ? currentCart.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handleInitiatePaypalPayment = () => {
    if (currentCart.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?._id,
      cartId: currentCart?._id,
      cartItems: currentCart.items.map((singleCartItem) => ({
        id: singleCartItem?.productId,
        name: singleCartItem?.title,
        url: singleCartItem?.image,
        price:
          (singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price) * 15000,
        quantity: singleCartItem?.quantity,
        merchant_name: "denip",
        brand: singleCartItem?.brand,
        category: singleCartItem?.category,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      customer_details: {
        first_name: user?.username,
        last_name: "",
        email: user?.email,
        phone: "08111222333",
      },
      orderDate: new Date(),
    };

    dispatch(createOrder(orderData)).then((data) => {
      if (data?.payload?.transaction?.token) {
        dispatch(
          createTransaction({
            userId: user._id,
            orderId: data?.payload?.data?._id,
            transactionToken: data?.payload?.transaction?.token,
          })
        );
        window.snap.pay(data?.payload?.transaction?.token, {
          onSuccess: function () {},
          onPending: function (result) {
            console.log("pending");
            console.log(result);
          },
          onError: function (result) {
            dispatch(failedPayment(data?.payload?.data?._id));
            console.log(result);
          },
          onClose: function () {
            console.log(
              "customer closed the popup without finishing the payment"
            );
          },
        });
      }
    });
  };

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = "SB-Mid-client-yINSLtT_zGlQkfZc";
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {currentCart && currentCart.items && currentCart.items.length > 0
            ? currentCart.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Midtrans Payment..."
                : "Checkout with Midtrans"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
