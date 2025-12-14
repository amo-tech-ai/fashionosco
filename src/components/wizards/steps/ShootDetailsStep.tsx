
import React, { useState, useEffect } from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { Calendar, MapPin, Clock, Package, Search, CheckCircle } from 'lucide-react';
import { Product } from '../../../types/products';

export const ShootDetailsStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useShootWizard();
  const [inventory, setInventory] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [useInventory, setUseInventory] = useState(state.selectedProducts.length > 0);

  useEffect(() => {
    // Load local inventory
    const saved = localStorage.getItem('studio_inventory');
    if (saved) {
      setInventory(JSON.parse(saved));
    }
  }, []);

  const toggleProduct = (product: Product) => {
    const exists = state.selectedProducts.find(p => p.id === product.id);
    let updated = [];
    if (exists) {
      updated = state.selectedProducts.filter(p => p.id !== product.id);
    } else {
      updated = [...state.selectedProducts, product];
    }
    updateField('selectedProducts', updated);
    // Auto update number of items for pricing/duration
    updateField('numberOfItems', updated.length || 10);
  };

  const filteredInventory = inventory.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  // Simple validation
  const isValid = state.location;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Tell us about your shoot.</h2>
        <p className="text-gray-500 font-light">Select products from your inventory or estimate the count.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        
        {/* Toggle Mode */}
        <div className="flex gap-4 border-b border-gray-200 pb-2">
           <button 
             onClick={() => setUseInventory(true)}
             className={`text-sm font-bold uppercase tracking-widest pb-2 transition-colors ${useInventory ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
           >
             Select Products
           </button>
           <button 
             onClick={() => { setUseInventory(false); updateField('selectedProducts', []); }}
             className={`text-sm font-bold uppercase tracking-widest pb-2 transition-colors ${!useInventory ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
           >
             Quick Estimate
           </button>
        </div>

        {useInventory ? (
           <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                 <div className="relative flex-1 mr-4">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input 
                       type="text" 
                       placeholder="Search SKU..." 
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                       className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black"
                    />
                 </div>
                 <div className="text-xs font-bold uppercase tracking-widest text-purple-600">
                    {state.selectedProducts.length} Selected
                 </div>
              </div>
              
              {inventory.length === 0 ? (
                 <div className="text-center py-8 text-gray-400 text-sm">
                    <Package size={24} className="mx-auto mb-2 opacity-50" />
                    No products found. Use Quick Estimate or add items in Dashboard.
                 </div>
              ) : (
                 <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {filteredInventory.map(product => {
                       const isSelected = state.selectedProducts.some(p => p.id === product.id);
                       return (
                          <div 
                             key={product.id}
                             onClick={() => toggleProduct(product)}
                             className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all ${isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-100 hover:bg-gray-50'}`}
                          >
                             <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden shrink-0">
                                <img src={product.img} className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium truncate">{product.name}</h4>
                                <p className="text-xs text-gray-500">{product.sku}</p>
                             </div>
                             {isSelected && <CheckCircle size={18} className="text-purple-600" />}
                          </div>
                       );
                    })}
                 </div>
              )}
           </div>
        ) : (
           <div className="bg-white p-6 rounded-xl border border-gray-200">
             <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Number of Items</label>
             <div className="flex items-center gap-4">
               <input 
                 type="range" 
                 min="1" 
                 max="50" 
                 value={state.numberOfItems} 
                 onChange={(e) => updateField('numberOfItems', parseInt(e.target.value))}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
               />
               <div className="w-16 h-12 flex items-center justify-center border border-gray-300 rounded-md font-serif text-xl font-bold">
                  {state.numberOfItems}
               </div>
             </div>
           </div>
        )}

        {/* Duration Display */}
        <div className="flex items-center text-sm text-purple-600 bg-purple-50 p-3 rounded-lg">
           <Clock size={16} className="mr-2" />
           Estimated Duration: <span className="font-bold ml-1">{state.numberOfItems > 20 ? 'Full Day (8h)' : 'Half Day (4h)'}</span>
        </div>

        {/* Location Selection */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
           <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Shoot Location</label>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                 { id: 'studio', label: 'FashionOS Studio', desc: 'North London' },
                 { id: 'on-location', label: 'On Location', desc: 'Outdoor / Scouted' },
                 { id: 'client-venue', label: 'Client Venue', desc: 'Your Office/Store' }
              ].map((loc) => (
                 <button
                    key={loc.id}
                    onClick={() => updateField('location', loc.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                       state.location === loc.id 
                       ? 'border-black bg-gray-50 ring-1 ring-black' 
                       : 'border-gray-200 hover:border-gray-400'
                    }`}
                 >
                    <MapPin size={20} className={`mb-3 ${state.location === loc.id ? 'text-black' : 'text-gray-400'}`} />
                    <div className="font-bold text-sm">{loc.label}</div>
                    <div className="text-xs text-gray-500">{loc.desc}</div>
                 </button>
              ))}
           </div>
        </div>

      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} disabled={!isValid}>Continue</Button>
      </div>
    </div>
  );
};
