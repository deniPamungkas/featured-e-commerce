import Form from "@/components/common/form";
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
import { addProductThunk, imageUploadThunk } from "@/store/product-slice";
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
  // const [formData, setFormData] = useState(initialFormData.initialValues);
  const { isLoading } = useSelector((state) => state.product);
  const inputImgRef = useRef(null);
  const dispatch = useDispatch();

  const uploadForm = new FormData();
  uploadForm.append("file", imageUpload);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
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
        console.log(response);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <div className="w-full h-fit flex justify-end items-center">
        <Button onClick={() => setOpenSideDashboard((state) => !state)}>
          Add New Product
        </Button>
      </div>
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
            buttonText="Add"
            formData={initialFormData.values}
            setFormData={initialFormData.setValues}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            inputRef={inputImgRef}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
