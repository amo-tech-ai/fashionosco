
export interface AuditResult {
  score: number;
  archetype: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  bioFix: string;
}

export interface AuditParams {
  bio: string;
  niche: string;
  audience: string;
  recentContent?: string;
}

export interface AuditHistoryItem {
  id: string;
  timestamp: number;
  params: AuditParams;
  result: AuditResult;
}

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

const MOCK_AUDIT: AuditResult = {
  score: 72,
  archetype: "The Curator",
  summary: "Your aesthetic is strong, but your conversion strategy is vague. You're capturing eyes but not clicks.",
  strengths: ["Clear visual identity implied", "Niche specific terminology used"],
  weaknesses: ["Call to Action is weak", "Bio lacks authority markers"],
  opportunities: [" leverage 'Quiet Luxury' reels", "Use carousel storytelling for education"],
  bioFix: "Curating modern minimalism. 🧥 | Daily style inspo for the conscious creative. | Shop the look 👇"
};

// --- History Management ---

export const saveAuditHistory = (params: AuditParams, result: AuditResult) => {
  try {
    const history = getAuditHistory();
    const newItem: AuditHistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      params,
      result
    };
    // Limit to 20 items
    const updatedHistory = [newItem, ...history].slice(0, 20);
    localStorage.setItem('instagram_audit_history', JSON.stringify(updatedHistory));
  } catch (e) {
    console.warn('Failed to save audit history', e);
  }
};

export const getAuditHistory = (): AuditHistoryItem[] => {
  try {
    return JSON.parse(localStorage.getItem('instagram_audit_history') || '[]');
  } catch {
    return [];
  }
};

export const deleteAuditHistoryItem = (id: string) => {
  try {
    const history = getAuditHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem('instagram_audit_history', JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to delete audit history item', e);
  }
};

export const clearAuditHistory = () => {
  localStorage.removeItem('instagram_audit_history');
};

// --- API Logic ---

export const auditProfile = async (params: AuditParams): Promise<AuditResult> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Fallback to Demo Mode if no backend connection
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock audit');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_AUDIT), 2500));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/audit-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to audit profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('AI Audit Fallback:', error);
    return MOCK_AUDIT;
  }
};
