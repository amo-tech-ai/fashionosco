
import React, { useState, useRef } from 'react';
import { X, Upload, Sparkles, Loader2, CheckCircle, AlertCircle, ArrowRight, FileText } from 'lucide-react';
import { Button } from '../Button';
import { parseLineSheet, ParsedProduct } from '../../services/ai/productParser';
import { useToast } from '../ToastProvider';

interface MagicImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (products: ParsedProduct[]) => void;
}

export const MagicImportModal: React.FC<MagicImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [step, setStep] = useState<'upload' | 'processing' | 'review'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [parsedProducts, setParsedProducts] = useState<ParsedProduct[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const startProcessing = async () => {
    if (!file) return;
    setStep('processing');
    
    try {
      const results = await parseLineSheet(file);
      setParsedProducts(results);
      setStep('review');
    } catch (e) {
      addToast("Failed to process file. Please try again.", "error");
      setStep('upload');
    }
  };

  const handleProductEdit = (index: number, field: keyof ParsedProduct, value: string) => {
    const updated = [...parsedProducts];
    updated[index] = { ...updated[index], [field]: value };
    setParsedProducts(updated);
  };

  const handleFinish = () => {
    onImport(parsedProducts);
    onClose();
    // Reset state for next time
    setTimeout(() => {
        setStep('upload');
        setFile(null);
        setPreview(null);
        setParsedProducts([]);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#F7F7F5]">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                 <Sparkles size={20} />
              </div>
              <div>
                 <h3 className="font-serif text-xl font-bold">Magic Import</h3>
                 <p className="text-xs text-gray-500 uppercase tracking-widest">AI Line Sheet Parser</p>
              </div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
              <X size={20} className="text-gray-400" />
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
           
           {/* STEP 1: UPLOAD */}
           {step === 'upload' && (
              <div className="h-full flex flex-col items-center justify-center py-12 space-y-8">
                 <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full max-w-xl border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50/30 transition-all group"
                 >
                    {preview ? (
                       <img src={preview} alt="Preview" className="max-h-64 object-contain shadow-lg rounded-lg mb-6" />
                    ) : (
                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Upload size={32} className="text-gray-400 group-hover:text-purple-500" />
                       </div>
                    )}
                    
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                       {file ? "Change File" : "Upload Line Sheet or Lookbook"}
                    </h4>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">
                       Supports JPG, PNG images. <br/>AI will extract names, SKUs, and prices automatically.
                    </p>
                    <input 
                       type="file" 
                       ref={fileInputRef} 
                       onChange={handleFileSelect} 
                       accept="image/*" 
                       className="hidden" 
                    />
                 </div>

                 <div className="flex gap-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={startProcessing} disabled={!file} className="bg-purple-600 border-purple-600 hover:bg-purple-700 text-white">
                       <Sparkles size={16} className="mr-2" /> 
                       Process with AI
                    </Button>
                 </div>
              </div>
           )}

           {/* STEP 2: PROCESSING */}
           {step === 'processing' && (
              <div className="h-full flex flex-col items-center justify-center py-20 space-y-6">
                 <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Sparkles size={32} className="text-purple-600 animate-pulse" />
                    </div>
                 </div>
                 <div className="text-center space-y-2">
                    <h3 className="font-serif text-2xl">Analyzing Visuals...</h3>
                    <p className="text-gray-500 text-sm">Identifying products, extracting SKUs, and reading descriptions.</p>
                 </div>
                 {/* Mock progress bar just for feel */}
                 <div className="w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-purple-600 animate-[loading-bar_2s_infinite]"></div>
                 </div>
              </div>
           )}

           {/* STEP 3: REVIEW */}
           {step === 'review' && (
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h4 className="font-bold text-lg">Detected {parsedProducts.length} Products</h4>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                       <CheckCircle size={14} className="text-green-500" />
                       Please review details before importing.
                    </div>
                 </div>

                 <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                       <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                             <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Name</th>
                             <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">SKU</th>
                             <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Category</th>
                             <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Price</th>
                             <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                          {parsedProducts.map((p, i) => (
                             <tr key={i} className="group hover:bg-gray-50/50">
                                <td className="px-6 py-3">
                                   <input 
                                      value={p.name} 
                                      onChange={(e) => handleProductEdit(i, 'name', e.target.value)}
                                      className="w-full bg-transparent font-medium text-sm focus:outline-none focus:border-b focus:border-purple-500 transition-colors"
                                   />
                                   <input 
                                      value={p.description} 
                                      onChange={(e) => handleProductEdit(i, 'description', e.target.value)}
                                      className="w-full bg-transparent text-xs text-gray-400 mt-1 focus:outline-none focus:border-b focus:border-purple-500 transition-colors truncate"
                                   />
                                </td>
                                <td className="px-6 py-3">
                                   <input 
                                      value={p.sku} 
                                      onChange={(e) => handleProductEdit(i, 'sku', e.target.value)}
                                      className="w-24 font-mono text-xs bg-gray-100 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                                   />
                                </td>
                                <td className="px-6 py-3">
                                   <input 
                                      value={p.category} 
                                      onChange={(e) => handleProductEdit(i, 'category', e.target.value)}
                                      className="w-full bg-transparent text-sm focus:outline-none focus:border-b focus:border-purple-500"
                                   />
                                </td>
                                <td className="px-6 py-3">
                                   <input 
                                      value={p.price} 
                                      onChange={(e) => handleProductEdit(i, 'price', e.target.value)}
                                      className="w-20 bg-transparent text-sm font-medium focus:outline-none focus:border-b focus:border-purple-500"
                                   />
                                </td>
                                <td className="px-6 py-3">
                                   {p.status === 'Ready' ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded">
                                         <CheckCircle size={10} /> Ready
                                      </span>
                                   ) : (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                         <AlertCircle size={10} /> Review
                                      </span>
                                   )}
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 <div className="flex justify-end gap-4 pt-4">
                    <Button variant="secondary" onClick={() => setStep('upload')}>Back</Button>
                    <Button onClick={handleFinish} className="bg-black text-white px-8">
                       Import {parsedProducts.length} Products
                    </Button>
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};
