
import React from 'react';
import { Layout, Smartphone, Zap } from 'lucide-react';
import { BrandAuditResult } from '../../../../../types/brand';

interface DigitalPresenceProps {
  result: BrandAuditResult;
}

export const DigitalPresence: React.FC<DigitalPresenceProps> = ({ result }) => {
  const getFeedback = (type: 'web' | 'social', value: string) => {
    if (type === 'web') {
      if (value === 'Modern') return "Strong foundation for conversion. Clean hierarchy.";
      if (value === 'Outdated') return "Navigation structure needs simplification to reduce bounce rate.";
      return "Functional but lacks brand storytelling elements.";
    } else {
      if (value === 'Active') return "High engagement potential detected across channels.";
      if (value === 'Sparse') return "Inconsistent posting frequency. Aim for 3x/week.";
      return "Critical channel missing from strategy. Claim handle immediately.";
    }
  };

  const getStatusColor = (value: string) => {
      const good = ['Modern', 'Active', 'High', 'Strong', 'Clear'];
      const bad = ['Outdated', 'None', 'Low', 'Weak', 'Vague'];
      if (good.includes(value)) return 'text-green-600 bg-green-50';
      if (bad.includes(value)) return 'text-red-600 bg-red-50';
      return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
        <Zap size={14} /> Digital Presence Audit
      </h4>

      <div className="space-y-6">
        {/* Website Row */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <Layout size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-gray-900">Website UX</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${getStatusColor(result.signals.website_ux)}`}>
                {result.signals.website_ux}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {getFeedback('web', result.signals.website_ux)}
            </p>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full"></div>

        {/* Social Row */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
            <Smartphone size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-gray-900">Social Engine</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${getStatusColor(result.signals.social_presence)}`}>
                {result.signals.social_presence}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {getFeedback('social', result.signals.social_presence)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
