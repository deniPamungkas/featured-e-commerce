import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex w-full min-h-screen py-3 px-5">
      <div className="hidden lg:flex flex-1 justify-center items-center bg-slate-500">
        <div className="w-fit text-center">
          <h1 className="text-2xl text-white font-bold">
            Welcome to Mern E-Commerce
          </h1>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center p-16">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
