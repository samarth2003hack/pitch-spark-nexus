
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, X } from "lucide-react";

interface VideoUploadProps {
  videoFile: File | null;
  videoPreview: string | null;
  onVideoChange: (file: File | null) => void;
}

export const VideoUpload = ({ videoFile, videoPreview, onVideoChange }: VideoUploadProps) => {
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onVideoChange(file);
    }
  };

  const handleRemoveVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    onVideoChange(null);
  };

  return (
    <div className="space-y-4">
      {videoPreview ? (
        <div className="space-y-4">
          <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <video 
              src={videoPreview} 
              controls 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">{videoFile?.name}</span>
              <span className="text-xs text-gray-400 block">
                {videoFile && (videoFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
            <Button 
              type="button"
              variant="outline" 
              onClick={handleRemoveVideo}
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="video-upload"
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-10 hover:border-launchpad-blue transition-colors"
        >
          <Video className="h-12 w-12 text-gray-400 mb-4" />
          <div className="text-center">
            <p className="font-medium text-gray-700 mb-1">Upload your pitch video</p>
            <p className="text-sm text-gray-500">Drag and drop or click to browse</p>
            <p className="text-xs text-gray-400 mt-2">MP4, MOV, or WebM up to 100MB</p>
          </div>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoChange}
          />
        </label>
      )}
    </div>
  );
};
