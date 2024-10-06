import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import ShoppingOrderDetailsView from "./order-details";
import {
  getOrderDetails,
  setResetOrderDetails,
} from "@/store/shop/order-slice";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.order);
  const { transactionList } = useSelector((state) => state.transaction);

  console.log(orderList);
  console.log(transactionList);

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  };

  const handlePaymentPrevTransaction = (token) => {
    window.snap.pay(token, {
      onSuccess: function () {},
      onPending: function (result) {
        console.log("pending");
        console.log(result);
      },
      onError: function (result) {
        console.log(result);
      },
      onClose: function () {
        console.log("customer closed the popup without finishing the payment");
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                      <span> </span>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.paymentStatus === "paid"
                            ? "bg-green-500"
                            : ["cancel", "deny", "expire"].includes(
                                orderItem?.paymentStatus
                              )
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(orderItem?.totalAmount)}
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(setResetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => {
                            setOpenDetailsDialog(true);
                            handleFetchOrderDetails(orderItem?._id);
                          }}
                        >
                          View Details
                        </Button>
                        {/* {orderItem?.paymentStatus === "unpaid" ? (
                          <Button
                            onClick={() => {
                              handlePaymentPrevTransaction(
                                transactionList.filter(
                                  (trans) => trans.orderId == orderItem._id
                                )?.[0].transactionToken
                              );
                            }}
                          >
                            Pay now
                          </Button>
                        ) : null} */}
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
