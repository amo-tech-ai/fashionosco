import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ProductPhotography } from './pages/ProductPhotography';
import { ClothingPhotography } from './pages/ClothingPhotography';
import { EcommercePhotography } from './pages/EcommercePhotography';
import { Dashboard } from './pages/Dashboard';
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
      </Route>

      {/* Dashboard Routes wrapped in Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};