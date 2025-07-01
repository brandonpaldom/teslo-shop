import { EmptyState } from '@/components';

export default function NotFound() {
  return (
    <EmptyState
      message="The product you are looking for does not exist."
      title="Product not found"
    />
  );
}
