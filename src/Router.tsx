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
import { NotFound } from './pages/NotFound';
import { DesignerWizardPage } from './pages/DesignerWizardPage';
import { ShootWizardPage } from './pages/ShootWizardPage';
import { Directory } from './pages/Directory';
import { Marketplace } from './pages/Marketplace';
import { BTS } from './pages/BTS';
import { Login } from './pages/Login';
import { BuyerApplicationPage } from './pages/wholesale/BuyerApplication';
import { TalentProfile } from './pages/TalentProfile';
import { EventWizardPage } from './pages/EventWizardPage';
import { BrandDashboard } from './pages/BrandDashboard';
import { Calendar } from './pages/Calendar';
import { ClientGallery } from './pages/ClientGallery';
import { Billing } from './pages/Billing';
import { Settings } from './pages/Settings';
import { TalentWizard } from './components/wizards/talent/TalentWizard';
import { SeatingChart } from './components/dashboard/events/SeatingChart';
import { WholesaleShowroom } from './pages/wholesale/WholesaleShowroom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

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
        
        {/* Core Feature Routes */}
        <Route path="/create-profile" element={<DesignerWizardPage />} />
        <Route path="/shoot-wizard" element={<ShootWizardPage />} />
        <Route path="/event-wizard" element={<EventWizardPage />} />
        <Route path="/talent-wizard" element={<TalentWizard />} />
        
        <Route path="/directory" element={<Directory />} />
        <Route path="/directory/:id" element={<TalentProfile />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/bts" element={<BTS />} />
        <Route path="/wholesale/apply" element={<BuyerApplicationPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />

      {/* Wholesale Protected (Simulated) */}
      <Route path="/wholesale/showroom" element={<WholesaleShowroom />} />

      {/* Dashboard Routes wrapped in Dashboard Layout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="brand" element={<BrandDashboard />} />
          <Route path="shotlist" element={<ShotList />} />
          <Route path="products" element={<Products />} />
          <Route path="gallery" element={<ClientGallery />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Event Specific Sub-routes */}
          <Route path="timeline" element={<Dashboard />} />
          <Route path="guests" element={<Dashboard />} />
          <Route path="budget" element={<Dashboard />} />
          <Route path="seating" element={<SeatingChart />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};