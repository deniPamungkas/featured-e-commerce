import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import proptypes from "prop-types";

const CustomButton = ({
  isLoading,
  buttonText,
  type,
  onClick,
  icon,
  className,
}) => {
  return (
    <Button
      className={`${className} flex justify-center items-center gap-x-2`}
      type={type || "button"}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex gap-x-2 items-center">
          <Loader2 className="animate-spin" /> {"Please Wait"}
        </div>
      ) : (
        <div className="flex justify-center items-center gap-x-2">
          {icon}
          {buttonText || "submit"}
        </div>
      )}
    </Button>
  );
};

CustomButton.propTypes = {
  buttonText: proptypes.string,
  isLoading: proptypes.bool,
  type: proptypes.string,
  className: proptypes.string,
  onClick: proptypes.func,
  icon: proptypes.any,
};

export default CustomButton;
