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
import axios from "axios";
// import { useFormik } from "formik";
import { useEffect, useState } from "react";

const initialFormData = {
  image: "",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};
const AdminProducts = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [openSideDashboard, setOpenSideDashboard] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  // const [imageUploadUrl, setImageUploadUrl] = useState("");

  const uploadForm = new FormData();
  uploadForm.append("file", imageUpload);

  // console.log(imageUpload.name);

  // console.log(uploadForm.get("file").name);

  // const newProductFrom = useFormik({
  //   initialValues: {
  //     image: null,
  //     title: "",
  //     description: "",
  //     category: "",
  //     brand: "",
  //     price: "",
  //     salePrice: "",
  //     totalStock: "",
  //     averageReview: 0,
  //   },
  // });

  const handleAddProduct = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:3000/upload/image-upload",
        uploadForm,
        { withCredentials: true }
      );
      if (res) {
        const response = await axios.post(
          "http://localhost:3000/upload/add-product",
          formData,
          { withCredentials: true }
        );
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, image: imageUpload?.name || "" }));
  }, [imageUpload]);

  console.log(formData);

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
          {/* <ImageUpload
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
            imageUploadUrl={imageUploadUrl}
            setImageUploadUrl={setImageUploadUrl}
          /> */}
          <br />
          <Form
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
            formControl={addProductFormElements}
            buttonText="Add"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleAddProduct}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
