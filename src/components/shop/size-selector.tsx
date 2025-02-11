import { ProductSize } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: ProductSize;
  availableSizes: ProductSize[];
  stockQuantity: number;
  onSizeSelection: (size: ProductSize) => void;
}

export default function SizeSelector({
  selectedSize,
  availableSizes,
  stockQuantity,
  onSizeSelection,
}: Props) {
  return (
    <div className="flex gap-6">
      {availableSizes.map((size) => (
        <button
          key={size}
          onClick={() => onSizeSelection(size)}
          className={clsx(
            "text-[0.875rem] font-semibold decoration-2 underline-offset-4 hover:underline disabled:no-underline disabled:opacity-30",
            { underline: size === selectedSize },
          )}
          disabled={stockQuantity === 0 || !availableSizes.includes(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
