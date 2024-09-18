import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import proptypes from "prop-types";

function AdminProductCard({
  product,
  setFormData,
  setOpenSideDashboard,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-[180px] xl:w-[210px] md:w-[230px] m-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[150px] md:h-[200px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenSideDashboard(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => (handleDelete ? handleDelete(product?._id) : null)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

AdminProductCard.propTypes = {
  product: proptypes.any,
  setFormData: proptypes.any,
  setOpenSideDashboard: proptypes.any,
  setCurrentEditedId: proptypes.any,
  handleDelete: proptypes.any,
};

export default AdminProductCard;
