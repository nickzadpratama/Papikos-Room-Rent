import { BrowserRouter, Route, Routes } from "react-router";
import AddUserPage from "./pages/AddUserPage";
import CreatePage from "./pages/CreatePage";
import LodgingPage from "./pages/LodgingPage";
import LoginPage from "./pages/LoginPage";
import TypePage from "./pages/TypePage";
import UpdatePage from "./pages/UpdatePage";
import UploadPage from "./pages/UploadPage";
import BaseLayout from "./components/layout/BaseLayout";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<BaseLayout />}>
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/" element={<LodgingPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
            <Route path="/upload/:id" element={<UploadPage />} />
            <Route path="/types" element={<TypePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
