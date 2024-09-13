import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import CustomButton from "../common/button";
import proptypes from "prop-types";

const AdminHeader = ({ setOpenSide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const handleFormLogout = async (e) => {
    try {
      e.preventDefault();
      const res = await dispatch(logoutUser());
      if (res.payload.error) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: res.payload.error,
        });
      }
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex w-full h-[50px] px-3 border-b">
      <div className="flex-1 flex justify-start items-center">
        <Button
          className="lg:hidden"
          onClick={() => setOpenSide((state) => !state)}
        >
          <Menu />
        </Button>
      </div>
      <div className="flex-1 flex justify-end items-center h-full">
        <CustomButton
          buttonText="Logout"
          onClick={handleFormLogout}
          icon={<LogOut />}
          isLoading={isLoading}
        />
      </div>
    </header>
  );
};

AdminHeader.propTypes = {
  setOpenSide: proptypes.func,
};

export default AdminHeader;
