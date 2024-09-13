import {
  ChartNoAxesCombined,
  LayoutDashboard,
  PackageCheck,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import proptypes from "prop-types";

const SideMenu = ({ setOpenSide }) => {
  const navigate = useNavigate();
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <PackageCheck />,
    },
  ];

  return (
    <nav className="w-full h-fit flex flex-col gap-y-2 text-base">
      {menuItems.map((item) => {
        return (
          <div
            key={item.id}
            className="lg:px-8 h-[50px] flex items-center gap-x-2 font-semibold text-gray-600 hover:bg-muted hover:text-foreground cursor-pointer"
            onClick={() => {
              navigate(item.path);
              setOpenSide((state) => !state);
            }}
          >
            {item.icon}
            {item.label}
          </div>
        );
      })}
    </nav>
  );
};

const AdminSidebar = ({ openSide, setOpenSide }) => {
  return (
    <>
      <aside className="hidden w-[280px] border-r lg:flex flex-col py-5">
        <div className="flex justify-start items-center gap-x-2 px-8 mb-6">
          <ChartNoAxesCombined size={25} />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <SideMenu />
      </aside>
      <Sheet
        open={openSide}
        onOpenChange={() => setOpenSide((state) => !state)}
      >
        <SheetContent side={"left"} className={"w-[250px]"}>
          <SheetHeader className="mb-3">
            <SheetTitle className="text-xl font-bold text-start">
              Admin Panel
            </SheetTitle>
            <SheetDescription className="text-start text-xs w-full">
              Lorem ipsum dolor sit amet consec adipisicing elit.
            </SheetDescription>
          </SheetHeader>
          <SideMenu setOpenSide={setOpenSide} />
        </SheetContent>
      </Sheet>
    </>
  );
};

SideMenu.propTypes = {
  setOpenSide: proptypes.func,
};

AdminSidebar.propTypes = {
  openSide: proptypes.bool,
  setOpenSide: proptypes.any,
};

export default AdminSidebar;
