import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "./Pages/Splash.tsx";
import Earn from "./Pages/Earns/Earn.tsx";
import Leaderboard from "./Pages/Leaderboards/Leaderboard.tsx";
import Index from "./Pages/Game/Index.tsx";
import Profile from "./Pages/Profile/Profile.tsx";
import Intro from "./Pages/Intro/Intro.tsx";

createRoot(document.getElementById("root")!).render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/index" element={<Index />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="dashboard" element={<Dashboard />}> */}
        {/* <Route index element={<RecentActivity />} />
          <Route path="project/:id" element={<Project />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  </div>
);
