import Form from "@/components/common/form";
import { loginFormControl } from "@/config/constants";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleFormLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await dispatch(loginUser(formData));
      if (res.payload.error || res.error) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: res.payload.error || res.error.message,
        });
        return res;
      }
      dispatch(fetchCartItems(res.payload.user.id));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <p>
          Dont have an account?{" "}
          <Link to={"/auth/register"} className="hover:underline font-semibold">
            Register
          </Link>{" "}
          here
        </p>
      </div>
      <Form
        formControl={loginFormControl}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Login"}
        onSubmit={handleFormLogin}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Login;
