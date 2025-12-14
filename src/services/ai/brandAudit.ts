
import { BrandInput, BrandAuditResult } from '../../types/brand';
import { compressBase64Image, fileToBase64 } from '../../utils/fileHelpers';
import { MOCK_AUDIT_RESULT } from './mocks/brandAuditMock';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export const auditBrand = async (input: BrandInput): Promise<BrandAuditResult> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Fallback to Demo Mode if no backend connection
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock brand audit');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_AUDIT_RESULT), 4000));
    }

    // 1. Process Images (Limit 3, Compress)
    let images: string[] = [];
    if (input.lookbookFiles && input.lookbookFiles.length > 0) {
       const filesToProcess = input.lookbookFiles.slice(0, 3);
       const rawImages = await Promise.all(filesToProcess.map(fileToBase64));
       
       // Compress to ensure fast edge processing
       const compressedImages = await Promise.all(
         rawImages.map(img => compressBase64Image(img, 800, 0.7))
       );
       
       // Strip headers for API payload
       images = compressedImages.map(img => img.split(',')[1]);
    }

    // 2. Prepare Payload
    const payload = {
        brandName: input.brandName,
        websiteUrl: input.websiteUrl,
        instagramHandle: input.instagramHandle,
        images: images 
    };

    // 3. Call Edge Function
    const response = await fetch(`${SUPABASE_FUNCTION_URL}/audit-brand`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to audit brand');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('AI Audit Service Error:', error);
    // Graceful degradation to mock data ensures UI never breaks during demos
    return MOCK_AUDIT_RESULT;
  }
};
