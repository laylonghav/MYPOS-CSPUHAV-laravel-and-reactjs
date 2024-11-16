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
