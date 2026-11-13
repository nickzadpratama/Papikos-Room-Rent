import { useState } from "react";
import Toastify from "toastify-js";
import axios from "axios";
import { baseUrl } from "../components/constant/baseUrl";
import { Navigate, useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (localStorage.access_token) {
    return <Navigate to="/" />;
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      Toastify({
        text: "Login success",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-3xl rounded-xl shadow-sm border p-16 mt-5 border-black bg-amber-100"
        >
          <h1 className="text-2xl font-bold text-center mb-4">Add New User</h1>
          <div className="mb-3">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              autoComplete="current-email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="w-full mt-5 py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
