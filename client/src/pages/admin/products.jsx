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
import { useEffect, useRef, useState } from "react";
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
    onSubmit: async () => {
      try {
        const res = await dispatch(imageUploadThunk(uploadForm));
        if (res) {
          const response = await dispatch(addProductThunk(formData));
          setFormData({
            image: "",
            title: "",
            description: "",
            category: "",
            brand: "",
            price: "",
            salePrice: "",
            totalStock: "",
            averageReview: 0,
          });
          uploadForm.delete("file");
          setImageUpload(null);
          if (inputImgRef.current) {
            inputImgRef.current.value = "";
          }
          return response;
        }
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: productValidationSchema,
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [openSideDashboard, setOpenSideDashboard] = useState(false);
  const [formData, setFormData] = useState(initialFormData.initialValues);
  const { isLoading } = useSelector((state) => state.product);
  const inputImgRef = useRef(null);
  const dispatch = useDispatch();

  const uploadForm = new FormData();
  uploadForm.append("file", imageUpload);

  console.log(initialFormData.errors);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, image: imageUpload?.name || "" }));
  }, [imageUpload]);

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
            formData={formData}
            setFormData={setFormData}
            onSubmit={initialFormData.handleSubmit}
            isLoading={isLoading}
            inputRef={inputImgRef}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
