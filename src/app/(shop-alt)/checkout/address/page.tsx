import { Title } from "@/components";
import Link from "next/link";

export default function AddressPage() {
  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="Shipping" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-[768px]">
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            First Name
          </span>
          <input type="text" className="mt-2" />
        </label>
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            Last Name
          </span>
          <input type="text" className="mt-2" />
        </label>
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            Address
          </span>
          <input type="text" className="mt-2" />
        </label>
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            Apartment, suite, etc. (optional)
          </span>
          <input type="text" className="mt-2" />
        </label>
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            Zip Code
          </span>
          <input type="text" className="mt-2" />
        </label>
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            City
          </span>
          <input type="text" className="mt-2" />
        </label>
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            State
          </span>
          <input type="text" className="mt-2" />
        </label>
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            Country
          </span>
          <select name="country" id="country" className="mt-2">
            <option value="">Select a country</option>
            <option value="">United States</option>
            <option value="">Canada</option>
            <option value="">Mexico</option>
          </select>
        </label>
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            Mobile Phone Number
          </span>
          <div className="mt-2 flex items-center gap-2">
            <select name="areaCode" id="areaCode" className="w-fit">
              <option value="+1">+1 (US)</option>
              <option value="+1">+1 (CA)</option>
              <option value="+52">+52 (MX)</option>
            </select>
            <input type="text" placeholder="Enter phone number" />
          </div>
        </label>
      </div>
      <Link href="/checkout" className="btn-lg btn-primary max-w-[320px]">
        Continue to Payment
      </Link>
    </div>
  );
}
