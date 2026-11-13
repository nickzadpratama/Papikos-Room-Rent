import { BrowserRouter, Route, Routes } from "react-router";
import BaseLayout from "./components/layout/BaseLayout";
import LodgingPage from "./pages/Lodgings";
import NotFound from "./pages/NotFound";
import LodgingDetailPage from "./pages/LodgingDetail";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<LodgingPage />} />
            <Route path="/:id" element={<LodgingDetailPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
