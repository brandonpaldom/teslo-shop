import clsx from 'clsx';
import type { ProductSize } from '@/interfaces';

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
          className={clsx(
            'font-semibold text-[0.875rem] decoration-2 underline-offset-4 hover:underline disabled:no-underline disabled:opacity-30',
            { underline: size === selectedSize }
          )}
          disabled={stockQuantity === 0 || !availableSizes.includes(size)}
          key={size}
          onClick={() => onSizeSelection(size)}
          type="button"
        >
          {size}
        </button>
      ))}
    </div>
  );
}
