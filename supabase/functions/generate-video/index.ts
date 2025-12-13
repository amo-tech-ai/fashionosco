
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.5.0";

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { prompt, aspectRatio } = await req.json(); // '16:9' or '9:16'

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    // Using Veo 3.1 Fast for preview generation
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });

    // Poll for completion
    // Note: In a real edge function, you might not want to wait for the whole loop 
    // if it exceeds execution time limits (usually 60s is fine for fast-generate).
    // Ideally, return the operation ID and let client poll, but for simplicity here we wait.
    
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    
    // The URI usually requires the API key appended to be accessible if not signed
    const downloadUrl = `${videoUri}&key=${apiKey}`;

    return new Response(JSON.stringify({ videoUrl: downloadUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Error generating video:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
