
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export interface PhotoPreview {
  url: string;
  file: File;
}

interface PhotoUploadProps {
  photos: PhotoPreview[];
  onPhotosChange: (photos: PhotoPreview[]) => void;
}

export const PhotoUpload = ({ photos, onPhotosChange }: PhotoUploadProps) => {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (photos.length >= 3) {
        toast({
          title: "Maximum photos reached",
          description: "You can only upload up to 3 photos.",
          variant: "destructive"
        });
        return;
      }
      
      onPhotosChange([...photos, {
        url: URL.createObjectURL(file),
        file: file
      }]);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    URL.revokeObjectURL(newPhotos[index].url);
    newPhotos.splice(index, 1);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img src={photo.url} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => removePhoto(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {photos.length < 3 && (
          <Label
            htmlFor="photo-upload"
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center aspect-video hover:border-launchpad-blue transition-colors"
          >
            <Image className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Add photo</span>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </Label>
        )}
      </div>
      <p className="text-xs text-gray-500">
        {photos.length}/3 photos uploaded • JPG, PNG, or WebP up to 5MB each
      </p>
    </div>
  );
};
