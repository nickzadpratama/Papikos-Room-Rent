import { useNavigate, useParams, Navigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { baseUrl } from "../components/constant/baseUrl";
import { useEffect } from "react";
import LodgingForm from "../components/LodgingForm";

export default function UpdatePage() {
  const { id } = useParams();
  const [lodging, setLodging] = useState("");
  const navigate = useNavigate();

  if (!localStorage.access_token) {
    return <Navigate to="/login" />;
  }

  async function handleSubmit(e, form) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${baseUrl}/lodgings/${lodging.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );

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

  async function fetchLodging() {
    try {
      const { data } = await axios.get(`${baseUrl}/lodgings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setLodging(data.data);
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
          color: "#000000",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchLodging();
  }, []);

  return (
    <>
      <LodgingForm
        nameProp={"Edit Lodging"}
        lodging={lodging}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
