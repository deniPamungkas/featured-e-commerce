import proptypes from "prop-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const ImageUpload = ({ imageUpload, setImageUpload }) => {
  const inputImgRef = useRef(null);
  const handleInputImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile) setImageUpload(selectedFile);
  };

  const handleRemoveImage = () => {
    setImageUpload(null);
    if (inputImgRef.current) {
      inputImgRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageUpload(droppedFile);
  };

  return (
    <div
      className="flex flex-col gap-y-2"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Label htmlFor="image-upload">Image Upload</Label>
      <Input
        ref={inputImgRef}
        type="file"
        className="hidden"
        id="image-upload"
        onChange={handleInputImageChange}
      />
      {!imageUpload ? (
        <Label htmlFor="image-upload">
          <div className="border-2 border-dashed w-full h-fit flex flex-col items-center justify-center gap-y-6 rounded-lg p-8 text-foreground">
            <UploadCloudIcon size={50} />
            <p>Drag & drop or click image here</p>
          </div>
        </Label>
      ) : (
        <div className="flex items-center justify-between border-dashed rounded-lg border-2">
          <div className="flex items-center">
            <FileIcon className="w-8 text-primary mr-2 h-8" />
          </div>
          <p className="text-sm font-medium">{imageUpload.name}</p>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={handleRemoveImage}
          >
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Remove File</span>
          </Button>
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  imageUpload: proptypes.any,
  setImageUpload: proptypes.any,
  imageUploadUrl: proptypes.any,
  setImageUploadUrl: proptypes.any,
};

export default ImageUpload;
