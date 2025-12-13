
const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export const generateVideoPreview = async (prompt: string, aspectRatio: '16:9' | '9:16' = '16:9'): Promise<string> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Fallback to Demo Mode if no backend connection
    if (!anonKey) {
      console.log('✨ Demo Mode: Simulating video generation');
      return new Promise(resolve => setTimeout(() => resolve("https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"), 4000));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/generate-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ prompt, aspectRatio }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate video');
    }

    const data = await response.json();
    return data.videoUrl;
  } catch (error) {
    console.warn('AI Video Fallback:', error);
    // Return a safe placeholder video
    return "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"; 
  }
};
