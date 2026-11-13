import Toastify from "toastify-js";
import { baseUrl } from "../components/constant/baseUrl";
import axios from "axios";
import { Navigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import gifLoading from "../components/assets/vecteezy_loading-bar-progress-with-green-color-vector-illustration_14945926.svg";

export default function UpdatePage() {
  const { id } = useParams();
  const [lodging, setLodging] = useState("");
  const [loading, setLoading] = useState(false);

  if (!localStorage.access_token) {
    return <Navigate to="/login" />;
  }

  async function fetchLodging() {
    try {
      const { data } = await axios.get(`${baseUrl}/lodgings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setLodging(data.data);
    } catch (error) {
      console.log(error);
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
          color: "#000000",
        },
      }).showToast();
    }
  }

  async function handleUpload(e) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      const { data } = await axios.patch(
        `${baseUrl}/lodgings/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );

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
      fetchLodging();
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
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLodging();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl flex justify-center p-10">
        Upload Image
      </h1>
      <main className="mt-5 px-10 grid grid-cols-2 gap-5">
        <div className="flex flex-col p-5">
          {loading ? (
            <>
              <div className="flex justify-center mt-28">
                <img src={gifLoading} className="w-1/5" />
              </div>
            </>
          ) : (
            <img
              src={lodging.imgUrl}
              alt={lodging.name}
              className="rounded-md ring-2 ring-black-500/50"
            />
          )}
        </div>
        <div className="flex flex-col justify-center items-center divide-y divide-black p-5">
          <h2>{lodging.name}</h2>
          <label className="fa-solid fa-upload fa-2xl cursor-pointer">
            <input type="file" className="hidden" onChange={handleUpload} />
            <div className="flex justify-between gap-3 items-center ring-3 ring-black-500/50 text-sm font-medium text-white bg-gray-700 hover:bg-black rounded-2xl shadow-md p-5 mt-5">
              <svg
                xmlns="http://w3.org"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <span>Upload Image</span>
            </div>
          </label>
        </div>
      </main>
    </>
  );
}
