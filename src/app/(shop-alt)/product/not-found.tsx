import { EmptyState } from "@/components";

export default function NotFound() {
  return (
    <EmptyState
      title="Product not found"
      message="The product you are looking for does not exist."
    />
  );
}
