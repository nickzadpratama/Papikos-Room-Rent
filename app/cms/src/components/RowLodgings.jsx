import { Link } from "react-router";
import Toastify from "toastify-js";
import axios from "axios";
import { baseUrl } from "./constant/baseUrl";

export default function RowLodgings({ lodging, i, fetchLodgings }) {
  async function handleDelete() {
    try {
      const { data } = await axios.delete(`${baseUrl}/lodgings/${lodging.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchLodgings();
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
      <tr className="hover:bg-gray-50 transition-colors" key={i}>
        <td className="px-6 py-4 font-medium text-gray-900">{lodging.name}</td>
        <td className="px-6 py-4">{lodging.facility}</td>
        <td className="px-6 py-4">{lodging.roomCapacity}</td>
        <td className="px-6 py-4">
          <img src={lodging.imgUrl} alt={lodging.name} />
        </td>
        <td className="px-6 py-4">{lodging.location}</td>
        <td className="px-6 py-4">{lodging.price}</td>
        <td className="px-6 py-4">{lodging.typeId}</td>
        <td className="px-6 py-4">{lodging.authorId}</td>
        <td className="px-6 py-4 flex gap-3 justify-center">
          <Link to={`/update/${lodging.id}`}>
            <span className="text-blue-600 font-medium align-center cursor-pointer">
              Edit
            </span>
          </Link>
          <Link to={`/upload/${lodging.id}`} fetchLodgings={fetchLodgings}>
            <span className="text-blue-600 font-medium cursor-pointer">
              Upload
            </span>
          </Link>
          <a
            onClick={handleDelete}
            className="text-blue-600 font-medium cursor-pointer"
          >
            Delete
          </a>
        </td>
      </tr>
    </>
  );
}
