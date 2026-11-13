import { useEffect, useState } from "react";
import RowTypes from "../components/RowTypes";
import { baseUrl } from "../components/constant/baseUrl";
import axios from "axios";
import { Navigate } from "react-router";
import Toastify from "toastify-js";
import gifLoading from "../components/assets/vecteezy_loading-bar-progress-with-green-color-vector-illustration_14945926.svg";

export default function TypePage() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!localStorage.access_token) {
    return <Navigate to="/login" />;
  }

  async function fetchType() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/types`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);

      setTypes(data.data);
      console.log(data);
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
    fetchType();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center mt-28">
            <img src={gifLoading} className="w-1/5" />
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl flex justify-center p-10">
            Type List
          </h1>
          <div className="flex justify-center">
            <div className="w-full max-w-md overflow-x-auto rounded-lg border-gray-200 shadow-md m-5">
              <table className="w-full border-collapse bg-white text-center text-md">
                <thead className="bg-gray-50 items-center">
                  <tr>
                    <th className="px-6 py-4 border border-gray-300">No.</th>
                    <th className="px-6 py-4 border border-gray-300">Name</th>
                  </tr>
                  {types.map((type, i) => {
                    return <RowTypes type={type} key={i} i={i} />;
                  })}
                </thead>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
