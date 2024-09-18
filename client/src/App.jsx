import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminFeatures from "./pages/admin/features";
import NotFoundPage from "./pages/not-found";
import UserHome from "./pages/user/home";
import UserAccount from "./pages/user/account";
import UserCheckout from "./pages/user/checkout";
import UserListing from "./pages/user/listing";
import UserLayout from "./components/user/layout";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./components/common/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const queryClient = new QueryClient();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return isLoading ? (
    <div>loading</div>
  ) : (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route path="" element={<UserHome />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="checkout" element={<UserCheckout />} />
          <Route path="listing" element={<UserListing />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route
          path="*"
          element={
            <NotFoundPage
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            />
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
