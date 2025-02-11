import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: boolean;
}

export default function PaymentStatus({ isPaid }: Props) {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg p-4 text-[0.875rem] font-semibold",
        isPaid ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800",
      )}
    >
      <IoCardOutline className="mr-3 inline h-5 w-5 shrink-0" />
      <span>{isPaid ? "Order paid" : "Pending payment"}</span>
    </div>
  );
}
