
import React from 'react';
import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesGrid } from '../components/services/ServicesGrid';
import { ServicesList } from '../components/services/ServicesList';
import { ServicesProcess } from '../components/services/ServicesProcess';
import { ServicesPortfolio } from '../components/services/ServicesPortfolio';
import { ServicesAI } from '../components/services/ServicesAI';
import { ServicesCTA } from '../components/services/ServicesCTA';
import { HomeTestimonial } from '../components/home/HomeTestimonial'; // Reusing existing

export const Services: React.FC = () => {
  return (
    <div className="bg-white">
      <ServicesHero />
      <ServicesGrid />
      <ServicesList />
      <ServicesProcess />
      <ServicesPortfolio />
      <ServicesAI />
      <HomeTestimonial />
      <ServicesCTA />
    </div>
  );
};
