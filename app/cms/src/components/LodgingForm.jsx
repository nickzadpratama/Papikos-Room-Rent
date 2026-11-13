import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import { baseUrl } from "./constant/baseUrl";
import Button from "./Button";

export default function LodgingForm({ nameProp, lodging, handleSubmit }) {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    facility: "",
    roomCapacity: 0,
    imgUrl: "",
    location: "",
    price: 0,
    typeId: 0,
  });

  useEffect(() => {
    if (lodging) {
      setForm({
        name: lodging.name,
        facility: lodging.facility,
        roomCapacity: lodging.roomCapacity,
        imgUrl: lodging.imgUrl,
        location: lodging.location,
        price: lodging.price,
        typeId: lodging.typeId,
      });
    }
  }, [lodging]);

  function getFormData(fieldName, e) {
    let value = e.target.value;
    if (
      fieldName === "roomCapacity" ||
      fieldName === "price" ||
      fieldName === "typeId" ||
      fieldName === "authorId"
    ) {
      value = +e.target.value;
    }

    setForm((prevData) => {
      return {
        ...prevData,
        [fieldName]: value,
      };
    });
  }

  async function fetchTypes() {
    try {
      const { data } = await axios.get(`${baseUrl}/types`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setTypes(data.data);
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
    fetchTypes();
  }, []);

  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        {/* <div class="w-full max-w-md bg-white rounded-xl shadow-sm border p-6"> */}
        <form
          className="w-full max-w-3xl rounded-xl shadow-sm border p-16 mt-5 border-black bg-amber-100"
          onSubmit={(e) => handleSubmit(e, form)}
        >
          <h1 className="text-2xl font-bold text-center mb-4">{nameProp}</h1>
          <div className="mb-3">
            <label className="block mb-1.5">Lodging Name:</label>
            <input
              type="text"
              placeholder="Lodging Name"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              value={form.name}
              onChange={(e) => getFormData("name", e)}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1.5">Facility:</label>
            <textarea
              className="w-90 h-20 px-2 py-1 rounded-md ring-3 ring-black-500/50"
              placeholder="Facility"
              value={form.facility}
              onChange={(e) => getFormData("facility", e)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="block mb-1.5">Room Capacity:</label>
            <input
              type="number"
              placeholder="Room Capacity"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              onChange={(e) => getFormData("roomCapacity", e)}
              value={form.roomCapacity}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1.5">Image URL:</label>
            <input
              type="text"
              placeholder="Image URL"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              value={form.imgUrl}
              onChange={(e) => getFormData("imgUrl", e)}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1.5">Location:</label>
            <input
              type="text"
              placeholder="Location"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              value={form.location}
              onChange={(e) => getFormData("location", e)}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1.5">Price</label>
            <input
              type="number"
              placeholder="Price"
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              value={form.price}
              onChange={(e) => getFormData("price", e)}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1.5">Type:</label>
            <select
              className="px-2 py-1 rounded-md ring-3 ring-black-500/50"
              value={form.type}
              onChange={(e) => getFormData("typeId", e)}
            >
              {lodging ? (
                ""
              ) : (
                <option selected disabled>
                  --Choose--
                </option>
              )}
              {types.map((el) => {
                return (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </select>
          </div>
          <Button nameProp={nameProp} />
        </form>
      </div>
      {/* </div> */}
    </>
  );
}
