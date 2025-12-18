
import React from 'react';
import { WholesaleHeader } from '../../components/wholesale/WholesaleHeader';

interface WholesaleLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const WholesaleLayout: React.FC<WholesaleLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-20 flex overflow-hidden">
      <WholesaleHeader title={title} />
      {children}
    </div>
  );
};
