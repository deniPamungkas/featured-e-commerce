import Form from "@/components/common/form";
import { registerFormControl } from "@/config/constants";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmitRegister = async (e) => {
    try {
      e.preventDefault();
      const res = await dispatch(registerUser(formData));
      if (res.payload.error) {
        console.log(res);
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: res.payload.error,
        });
        return res;
      }
      toast({
        variant: "success",
        title: "Success register new account",
      });
      navigate("/");
      return res;
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again!",
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Register new account</h1>
        <p>
          already have an account?{" "}
          <Link to={"/auth/login"} className="hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
      <Form
        formControl={registerFormControl}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign Up"}
        onSubmit={handleSubmitRegister}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Register;
