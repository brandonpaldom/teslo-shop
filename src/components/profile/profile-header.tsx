"use client";

import { useState } from "react";
import Image from "next/image";
import { updateUserImage } from "@/actions/profile";
import { IoCloudUploadOutline, IoPersonCircleOutline } from "react-icons/io5";
import Button from "../ui/button";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This is a placeholder for image upload functionality
  // In a real implementation, you would use a service like Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // This is a mock URL - in a real app, you would upload to a service
      // and get back a URL
      const mockImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
      
      // Update the user's profile image
      await updateUserImage(mockImageUrl);
      
      // Refresh the page to show the new image
      window.location.reload();
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={96}
              height={96}
              className="rounded-full h-24 w-24 object-cover"
            />
          ) : (
            <div className="rounded-full bg-neutral-100 h-24 w-24 flex items-center justify-center">
              <IoPersonCircleOutline className="h-16 w-16 text-neutral-400" />
            </div>
          )}
          
          <label 
            htmlFor="profile-image" 
            className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <IoCloudUploadOutline className="h-4 w-4" />
          </label>
          <input 
            type="file" 
            id="profile-image" 
            className="hidden" 
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </div>
        
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-neutral-900">{user.name}</h1>
          <p className="text-neutral-500">{user.email}</p>
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}