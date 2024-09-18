import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

const AdminLayout = () => {
  const [openSide, setOpenSide] = useState(false);

  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar openSide={openSide} setOpenSide={setOpenSide} />
      <div className="flex flex-col w-full">
        <AdminHeader setOpenSide={setOpenSide} />
        <main className="bg-gray-100 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
