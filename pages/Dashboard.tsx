import React from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6">
        <div>
           <h1 className="text-2xl font-serif text-gray-900">Dashboard Overview</h1>
           <p className="text-sm text-gray-500 mt-1">Welcome back, Creative Director.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant={ButtonVariant.SECONDARY}>Export Data</Button>
          <Button>New Project</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {['Active Projects', 'Pending Approvals', 'Budget Used'].map((item) => (
          <div key={item} className="bg-white overflow-hidden border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <dt className="text-xs font-bold uppercase tracking-widest text-gray-500 truncate mb-2">{item}</dt>
            <dd className="text-3xl font-serif text-gray-900 mb-4">
              {item === 'Budget Used' ? '$24.5k' : '12'}
            </dd>
            <a href="#" className="text-xs font-semibold text-black border-b border-black pb-0.5 hover:text-gray-600">
              View details
            </a>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 p-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6 font-serif">
          Campaign Performance
        </h3>
        <div className="h-80 w-full flex items-center justify-center bg-gray-50 border border-dashed border-gray-300">
           <p className="text-gray-400 font-serif italic">Analytics Visualization Placeholder</p>
        </div>
      </div>
    </div>
  );
};