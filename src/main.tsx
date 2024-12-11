import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/Pages/Index.tsx";
import Leaderboard from "./components/Pages/Leaderboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        {/* <Route path="dashboard" element={<Dashboard />}> */}
          {/* <Route index element={<RecentActivity />} />
          <Route path="project/:id" element={<Project />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
