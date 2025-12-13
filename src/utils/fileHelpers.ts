
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const filesToBase64Strings = async (files: File[]): Promise<string[]> => {
  const promises = files.map(file => fileToBase64(file));
  return Promise.all(promises);
};

export const compressBase64Image = (base64: string, maxWidth = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Calculate new dimensions
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(base64); // Fallback to original if canvas fails

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Return bare base64 string (strip data:image/jpeg;base64, prefix if needed by caller, 
      // but usually AI APIs handle the standard format or need stripping. 
      // Here we return full data URI, callers can strip if needed.)
      resolve(canvas.toDataURL('image/jpeg', quality)); 
    };
    img.onerror = () => resolve(base64); // Fallback on error
  });
};
