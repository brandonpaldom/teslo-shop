import { EmptyState } from '@/components';

export default function NotFound() {
  return (
    <EmptyState
      message="The category you are looking for does not exist."
      title="Category not found"
    />
  );
}
