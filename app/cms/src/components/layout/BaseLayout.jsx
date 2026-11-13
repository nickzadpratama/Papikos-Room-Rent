import { Navigate, Outlet } from "react-router";
import Navbar from "../Navbar";

export default function BaseLayout() {
  if (!localStorage.access_token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="px-5 py-2">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
