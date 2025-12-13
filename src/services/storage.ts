
import { supabase } from '../lib/supabase';

export const StorageService = {
  /**
   * Uploads a file to a specific bucket
   * @param file The file object to upload
   * @param bucket The bucket name (e.g., 'moodboards', 'avatars')
   * @param path Optional path/folder structure. If null, uses random filename.
   */
  uploadFile: async (file: File, bucket: string, path?: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = path ? `${path}/${fileName}` : fileName;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  },

  /**
   * Batch upload multiple files
   */
  uploadFiles: async (files: File[], bucket: string, path?: string): Promise<string[]> => {
    const uploadPromises = files.map(file => StorageService.uploadFile(file, bucket, path));
    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
  }
};
