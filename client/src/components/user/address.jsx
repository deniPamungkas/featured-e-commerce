import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
// import {
//   addNewAddress,
//   deleteAddress,
//   editaAddress,
//   fetchAllAddresses,
// } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "@/hooks/use-toast";
import Form from "../common/form";
import {
  addNewAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from "@/store/shop/address-slice";
import { addressFormControls } from "@/config/constants";
import { useFormik } from "formik";
import proptypes from "prop-types";

// const initialAddressFormData = {
//   address: "",
//   city: "",
//   phone: "",
//   pincode: "",
//   notes: "",
// };

const Address = ({ setCurrentSelectedAddress, selectedId }) => {
  //   const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList, isLoadingAddress } = useSelector(
    (state) => state.address
  );

  const initialFormData = useFormik({
    initialValues: {
      address: "",
      city: "",
      phone: "",
      pincode: "",
      notes: "",
    },
  });
  //   const { toast } = useToast();

  const handleAddAddress = (event) => {
    event.preventDefault();

    if (addressList.length >= 4 && currentEditedId === null) {
      initialFormData.resetForm();
      toast({
        title: "You can add max 4 addresses",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          updateAddress({
            userId: user?._id,
            addressId: currentEditedId,
            formData: initialFormData.values,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAddresses(user?._id));
            setCurrentEditedId(null);
            initialFormData.resetForm();
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...initialFormData.values,
            userId: user?._id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAddresses(user?._id));
            initialFormData.resetForm();
            toast({
              title: "Address added successfully",
            });
          }
        });
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({ userId: user?._id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddresses(user?._id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  };

  const handleEditAddress = (getCuurentAddress) => {
    setCurrentEditedId(getCuurentAddress?._id);
    initialFormData.setValues({
      ...initialFormData.values,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  };

  //   function isFormValid() {
  //     return Object.keys(formData)
  //       .map((key) => formData[key].trim() !== "")
  //       .every((item) => item);
  //   }

  useEffect(() => {
    dispatch(fetchAddresses(user?._id));
  }, [dispatch, user]);

  console.log(addressList);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))
        ) : (
          <AddressCard />
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          formControl={addressFormControls}
          formData={initialFormData.values}
          setFormData={initialFormData.setValues}
          onSubmit={handleAddAddress}
          isLoading={isLoadingAddress}
        />
      </CardContent>
    </Card>
  );
};

Address.propTypes = {
  setCurrentSelectedAddress: proptypes.any,
  selectedId: proptypes.any,
};

export default Address;
