import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Toastify from "toastify-js";
import { baseUrl } from "./constant/baseUrl";

export default function Card({ lodging, i }) {
  const [type, setType] = useState("");

  async function fetchType() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/pub/types/${lodging.typeId}`,
      );

      setType(data.data);
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

  useEffect(() => {
    fetchType();
  }, []);

  return (
    <>
      <div key={i}>
        <Link to={`/${lodging.id}`}>
          <div className="h-full flex flex-col justify-center items-center hover:bg-green-400 gap-5 p-5 rounded-md ring-3 ring-blue-500/50">
            <div className="flex flex-1">
              <img
                src={lodging.imgUrl}
                className="rounded-md ring-3 ring-blue-500/50"
                alt={lodging.name}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold">{lodging.name}</h3>
              <br />
              <p>
                <span className="font-semibold">Location:</span>
                {lodging.location}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {type.name}
              </p>
              <p>
                <span className="font-semibold">Price:</span> {lodging.price}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
