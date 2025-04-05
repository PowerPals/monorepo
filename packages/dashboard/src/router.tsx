import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import HomePage from "./pages/Home";

export default function Router() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
}
