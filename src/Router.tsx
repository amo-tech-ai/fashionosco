
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PageLoader } from './components/ui/PageLoader';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Lazy Load Pages
// Using named export adapter pattern: .then(module => ({ default: module.Component }))
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Services = React.lazy(() => import('./pages/Services').then(module => ({ default: module.Services })));
const ProductPhotography = React.lazy(() => import('./pages/ProductPhotography').then(module => ({ default: module.ProductPhotography })));
const ClothingPhotography = React.lazy(() => import('./pages/ClothingPhotography').then(module => ({ default: module.ClothingPhotography })));
const EcommercePhotography = React.lazy(() => import('./pages/EcommercePhotography').then(module => ({ default: module.EcommercePhotography })));
const CreativeStillLife = React.lazy(() => import('./pages/CreativeStillLife').then(module => ({ default: module.CreativeStillLife })));
const VideoProduction = React.lazy(() => import('./pages/VideoProduction').then(module => ({ default: module.VideoProduction })));
const InstagramServices = React.lazy(() => import('./pages/InstagramServices').then(module => ({ default: module.InstagramServices })));

// Feature Pages
const DesignerWizardPage = React.lazy(() => import('./pages/DesignerWizardPage').then(module => ({ default: module.DesignerWizardPage })));
const ShootWizardPage = React.lazy(() => import('./pages/ShootWizardPage').then(module => ({ default: module.ShootWizardPage })));
const EventWizardPage = React.lazy(() => import('./pages/EventWizardPage').then(module => ({ default: module.EventWizardPage })));
const TalentWizard = React.lazy(() => import('./components/wizards/talent/TalentWizard').then(module => ({ default: module.TalentWizard })));
const Directory = React.lazy(() => import('./pages/Directory').then(module => ({ default: module.Directory })));
const TalentProfile = React.lazy(() => import('./pages/TalentProfile').then(module => ({ default: module.TalentProfile })));
const Marketplace = React.lazy(() => import('./pages/Marketplace').then(module => ({ default: module.Marketplace })));
const BTS = React.lazy(() => import('./pages/BTS').then(module => ({ default: module.BTS })));
const BuyerApplicationPage = React.lazy(() => import('./pages/wholesale/BuyerApplication').then(module => ({ default: module.BuyerApplicationPage })));
const WholesaleShowroom = React.lazy(() => import('./pages/wholesale/WholesaleShowroom').then(module => ({ default: module.WholesaleShowroom })));
const Login = React.lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const NotFound = React.lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

// Dashboard Pages
const Dashboard = React.lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const BrandDashboard = React.lazy(() => import('./pages/BrandDashboard').then(module => ({ default: module.BrandDashboard })));
const ShotList = React.lazy(() => import('./pages/ShotList').then(module => ({ default: module.ShotList })));
const Products = React.lazy(() => import('./pages/Products').then(module => ({ default: module.Products })));
const ClientGallery = React.lazy(() => import('./pages/ClientGallery').then(module => ({ default: module.ClientGallery })));
const Calendar = React.lazy(() => import('./pages/Calendar').then(module => ({ default: module.Calendar })));
const Billing = React.lazy(() => import('./pages/Billing').then(module => ({ default: module.Billing })));
const Settings = React.lazy(() => import('./pages/Settings').then(module => ({ default: module.Settings })));
const SeatingChart = React.lazy(() => import('./components/dashboard/events/SeatingChart').then(module => ({ default: module.SeatingChart })));

export const Router: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
};
