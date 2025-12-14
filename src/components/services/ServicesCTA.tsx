
import React from 'react';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';

export const ServicesCTA: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white text-center">
       <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-serif text-5xl font-medium">Ready to Elevate Your <br/>Creative Production?</h2>
          <p className="text-xl text-gray-500 font-light">Join the future of fashion content creation.</p>
          <div className="flex justify-center gap-4">
             <Button>Book Consultation</Button>
             <Button variant={ButtonVariant.SECONDARY}>Contact Team</Button>
          </div>
       </div>
    </section>
  );
};
