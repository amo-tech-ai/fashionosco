
import React, { useEffect } from 'react';
import { InstagramHero } from '../components/instagram/InstagramHero';
import { InstagramValue } from '../components/instagram/InstagramValue';
import { InstagramPhotography } from '../components/instagram/InstagramPhotography';
import { InstagramVideo } from '../components/instagram/InstagramVideo';
import { InstagramFormats } from '../components/instagram/InstagramFormats';
import { InstagramShop } from '../components/instagram/InstagramShop';
import { InstagramPortfolio } from '../components/instagram/InstagramPortfolio';
import { InstagramFeatures } from '../components/instagram/InstagramFeatures';
import { InstagramTestimonial } from '../components/instagram/InstagramTestimonial';
import { InstagramContact } from '../components/instagram/InstagramContact';

export const InstagramServices: React.FC = () => {
  useEffect(() => {
    // Scroll Observer for Entrance Animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Timeout ensures DOM is populated if imported components render synchronously
    setTimeout(() => {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <InstagramHero />
      <InstagramValue />
      <InstagramPhotography />
      <InstagramVideo />
      <InstagramFormats />
      <InstagramShop />
      <InstagramPortfolio />
      <InstagramFeatures />
      <InstagramTestimonial />
      <InstagramContact />
    </div>
  );
};