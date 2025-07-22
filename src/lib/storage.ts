
import { supabase } from '@/integrations/supabase/client';

export interface UploadOptions {
  bucket?: string;
  folder?: string;
  fileName?: string;
  upsert?: boolean;
}

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

export class StorageManager {
  private static instance: StorageManager;
  private bucket = 'content-assets';

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  async uploadFile(file: File, options: UploadOptions = {}): Promise<UploadResult> {
    try {
      const bucket = options.bucket || this.bucket;
      const folder = options.folder || 'uploads';
      const fileName = options.fileName || `${Date.now()}-${file.name}`;
      const filePath = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          upsert: options.upsert || false,
          cacheControl: '3600'
        });

      if (error) {
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return {
        url: urlData.publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        url: '',
        path: '',
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  async uploadMultiple(files: File[], options: UploadOptions = {}): Promise<UploadResult[]> {
    const results = await Promise.all(
      files.map(file => this.uploadFile(file, options))
    );
    return results;
  }

  async deleteFile(path: string, bucket?: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(bucket || this.bucket)
        .remove([path]);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  }

  async listFiles(folder = '', bucket?: string): Promise<any[]> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket || this.bucket)
        .list(folder);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('List files error:', error);
      return [];
    }
  }

  getPublicUrl(path: string, bucket?: string): string {
    const { data } = supabase.storage
      .from(bucket || this.bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  async createSignedUrl(path: string, expiresIn = 3600, bucket?: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket || this.bucket)
        .createSignedUrl(path, expiresIn);

      if (error) {
        throw error;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Signed URL error:', error);
      return null;
    }
  }
}

export const storage = StorageManager.getInstance();

// Utility functions for common file operations
export const uploadImage = async (file: File, folder = 'images'): Promise<UploadResult> => {
  return storage.uploadFile(file, { folder });
};

export const uploadDocument = async (file: File, folder = 'documents'): Promise<UploadResult> => {
  return storage.uploadFile(file, { folder });
};

export const uploadVideo = async (file: File, folder = 'videos'): Promise<UploadResult> => {
  return storage.uploadFile(file, { folder });
};

export const uploadAvatar = async (file: File, userId: string): Promise<UploadResult> => {
  return storage.uploadFile(file, { 
    folder: 'avatars', 
    fileName: `${userId}-avatar.${file.name.split('.').pop()}`,
    upsert: true 
  });
};
