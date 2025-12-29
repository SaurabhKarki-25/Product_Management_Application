import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./layout/dashboardlayout";
import DashboardHome from "./Pages/DashboardHome";
import Products from "./Pages/Product";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
      
          
          <Route index element={
            <ProtectedRoute>
            <DashboardHome />
              </ProtectedRoute>
            } />

          <Route path="products" element={
            <ProtectedRoute>
            <Products />
              </ProtectedRoute>
            } />
          <Route path="products/add" element={
            <ProtectedRoute>
            <AddProduct />
              </ProtectedRoute>
            } />
          <Route path="products/edit/:id" element={
            <ProtectedRoute>
            <EditProduct />
              </ProtectedRoute>
            } />
        </Route>

        
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}
