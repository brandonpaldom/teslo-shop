'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  IoHomeOutline,
  IoPencilOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import { removeAddress } from '@/actions/checkout';
import Button from '@/components/ui/button';
import type { Address, Country } from '@/interfaces';
import AddressForm from '../shop/address-form';

interface ProfileAddressProps {
  address: Address | null;
  countries: Country[];
  userId: string;
}

export default function ProfileAddress({
  address,
  countries = [],
  userId,
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
    } catch (_error) {
      // Error handling could be added here if needed
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddressSubmit = () => {
    setIsEditing(false);
    router.refresh();
  };

  if (isEditing) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-medium text-lg text-neutral-900">
          Edit Address
        </h2>
        <AddressForm
          addressData={address || undefined}
          countries={countriesArray}
          onSubmitSuccess={handleAddressSubmit}
        />
        <div className="mt-4">
          <Button onClick={() => setIsEditing(false)} variant="ghost">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-medium text-lg text-neutral-900">
        Shipping Address
      </h2>

      {address ? (
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <IoHomeOutline className="mr-2 h-5 w-5 text-neutral-500" />
              <h3 className="font-medium">Default Address</h3>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsEditing(true)}
                size="sm"
                variant="ghost"
              >
                <IoPencilOutline className="mr-1 h-4 w-4" />
                Edit
              </Button>
              <Button
                disabled={isDeleting}
                onClick={handleDelete}
                size="sm"
                variant="danger"
              >
                <IoTrashOutline className="mr-1 h-4 w-4" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>

          <div className="border-neutral-200 border-t pt-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <p className="font-medium text-neutral-700 text-sm">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-neutral-500 text-sm">{address.phone}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">{address.address}</p>
                {address.apartment && (
                  <p className="text-neutral-500 text-sm">
                    {address.apartment}
                  </p>
                )}
                <p className="text-neutral-500 text-sm">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-neutral-500 text-sm">
                  {(() => {
                    if (!address.country) {
                      return '';
                    }

                    const countryObj = countriesArray.find(
                      (c) => c.id === address.country
                    );
                    if (countryObj) {
                      return typeof countryObj.name === 'string'
                        ? countryObj.name
                        : 'Unknown country';
                    }

                    return typeof address.country === 'string'
                      ? address.country
                      : '';
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="mb-4 text-neutral-500">
            No shipping address saved yet.
          </p>
          <Button onClick={() => setIsEditing(true)} variant="primary">
            Add Address
          </Button>
        </div>
      )}
    </div>
  );
}
