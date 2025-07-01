interface Props {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  maxQuantity?: number;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  maxQuantity,
}: Props) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (maxQuantity !== undefined && quantity >= maxQuantity) {
      return;
    }

    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex h-8 w-fit items-stretch justify-between gap-4">
      <button
        className={`font-semibold ${
          quantity <= 1 ? 'cursor-not-allowed text-neutral-300' : ''
        }`}
        disabled={quantity <= 1}
        onClick={handleDecrement}
        type="button"
      >
        -
      </button>
      <div className="relative rounded bg-neutral-100 px-4">
        <span className="absolute inset-0 flex items-center justify-center font-semibold text-[0.875rem]">
          {quantity}
        </span>
      </div>
      <button
        className={`font-semibold ${
          maxQuantity && quantity >= maxQuantity
            ? 'cursor-not-allowed text-neutral-300'
            : ''
        }`}
        disabled={maxQuantity !== undefined && quantity >= maxQuantity}
        onClick={handleIncrement}
        type="button"
      >
        +
      </button>
    </div>
  );
}
