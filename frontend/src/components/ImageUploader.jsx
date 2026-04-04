import { Image as ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ImageUploader({ value, onImageUpload }) {
  const [image, setImage] = useState(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Sync internal state with prop
  useEffect(() => {
    setImage(value);
  }, [value]);

  // Handle file selection and upload
  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setIsUploading(true);
    setImage(null);

    // upload image
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setImage(imageData);
      setIsUploading(false);
      if (onImageUpload) onImageUpload(imageData);
    };
    reader.readAsDataURL(file);
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  // Handle file selection via input
  const onFileSelect = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // Clear the uploaded image
  const clearImage = (e) => {
    e.stopPropagation();
    setImage(null);
    if (onImageUpload) onImageUpload(null);
  };

  return (
    <div className="w-full">
      {/* initial state - upload state */}
      {!image && !isUploading ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 
            flex flex-col items-center justify-center transition
            ${
              isDragging
                ? "border-brand-500 bg-brand-50/50"
                : "border-stone-200 hover:border-brand-400 hover:bg-stone-50"
            }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileSelect}
            accept="image/*"
            className="hidden"
          />

          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-4
              ${isDragging ? "bg-brand-100" : "bg-stone-100"}`}
          >
            <Upload
              className={`w-6 h-6 ${
                isDragging ? "text-brand-600" : "text-stone-500"
              }`}
            />
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-stone-700">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-stone-500 mt-1">
              PNG, JPG or WebP (max. 5MB)
            </p>
          </div>
        </div>
      ) : isUploading ? (
        // image uploading state
        <div className="border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-stone-50/50">
          <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
          <p className="text-sm font-medium text-stone-600 mt-4">
            Processing image...
          </p>
        </div>
      ) : (
        //image preview state

        <div className="relative group rounded-2xl overflow-hidden border border-stone-200 bg-stone-50">
          <div className="aspect-video w-full max-h-40 relative">
            <img
              src={image}
              alt="Upload preview"
              className="w-full h-full object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
          </div>

          {/* footer / */}
          <div className="p-3 flex items-center justify-between bg-white border-t border-stone-100">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="p-1.5 bg-stone-100 rounded-lg">
                <ImageIcon className="w-4 h-4 text-stone-500" />
              </div>
              <p className="text-xs font-medium text-stone-600 truncate">
                image_uploaded.jpg
                {/* later here will be uploaded file name  */}
              </p>
            </div>

            <button
              onClick={clearImage}
              className="p-1.5 hover:bg-red-50 rounded-lg transition"
            >
              <X className="w-4 h-4 text-stone-400 hover:text-red-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
