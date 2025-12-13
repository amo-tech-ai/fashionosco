
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/ToastProvider';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        addToast('Account created! Please check your email.', 'success');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        addToast('Welcome back to FashionOS.', 'success');
        navigate('/dashboard');
      }
    } catch (error: any) {
      addToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
     setIsLoading(true);
     // Simulate login for demo purposes if no backend is connected
     setTimeout(() => {
        localStorage.setItem('auth_session', 'true');
        addToast('Entered Demo Mode', 'info');
        navigate('/dashboard');
     }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left: Editorial Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2946&auto=format&fit=crop" 
          alt="Runway Backstage" 
          className="w-full h-full object-cover opacity-90 animate-in scale-105 transition-transform duration-[20s]"
        />
        <div className="absolute bottom-12 left-12 z-20 text-white max-w-md">
          <h2 className="font-serif text-4xl mb-4">The Operating System for Fashion Production.</h2>
          <p className="text-white/80 font-light">
            Plan, produce, and publish your campaigns in one unified workspace.
          </p>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 animate-in slide-in-from-right-8 duration-700">
        <div className="w-full max-w-sm space-y-10">
          <div className="text-center lg:text-left">
            <Link to="/" className="font-serif text-3xl font-bold tracking-tight text-[#1A1A1A]">
              FashionOS.
            </Link>
            <h1 className="mt-8 text-2xl font-medium text-gray-900">{isSignUp ? 'Create an Account' : 'Welcome back'}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {isSignUp ? 'Start your production journey.' : 'Enter your credentials to access your studio.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors bg-transparent placeholder-gray-300"
                placeholder="name@studio.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                  Password
                </label>
                {!isSignUp && <a href="#" className="text-xs text-gray-400 hover:text-black transition-colors">Forgot?</a>}
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors bg-transparent placeholder-gray-300"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                type="submit" 
                className="w-full justify-center h-12 text-sm" 
                isLoading={isLoading}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'} <ArrowRight size={16} className="ml-2" />
              </Button>
              
              <button 
                type="button" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-xs text-gray-500 hover:text-black py-2"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400 tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleDemoLogin} className="flex items-center justify-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs font-bold text-gray-600">
               DEMO MODE
            </button>
            <button className="flex items-center justify-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
               <Lock size={18} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
