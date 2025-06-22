"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadProfileImageBase64 } from "@/actions/upload";
import { IoPersonCircleOutline, IoCamera } from "react-icons/io5";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

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
    if (!file) return;

    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
      setShowPreview(true);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!previewImage) {
      setError("No image selected");
      return;
    }
    
    setIsUploading(true);
    setError(null);

    try {
      console.log("Starting image upload with base64...");
      
      // Upload the base64 image directly
      const result = await uploadProfileImageBase64(previewImage);
      console.log("Upload result:", result);
      
      if (result.success) {
        console.log("Upload successful, image URL:", result.imageUrl);
        setShowPreview(false);
        setPreviewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        // Refresh the page to show the new image
        router.refresh();
      } else {
        console.error("Upload failed:", result.message);
        setError(result.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Error during upload:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  
  const cancelUpload = () => {
    setShowPreview(false);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      {showPreview ? (
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            {previewImage && (
              <>
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={200}
                  height={200}
                  className={`rounded-full h-40 w-40 object-cover border-4 border-primary ${isUploading ? 'opacity-50' : ''}`}
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex gap-4">
            <Button 
              variant="primary" 
              onClick={handleImageUpload}
              disabled={isUploading}
              type="button"
            >
              {isUploading ? "Uploading..." : "Save Profile Picture"}
            </Button>
            <Button 
              variant="outline" 
              onClick={cancelUpload}
              disabled={isUploading}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
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
              <IoCamera className="h-4 w-4" />
            </label>
            <input 
              type="file" 
              id="profile-image" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageSelect}
              disabled={isUploading}
              ref={fileInputRef}
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
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}