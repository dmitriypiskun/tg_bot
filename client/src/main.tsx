import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { UserDetail } from "./pages/user-detail.tsx";
import { Admin } from "./pages/admin.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDetail />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
