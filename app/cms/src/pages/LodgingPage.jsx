import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import Toastify from "toastify-js";
import axios from "axios";
import RowLodgings from "../components/RowLodgings";
import { baseUrl } from "../components/constant/baseUrl";
import gifLoading from "../components/assets/vecteezy_loading-bar-progress-with-green-color-vector-illustration_14945926.svg";

export default function LodgingsPage() {
  const [lodgings, setLodgings] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!localStorage.access_token) {
    return <Navigate to="/login" />;
  }

  async function fetchLodgings() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/lodgings`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setLodgings(data.data);

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLodgings();
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
            Lodging List
          </h1>
          <div className="overflow-x-auto rounded-lg border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-center">
                <tr>
                  <th className="px-6 py-4 border font-semibold border-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-4 border font-semibold border-gray-300">
                    Facility
                  </th>
                  <th className="px-6 py-4 border font-semibold border-gray-300">
                    Room Capacity
                  </th>
                  <th className="px-6 py-4 border font-semibold border-gray-300">
                    Image URL
                  </th>
                  <th className="px-6 py-4 border font-semibold border-gray-300">
                    Location
                  </th>
                  <th className="px-6 py-4 border font-semibold border-gray-300">
                    Price
                  </th>
                  <th className="px-6 py-4 border font-semibold border-gray-300">
                    Type
                  </th>
                  <th className="px-6 py-4 border font-semibold border-gray-300">
                    Author Id
                  </th>
                  <th className="px-6 py-4 border font-semibold border-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {lodgings.map((lodging, i) => {
                  return (
                    <RowLodgings
                      lodging={lodging}
                      key={i}
                      i={i}
                      fetchLodgings={fetchLodgings}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
