import ImageUpload from "@/components/admin/image-upload";
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
import { useState } from "react";

const initialFormData = {
  image: null,
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
  const [openSideDashboard, setOpenSideDashboard] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUploadUrl, setImageUploadUrl] = useState("");

  const handleAddProduct = (e) => {
    try {
      e.preventDefault();
      console.log(formData);
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
          <ImageUpload
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
            imageUploadUrl={imageUploadUrl}
            setImageUploadUrl={setImageUploadUrl}
          />
          <br />
          <Form
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
