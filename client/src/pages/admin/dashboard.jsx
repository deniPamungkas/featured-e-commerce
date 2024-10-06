import Form from "@/components/common/form";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { imageUploadThunk } from "@/store/product-slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const dispatch = useDispatch();
  const { featureImageList, isLoading } = useSelector((state) => state.common);
  const { isLoadingProduct } = useSelector((state) => state.product);
  const inputImgRef = useRef(null);

  const addProductFormElements = [
    {
      label: "Image Upload",
      name: "image-upload",
      componentType: "input",
      type: "file",
      placeholder: "Drag & drop or click to upload image",
    },
  ];

  const formData = {};

  const uploadForm = new FormData();
  uploadForm.append("file", imageUpload);

  const handleUploadFeatureImage = async () => {
    try {
      const res = await dispatch(imageUploadThunk(uploadForm));
      if (res.payload.data) {
        const response = await dispatch(
          addFeatureImage(res.payload.data.secure_url)
        );
        dispatch(getFeatureImages());
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

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="p-2 md:p-4">
      <Form
        formControl={addProductFormElements}
        imageUpload={imageUpload}
        setImageUpload={setImageUpload}
        formData={formData}
        inputRef={inputImgRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleUploadFeatureImage();
        }}
        isLoading={isLoading || isLoadingProduct}
        currentEditedId={null}
        buttonText="Submit"
      />
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div
                key={featureImageList.indexOf(featureImgItem)}
                className="relative"
              >
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
