import type { CartItem } from '@/interfaces';
import { formatCurrency } from '@/utils';
import ImagePlaceholder from '../ui/image-placeholder';

interface Props {
  product: CartItem;
  onRemove?: (id: string, size: string) => void;
  showRemove?: boolean;
}

export default function ProductListItem({
  product,
  onRemove,
  showRemove = false,
}: Props) {
  return (
    <div className="flex items-center gap-4" key={product.id}>
      <ImagePlaceholder
        alt={product.name}
        className="rounded-md"
        height={80}
        src={product.image as string}
        width={80}
      />

      <div className="flex w-full items-start justify-between gap-4 text-[0.875rem]">
        <div className="grow">
          <h3 className="font-semibold">{product.name}</h3>
          <p>
            Size: <span className="font-semibold">{product.size}</span>
          </p>
          <div className="flex gap-4">
            <p>
              Quantity:{' '}
              <span className="font-semibold">{product.quantity}</span>
            </p>
            {showRemove && (
              <button
                className="underline"
                onClick={() => onRemove?.(product.id, product.size)}
                type="button"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <p className="font-semibold">{formatCurrency(product.price)}</p>
      </div>
    </div>
  );
}
