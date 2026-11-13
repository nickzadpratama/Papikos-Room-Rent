import Button from "../components/Button";
import Toastify from "toastify-js";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../components/constant/baseUrl";
import { Navigate, useNavigate } from "react-router";

export default function AddUserPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    address: "",
  });

  if (!localStorage.access_token) {
    return <Navigate to="/login" />;
  }

  function setUserForm(name, value) {
    setForm((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e, form) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/add-user`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: data.message,
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
          className="w-full max-w-3xl rounded-xl shadow-sm border p-16 mt-5 border-black bg-amber-100"
          onSubmit={(e) => handleSubmit(e, form)}
        >
          <h1 className="text-2xl font-bold text-center mb-4">Add New User</h1>
          <div className="mb-3">
            <label className="block">Username:</label>
            <input
              type="text"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              placeholder="Username"
              onChange={(e) => {
                setUserForm("username", e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="block">Email:</label>
            <input
              type="text"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              placeholder="contoh@email.com"
              onChange={(e) => {
                setUserForm("email", e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block">Password:</label>
            <input
              type="password"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              placeholder="Input your password "
              onChange={(e) => {
                setUserForm("password", e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block">Phone Number:</label>
            <input
              type="text"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              placeholder="Input Phone Number"
              onChange={(e) => {
                setUserForm("phoneNumber", e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="block">Address:</label>
            <textarea
              className="w-90 h-20 px-2 py-1 rounded-md ring-3 ring-black-500/50"
              placeholder="Facility"
              onChange={(e) => {
                setUserForm("address", e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <Button nameProp="Add User" />
          </div>
        </form>
      </div>
    </>
  );
}
