import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import Layout from "./layouts/Layout";
import HomePage from "./pages/Home";
import Insights from "./pages/Insights";
import Leaderboard from "./pages/Leaderboard";
import SettingsPage from "./pages/Settings";
import CommunityAdmin from "./pages/CommunityAdmin";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/community-admin" element={<CommunityAdmin />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
/**
export default function Router() {
  return <BrowserRouter>

    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
}
*/



