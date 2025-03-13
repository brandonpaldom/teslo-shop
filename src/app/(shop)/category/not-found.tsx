import { EmptyState } from "@/components";

export default function NotFound() {
  return (
    <EmptyState
      title="Category not found"
      message="The category you are looking for does not exist."
    />
  );
}
