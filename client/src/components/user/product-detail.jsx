import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { setProductDetails } from "@/store/shop/product-slice";
import { DialogTitle } from "@radix-ui/react-dialog";
import proptypes from "prop-types";
import {
  addProductReview,
  getProductReview,
  setReviews,
} from "@/store/shop/review-slice";
import StarRatingComponent from "../common/star-rating";
import CustomButton from "../common/button";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentCart, isLoadingCart } = useSelector((state) => state.shopCart);

  //   const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews, isLoading } = useSelector((state) => state.productReview);

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddtoCart = async (getCurrentProductId, getTotalStock) => {
    try {
      let getCartItems = currentCart.items || [];

      if (getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(
          (item) => item.productId === getCurrentProductId
        );
        if (indexOfCurrentItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }

      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then(async (data) => {
        if (data?.payload?.success) {
          await dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product is added to cart",
          });
        }
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "failed to add product, please try again",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    dispatch(setReviews());
    setRating(0);
    setReviewMsg("");
  };

  const handleAddReview = async () => {
    try {
      const result = await dispatch(
        addProductReview({
          productId: productDetails?._id,
          userId: user?.id,
          userName: user?.username,
          reviewMessage: reviewMsg,
          reviewValue: rating,
        })
      );

      console.log(result);
      if (result.payload.data) {
        setRating(0);
        setReviewMsg("");
        dispatch(getProductReview(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
        return;
      }
      if (result.error) {
        toast({
          variant: "destructive",
          title:
            result.payload == "Unauthorized"
              ? "Not Logged In"
              : result.payload.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong, please try again",
      });
    }
  };

  useEffect(() => {
    if (productDetails !== null)
      dispatch(getProductReview(productDetails?._id));
  }, [productDetails, dispatch]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold">
              {productDetails?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              {averageReview.toFixed(2)}
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <CustomButton
                isLoading={isLoadingCart}
                className="w-full"
                buttonText="Add To Cart"
                onClick={() =>
                  handleAddtoCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              />
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem._id} className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <CustomButton
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                buttonText="Submit"
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ProductDetailsDialog.propTypes = {
  open: proptypes.bool,
  setOpen: proptypes.any,
  productDetails: proptypes.object,
};

export default ProductDetailsDialog;
