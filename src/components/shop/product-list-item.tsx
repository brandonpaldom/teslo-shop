import { CartItem } from "@/interfaces";
import { formatCurrency } from "@/utils";
import Image from "next/image";

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
    <div key={product.id} className="flex items-center gap-4">
      <Image
        src={`/products/${product.image}`}
        alt={product.name}
        width={80}
        height={80}
      />
      <div className="flex w-full items-start justify-between gap-4 text-[0.875rem]">
        <div className="grow">
          <h3 className="font-semibold">{product.name}</h3>
          <p>
            Size: <span className="font-semibold">{product.size}</span>
          </p>
          <div className="flex gap-4">
            <p>
              Quantity:{" "}
              <span className="font-semibold">{product.quantity}</span>
            </p>
            {showRemove && (
              <button
                onClick={() => onRemove && onRemove(product.id, product.size)}
                className="underline"
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
