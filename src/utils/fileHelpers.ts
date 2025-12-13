
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

export const compressBase64Image = (base64: string, maxWidth = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(base64);

      const ratio = maxWidth / img.width;
      const width = maxWidth;
      const height = img.height * ratio;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality JPEG
    };
    img.onerror = () => resolve(base64);
  });
};
