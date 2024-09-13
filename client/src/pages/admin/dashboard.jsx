import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const AdminDashboard = () => {
  const [openSideDashboard, setOpenSideDashboard] = useState(false);
  return (
    <div className="p-3">
      <div className="w-full h-fit flex justify-end items-center">
        <Button onClick={() => setOpenSideDashboard((state) => !state)}>
          Add New Product
        </Button>
      </div>
      <Sheet
        open={openSideDashboard}
        onOpenChange={() => setOpenSideDashboard((state) => !state)}
      >
        <SheetContent side={"right"} className={"w-[300px]"}>
          <SheetHeader className="mb-3">
            <SheetTitle className="text-xl font-bold text-start">
              Add Product
            </SheetTitle>
            <SheetDescription className="text-start text-xs w-full">
              Lorem ipsum dolor sit amet consec adipisicing elit.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminDashboard;
