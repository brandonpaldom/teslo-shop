'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { IoCamera, IoPersonCircleOutline } from 'react-icons/io5';
import { uploadProfileImageBase64 } from '@/actions/upload';
import Button from '../ui/button';

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
      setShowPreview(true);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!previewImage) {
      setError('No image selected');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Upload the base64 image directly
      const result = await uploadProfileImageBase64(previewImage);

      if (result.success) {
        setShowPreview(false);
        setPreviewImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Refresh the page to show the new image
        router.refresh();
      } else {
        setError(result.message || 'Failed to upload image');
      }
    } catch (_err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    setShowPreview(false);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      {showPreview ? (
        <div className="mb-6 flex flex-col items-center gap-4">
          <div className="relative">
            {previewImage && (
              <>
                <Image
                  alt="Preview"
                  className={`h-40 w-40 rounded-full border-4 border-primary object-cover ${isUploading ? 'opacity-50' : ''}`}
                  height={200}
                  src={previewImage}
                  width={200}
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-primary border-b-2" />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex gap-4">
            <Button
              disabled={isUploading}
              onClick={handleImageUpload}
              type="button"
              variant="primary"
            >
              {isUploading ? 'Uploading...' : 'Save Profile Picture'}
            </Button>
            <Button
              disabled={isUploading}
              onClick={cancelUpload}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative">
            {user.image ? (
              <Image
                alt={user.name}
                className="h-24 w-24 rounded-full object-cover"
                height={96}
                src={user.image}
                width={96}
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100">
                <IoPersonCircleOutline className="h-16 w-16 text-neutral-400" />
              </div>
            )}

            <label
              className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-primary p-1.5 text-white transition-colors hover:bg-primary/90"
              htmlFor="profile-image"
            >
              <IoCamera className="h-4 w-4" />
            </label>
            <input
              accept="image/*"
              className="hidden"
              disabled={isUploading}
              id="profile-image"
              onChange={handleImageSelect}
              ref={fileInputRef}
              type="file"
            />
          </div>

          <div className="text-center sm:text-left">
            <h1 className="font-bold text-2xl text-neutral-900">{user.name}</h1>
            <p className="text-neutral-500">{user.email}</p>
            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 font-medium text-blue-700 text-xs capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
