import {
  HousePlug,
  LogIn,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
// import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { shoppingViewHeaderMenuItems } from "@/config/constants";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "@/hooks/use-toast";
import proptypes from "prop-types";
import { fetchCartItems } from "@/store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";

const MenuItems = ({ setOpenSideMenuSheet = null }) => {
  const navigate = useNavigate();

  const handleNavigateCategory = (menuItemId) => {
    if (
      menuItemId !== "products" &&
      menuItemId !== "home" &&
      menuItemId !== "search"
    ) {
      window.sessionStorage.setItem(
        "filters",
        JSON.stringify({ category: [menuItemId] })
      );
    }
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => {
            navigate(menuItem.path);
            handleNavigateCategory(menuItem.id);
            setOpenSideMenuSheet ? setOpenSideMenuSheet(false) : null;
          }}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

MenuItems.propTypes = {
  setOpenSideMenuSheet: proptypes.any,
};

const HeaderRightContent = ({ setOpenSideMenuSheet }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { currentCart } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
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
      setOpenCartSheet(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?._id));
    dispatch(
      fetchAllFilteredProducts({
        filterParams: { category: [], brand: [] },
        sortParams: null,
      })
    );
  }, [dispatch, user]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => {
            setOpenCartSheet(true);
            setOpenSideMenuSheet ? setOpenSideMenuSheet(false) : null;
          }}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {currentCart?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          currentCart={
            currentCart && currentCart.items && currentCart.items.length > 0
              ? currentCart.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-bold text-center">
              {user?.username[0].toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            {isAuthenticated ? `Logged in as ${user?.username}` : "Login"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <div className="flex gap-x-1 items-center">
              <UserCog className="mr-2 h-4 w-4" />
              <p>Account</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={
              isAuthenticated
                ? handleLogout
                : () => {
                    navigate("/auth/login");
                  }
            }
          >
            {isAuthenticated ? (
              <div className="flex gap-x-1 items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <p>Logout</p>
              </div>
            ) : (
              <div className="flex gap-x-1 items-center">
                {" "}
                <LogIn className="mr-2 h-4 w-4" />
                <p>Login</p>
              </div>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

HeaderRightContent.propTypes = {
  setOpenSideMenuSheet: proptypes.any,
};

const ShoppingHeader = () => {
  const [openSideMenuSheet, setOpenSideMenuSheet] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet
          open={openSideMenuSheet}
          onOpenChange={() => setOpenSideMenuSheet(false)}
        >
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpenSideMenuSheet(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle header menu</span>
          </Button>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetHeader className="mb-3">
              <SheetTitle className="text-xl font-bold text-start">
                Navigation Menu
              </SheetTitle>
              <SheetDescription className="text-start text-xs w-full">
                Lorem ipsum dolor sit amet consec adipisicing elit.
              </SheetDescription>
            </SheetHeader>
            <MenuItems setOpenSideMenuSheet={setOpenSideMenuSheet} />
            <HeaderRightContent setOpenSideMenuSheet={setOpenSideMenuSheet} />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
