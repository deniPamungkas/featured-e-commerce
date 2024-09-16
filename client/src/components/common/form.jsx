import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import proptypes from "prop-types";
import { Label } from "../ui/label";
import CustomButton from "./button";
import { useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const Form = ({
  formControl,
  formData,
  setFormData,
  buttonText,
  onSubmit,
  isLoading,
  imageUpload,
  setImageUpload,
}) => {
  const inputType = {
    INPUT: "input",
    SELECT: "select",
    TEXTAREA: "textarea",
    FILE: "file",
  };

  const inputImgRef = useRef(null);

  const handleInputImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
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

  const renderInputByComponentType = (formType) => {
    let element;
    const value = formData[formType.name] || "";

    switch (formType.componentType) {
      case inputType.INPUT:
        if (formType.type === "file") {
          element = (
            <div
              className="flex flex-col gap-y-2"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Input
                required
                ref={inputImgRef}
                type={formType.type}
                className="hidden"
                id={formType.name}
                onChange={handleInputImageChange}
              />
              {!imageUpload ? (
                <Label htmlFor={formType.name}>
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
        } else {
          element = (
            <Input
              className="outline-none"
              required
              type={formType.type}
              name={formType.name}
              placeholder={formType.placeholder}
              id={formType.name}
              value={value}
              onChange={(e) => {
                setFormData({ ...formData, [formType.name]: e.target.value });
              }}
            />
          );
        }
        break;

      case inputType.SELECT:
        element = (
          <Select
            required
            value={value}
            onValueChange={(value) => {
              setFormData({ ...formData, [formType.name]: value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={formType.label} />
            </SelectTrigger>
            <SelectContent>
              {formType.options && formType.options.length > 0
                ? formType.options.map((item) => {
                    return (
                      <SelectItem key={item.id} value={item.id}>
                        {item.label}
                      </SelectItem>
                    );
                  })
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case inputType.TEXTAREA:
        element = (
          <Textarea
            required
            value={value}
            type={formType.type}
            name={formType.name}
            placeholder={formType.placeholder}
            onChange={(e) => {
              setFormData({ ...formData, [formType.name]: e.target.value });
            }}
          />
        );
        break;

      default:
        element = (
          <Input
            className="outline-none"
            required
            type={formType.type}
            name={formType.name}
            placeholder={formType.placeholder}
            id={formType.name}
            value={value}
            onChange={(e) => {
              setFormData({ ...formData, [formType.name]: e.target.value });
            }}
          />
        );
        break;
    }
    return element;
  };
  return (
    <form
      action=""
      className="w-full flex flex-col space-y-3"
      onSubmit={onSubmit}
      encType="multipart/form-data"
    >
      <div className="flex flex-col gap-y-4">
        {formControl.map((formItem) => {
          return (
            <div key={formItem.name} className="flex flex-col gap-y-2">
              <Label>{formItem.label}</Label>
              {renderInputByComponentType(formItem)}
            </div>
          );
        })}
      </div>
      <CustomButton
        isLoading={isLoading}
        type="submit"
        buttonText={buttonText}
      />
    </form>
  );
};

Form.propTypes = {
  formControl: proptypes.array,
  formData: proptypes.object,
  buttonText: proptypes.string,
  onSubmit: proptypes.func,
  setFormData: proptypes.any,
  isLoading: proptypes.bool,
  imageUpload: proptypes.any,
  setImageUpload: proptypes.any,
};

export default Form;
