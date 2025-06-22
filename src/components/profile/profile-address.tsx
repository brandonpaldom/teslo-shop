"use client";

import { Address, Country } from "@/interfaces";
import Button from "@/components/ui/button";
import { useState } from "react";
import { createAddress, removeAddress } from "@/actions/checkout";
import { useRouter } from "next/navigation";
import AddressForm from "../shop/address-form";
import { useSession } from "next-auth/react";
import { IoHomeOutline, IoTrashOutline, IoPencilOutline } from "react-icons/io5";

interface ProfileAddressProps {
  address: Address | null;
  countries: Country[];
  userId: string;
}

export default function ProfileAddress({ 
  address, 
  countries = [], 
  userId 
}: ProfileAddressProps) {
  // Ensure countries is an array
  const countriesArray = Array.isArray(countries) ? countries : [];
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await removeAddress(userId);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete address:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddressSubmit = async () => {
    setIsEditing(false);
    router.refresh();
  };
  
  // For debugging
  console.log("Countries:", countriesArray);
  console.log("Address:", address);

  if (isEditing) {
    return (
      <div className="bg-white p-6 shadow-sm rounded-lg">
        <h2 className="text-lg font-medium text-neutral-900 mb-4">Edit Address</h2>
        <AddressForm 
          countries={countriesArray} 
          addressData={address || undefined} 
          onSubmitSuccess={handleAddressSubmit}
        />
        <div className="mt-4">
          <Button 
            variant="ghost" 
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-lg font-medium text-neutral-900 mb-4">Shipping Address</h2>
      
      {address ? (
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <IoHomeOutline className="h-5 w-5 text-neutral-500 mr-2" />
              <h3 className="font-medium">Default Address</h3>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <IoPencilOutline className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="danger" 
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <IoTrashOutline className="h-4 w-4 mr-1" />
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 pt-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-sm text-neutral-500">{address.phone}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">{address.address}</p>
                {address.apartment && (
                  <p className="text-sm text-neutral-500">{address.apartment}</p>
                )}
                <p className="text-sm text-neutral-500">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-sm text-neutral-500">
                  {(() => {
                    if (!address.country) return "";
                    
                    const countryObj = countriesArray.find(c => c.id === address.country);
                    if (countryObj) {
                      return typeof countryObj.name === 'string' ? countryObj.name : 'Unknown country';
                    }
                    
                    return typeof address.country === 'string' ? address.country : '';
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-neutral-500 mb-4">No shipping address saved yet.</p>
          <Button 
            variant="primary"
            onClick={() => setIsEditing(true)}
          >
            Add Address
          </Button>
        </div>
      )}
    </div>
  );
}