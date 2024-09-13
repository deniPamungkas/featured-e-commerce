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

const Form = ({
  formControl,
  formData,
  setFormData,
  buttonText,
  onSubmit,
  isLoading,
}) => {
  const inputType = {
    INPUT: "input",
    SELECT: "select",
    TEXTAREA: "textarea",
  };

  const renderInputByComponentType = (formType) => {
    let element;
    const value = formData[formType.name] || "";

    switch (formType.componentType) {
      case inputType.INPUT:
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

      case inputType.SELECT:
        element = (
          <Select
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
};

export default Form;
