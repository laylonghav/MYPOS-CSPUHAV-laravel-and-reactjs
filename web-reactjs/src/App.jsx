import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/home/HomePage";
import AboutePage from "./page/Aboute/AboutePage";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";
import RouteNotfound from "./page/error-Page/404";
import MainLayout from "./component/layout/MainLayout";
import MainLayoutLogin from "./component/layout/MainLayoutLogin";
import ProductPage from "./page/product/ProductPage";
import RolePage from "./page/role/RolePage";
import CategoryPage from "./page/category/CategoryPage";
import ProvincePage from "./page/province/ProvincePage";
import CustomerPage from "./page/customer/CustomerPage";
import BrandPage from "./page/brand/BrandPage";
import PosPage from "./page/pos/PosPage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/role" element={<RolePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/province" element={<ProvincePage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/pos" element={<PosPage />} />
            <Route path="*" element={<RouteNotfound />} />
          </Route>
          <Route element={<MainLayoutLogin />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<RouteNotfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
