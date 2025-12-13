
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ProductPhotography } from './pages/ProductPhotography';
import { ClothingPhotography } from './pages/ClothingPhotography';
import { EcommercePhotography } from './pages/EcommercePhotography';
import { CreativeStillLife } from './pages/CreativeStillLife';
import { VideoProduction } from './pages/VideoProduction';
import { InstagramServices } from './pages/InstagramServices';
import { Dashboard } from './pages/Dashboard';
import { ShotList } from './pages/ShotList';
import { Products } from './pages/Products';
import { ClientGallery } from './pages/ClientGallery';
import { Settings } from './pages/Settings'; // New Import
import { ShootWizardPage } from './pages/ShootWizardPage'; 
import { NotFound } from './pages/NotFound';

export const Router: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes wrapped in Main Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/product-photography" element={<ProductPhotography />} />
        <Route path="/services/clothing-photography" element={<ClothingPhotography />} />
        <Route path="/services/ecommerce" element={<EcommercePhotography />} />
        <Route path="/services/creative-still-life" element={<CreativeStillLife />} />
        <Route path="/services/video-production" element={<VideoProduction />} />
        <Route path="/services/instagram" element={<InstagramServices />} />
        {/* Wizard Route - Public accessible but full screen vibe */}
        <Route path="/shoot-wizard" element={<ShootWizardPage />} />
      </Route>

      {/* Dashboard Routes wrapped in Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="shotlist" element={<ShotList />} />
        <Route path="products" element={<Products />} />
        <Route path="gallery" element={<ClientGallery />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
