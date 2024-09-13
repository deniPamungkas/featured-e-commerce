import { Outlet } from "react-router-dom";
import UserHeader from "./header";

const UserLayout = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col
    "
    >
      <UserHeader />
      <main className="bg-muted/45 w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
