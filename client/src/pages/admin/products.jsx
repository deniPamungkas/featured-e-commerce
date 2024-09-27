import AdminProductCard from "@/components/admin/product-card";
import Form from "@/components/common/form";
import { SkeletonCard } from "@/components/common/skeleton-card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/constants";
import { productValidationSchema } from "@/helper/validationSchema";
import {
  addProductThunk,
  deleteProductThunk,
  editProductThunk,
  fetchAllProductThunk,
  imageUploadThunk,
} from "@/store/product-slice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminProducts = () => {
  const initialFormData = useFormik({
    initialValues: {
      image: "",
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      salePrice: "",
      totalStock: "",
      averageReview: 0,
    },
    validationSchema: productValidationSchema,
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [openSideDashboard, setOpenSideDashboard] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  // const [formData, setFormData] = useState(initialFormData.initialValues);
  const { isLoadingProduct } = useSelector((state) => state.product);
  const inputImgRef = useRef(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const uploadForm = new FormData();
  uploadForm.append("file", imageUpload);

  const addProductMutation = useMutation({
    mutationFn: async () => {
      try {
        if (currentEditedId !== null) {
          const result = await dispatch(
            editProductThunk({
              productId: currentEditedId,
              formData: initialFormData.values,
            })
          );
          if (result.payload.data) {
            setCurrentEditedId(null);
            initialFormData.resetForm();
          }
          console.log(result);
          return result;
        }
        const res = await dispatch(imageUploadThunk(uploadForm));
        if (res.payload.data) {
          const response = await dispatch(
            addProductThunk({
              ...initialFormData.values,
              image: res.payload.data.secure_url,
            })
          );
          initialFormData.resetForm();
          uploadForm.delete("file");
          setImageUpload(null);
          if (inputImgRef.current) {
            inputImgRef.current.value = "";
          }
          setOpenSideDashboard(false);
          console.log(response);
          return response;
        }
      } catch (error) {
        console.log(error);
      }
    },
    mutationKey: ["addProductMutation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllProduct"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProductMutation.mutate();
  };

  const handleDeleteProduct = async (id) => {
    try {
      const result = await dispatch(deleteProductThunk(id));
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProduct = useQuery({
    queryFn: async () => {
      try {
        const result = await dispatch(fetchAllProductThunk());
        return result;
      } catch (error) {
        return error;
      }
    },
    queryKey: ["fetchAllProduct"],
  });
  return (
    <div className="">
      <div className="w-full h-fit flex justify-end items-center p-2 md:p-4">
        <Button onClick={() => setOpenSideDashboard((state) => !state)}>
          Add New Product
        </Button>
      </div>
      {isLoadingProduct ? (
        <div className="w-full h-fit grid grid-cols-2 xl:grid-cols-5 md:grid-cols-3 mt-3 gap-2 md:gap-4 p-2 md:p-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="w-full h-fit grid grid-cols-2 xl:grid-cols-5 md:grid-cols-3 mt-3 gap-2 md:gap-4 p-2 md:p-4">
          {fetchAllProduct?.data?.payload ? (
            fetchAllProduct?.data?.payload?.data.map((product) => {
              return (
                <AdminProductCard
                  key={product.title}
                  product={product}
                  handleDelete={handleDeleteProduct}
                  setOpenSideDashboard={setOpenSideDashboard}
                  setFormData={initialFormData.setValues}
                  setCurrentEditedId={setCurrentEditedId}
                />
              );
            })
          ) : (
            <span>failed to load data</span>
          )}
        </div>
      )}
      <Sheet
        open={openSideDashboard}
        onOpenChange={() => setOpenSideDashboard((state) => !state)}
      >
        <SheetContent
          side={"right"}
          className={"w-[300px] lg:w-[400px] overflow-scroll"}
        >
          <SheetHeader className="mb-3">
            <SheetTitle className="text-xl font-bold text-start">
              Add Product
            </SheetTitle>
            <SheetDescription className="text-start text-xs w-full">
              Lorem ipsum dolor sit amet consec adipisicing elit.
            </SheetDescription>
          </SheetHeader>
          <br />
          <Form
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
            formControl={addProductFormElements}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            formData={initialFormData.values}
            setFormData={initialFormData.setValues}
            onSubmit={handleSubmit}
            isLoading={isLoadingProduct}
            inputRef={inputImgRef}
            currentEditedId={currentEditedId}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
