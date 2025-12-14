
import React from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { HomeCampaigns } from '../components/home/HomeCampaigns';
import { HomeStudioStory } from '../components/home/HomeStudioStory';
import { HomeHeritage } from '../components/home/HomeHeritage';
import { HomeEcommerce } from '../components/home/HomeEcommerce';
import { HomeTestimonial } from '../components/home/HomeTestimonial';
import { HomeServices } from '../components/home/HomeServices';
import { HomeDirectory } from '../components/home/HomeDirectory';
import { HomeMarketplace } from '../components/home/HomeMarketplace';
import { HomeEcosystem } from '../components/home/HomeEcosystem';
import { HomeAIServices } from '../components/home/HomeAIServices';
import { HomeAIWorkflow } from '../components/home/HomeAIWorkflow';
import { HomeBTS } from '../components/home/HomeBTS';
import { HomeCTA } from '../components/home/HomeCTA';

export const Home: React.FC = () => {
  return (
    <div className="space-y-0 bg-white">
      <HomeHero />
      <HomeCampaigns />
      <HomeStudioStory />
      <HomeHeritage />
      <HomeEcommerce />
      <HomeTestimonial />
      <HomeServices />
      <HomeDirectory />
      <HomeMarketplace />
      <HomeEcosystem />
      <HomeAIServices />
      <HomeAIWorkflow />
      <HomeBTS />
      <HomeCTA />
    </div>
  );
};
