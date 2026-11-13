import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import gifLoading from "../components/assets/vecteezy_graph-chart-vector-for-website-symbol-icon-presentation_8123525.svg";
import { Link, useParams } from "react-router";
import { baseUrl } from "../components/constant/baseUrl";

export default function LodgingDetailPage() {
  const { id } = useParams();
  const [lodging, setLodging] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchLodging() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/pub/lodgings/${id}`);
      setLodging(data.data);

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
    fetchLodging();
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
          <div className="flex flex-start p-5 rounded-md ring-3 ring-blue-500/50 mt-10">
            <div>
              <img
                src={lodging.imgUrl}
                alt="lodging image"
                className="rounded-md ring-2 ring-blue-500/50"
              />
            </div>
            <div className="flex mx-10 flex-col w-1/2">
              <b className="text-4xl mb-5">{lodging.name}</b>
              <p>
                <span className="font-semibold">Facility: </span>
                {lodging.facility}
              </p>
              <p>
                <span className="font-semibold">Room Capacity: </span>
                {lodging.roomCapacity}
              </p>
              <p>
                <span className="font-semibold">Location: </span>
                {lodging.location}
              </p>
              <p>
                <span className="font-semibold">Price: </span>
                {lodging.price}
              </p>
              <p>
                <span className="font-semibold">Type: </span>
                {lodging.typeId}
              </p>
              <Link
                to={"/"}
                className="fa-solid fa-arrow-left fa-2xl bg-rose-600 px-4 py-2 rounded-md mt-20 hover:text-white text-center"
              >
                Back
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
