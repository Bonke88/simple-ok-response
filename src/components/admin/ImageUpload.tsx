
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUploaded?: (url: string) => void;
  acceptedTypes?: string[];
  maxSizeInMB?: number;
}

export const ImageUpload = ({ 
  onImageUploaded, 
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxSizeInMB = 5 
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; name: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);

      // Validate file type
      if (!acceptedTypes.includes(file.type)) {
        throw new Error(`File type ${file.type} not allowed. Please use: ${acceptedTypes.join(', ')}`);
      }

      // Validate file size
      if (file.size > maxSizeInMB * 1024 * 1024) {
        throw new Error(`File size too large. Maximum size is ${maxSizeInMB}MB`);
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `content-images/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('content-assets')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('content-assets')
        .getPublicUrl(filePath);

      const uploadedImage = { url: publicUrl, name: file.name };
      setUploadedImages(prev => [...prev, uploadedImage]);
      
      onImageUploaded?.(publicUrl);
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      await uploadImage(file);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      await uploadImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Copied',
        description: 'Image URL copied to clipboard',
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium">Drop images here or click to upload</p>
            <p className="text-sm text-gray-500">
              Supports: {acceptedTypes.map(type => type.split('/')[1]).join(', ')} (max {maxSizeInMB}MB)
            </p>
          </div>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="mt-4"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Select Images'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            multiple
            className="hidden"
          />
        </div>

        {/* Uploaded Images */}
        {uploadedImages.length > 0 && (
          <div className="space-y-4">
            <Label className="text-base font-medium">Uploaded Images</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyToClipboard(image.url)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 truncate">{image.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
