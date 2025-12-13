
import React from 'react';

interface DeliverablesControlsProps {
  finalImagesCount: number;
  resolution: 'web' | 'print';
  onUpdate: (field: string, value: any) => void;
}

export const DeliverablesControls: React.FC<DeliverablesControlsProps> = ({
  finalImagesCount,
  resolution,
  onUpdate,
}) => {
  return (
    <>
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
          Final Retouched Images
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={finalImagesCount}
            onChange={(e) => onUpdate('finalImagesCount', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="w-16 h-12 flex items-center justify-center border border-gray-300 rounded-md font-serif text-xl font-bold">
            {finalImagesCount}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
          Resolution
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onUpdate('resolution', 'web')}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              resolution === 'web' ? 'border-black bg-gray-50' : 'border-gray-200'
            }`}
          >
            Web (72 DPI)
          </button>
          <button
            onClick={() => onUpdate('resolution', 'print')}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              resolution === 'print' ? 'border-black bg-gray-50' : 'border-gray-200'
            }`}
          >
            Print (300 DPI)
          </button>
        </div>
      </div>
    </>
  );
};
