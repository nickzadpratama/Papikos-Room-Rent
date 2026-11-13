import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import Card from "../components/Card";
import gifLoading from "../components/assets/vecteezy_graph-chart-vector-for-website-symbol-icon-presentation_8123525.svg";
import { baseUrl } from "../components/constant/baseUrl";

export default function LodgingPage() {
  const [lodgings, setLodgings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pages = generatePages();

  async function fetchLodging() {
    try {
      // setLoading(true);
      // const { data } = await axios.get(
      //   `${baseUrl}/pub/lodgings?search=${search}&filter=${filter}&sort=${sort}updatedAt&page[size]=8&page[number]=${currentPage}`,
      // );
      // setLodgings(data.data);
      // setCurrentPage(+data.page);
      // setTotalPage(data.totalPage);
      // Toastify({
      //   text: data.message,
      //   duration: 3000,
      //   newWindow: true,
      //   close: true,
      //   gravity: "bottom", // `top` or `bottom`
      //   position: "right", // `left`, `center` or `right`
      //   stopOnFocus: true, // Prevents dismissing of toast on hover
      //   style: {
      //     background: "#34D399",
      //     color: "black",
      //     border: "solid #000000",
      //     borderRadius: "8px",
      //     boxShadow: "2px 2px black",
      //   },
      // }).showToast();
      // fetch("https://v3.football.api-sports.io/players/squads?team=33", {
      //   method: "GET",
      //   headers: {
      //     "x-apisports-key": "51a6f63d7c6835b341a49be3985f148c",
      //   },
      // })
      //   .then((response) => {
      //     console.log(">>>>>>>>>>>>>>", response.json());
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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

  function handleSearch(e) {
    e.preventDefault();
    fetchLodging();
  }

  function generatePages() {
    const array = [];
    for (let i = 1; i <= totalPage; i++) {
      array.push(i);
    }

    return array;
  }

  function handlePages(page) {
    setCurrentPage(page);
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  async function getSquad() {
    try {
      // const response = await fetch(
      //   "https://v3.football.api-sports.io/players/squads?team=33",
      //   {
      //     method: "GET",
      //     headers: {
      //       "x-rapidapi-host": "v3.football.api-sports.io",
      //       "x-rapidapi-key": "51a6f63d7c6835b341a49be3985f148",
      //     },
      //   },
      // );
      // // Tahap ini yang mengubah objek Response menjadi data JSON yang bisa dibaca
      // const data = await response.json();
      // console.log(data); // <--- Skuad pemain akan muncul di sini

      // team
      // fetch("https://v3.football.api-sports.io/teams?country=indonesia", {
      //   method: "GET",
      //   headers: {
      //     "x-apisports-key": "51a6f63d7c6835b341a49be3985f148c", // <-- Ganti dengan API key Anda
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data))
      //   .catch((err) => console.error(err));

      // fetch("https://v3.football.api-sports.io/players/squads?team=1571", {
      //   method: "GET",
      //   headers: {
      //     "x-apisports-key": "51a6f63d7c6835b341a49be3985f148c", // <-- Ganti dengan API key Anda
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data))
      //   .catch((err) => console.error(err));

      const response = await fetch(
        "https://v3.football.api-sports.io/teams?country=indonesia",
        {
          method: "GET",
          headers: {
            "x-apisports-key": "51a6f63d7c6835b341a49be3985f148c", // <-- Ganti dengan API key Anda
          },
        },
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   // fetchLodging();
  //   getSquad();
  // }, [currentPage, sort, filter]);

  useEffect(() => {
    getSquad();
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
          <form
            className="max-w-md mx-auto rounded-md ring-3 ring-red-500/50 mt-5 mb-10"
            onSubmit={handleSearch}
          >
            <div className="relative flex items-center w-full h-12 rounded-lg bg-white overflow-hidden">
              {/* <div > */}
              <button className="grid place-items-center h-full w-12 text-gray-300 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              {/* </div> */}
              <input
                className="peer h-full w-full outline-none text-sm text-gray-800 pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>

          <div className="flex flex-row-reverse gap-5">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex bg-rose-600 px-4 py-2 rounded-md hover:bg-white text-white hover:text-black text-sm font-medium justify-center items-center"
              >
                <span className="pr-1">Sort</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 16.5 16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              </button>
              {sortOpen && (
                <>
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <a
                      onClick={() => setSort("")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Newest
                    </a>
                    <a
                      onClick={() => setSort("-")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Oldest
                    </a>
                  </div>
                </>
              )}
            </div>

            <div className="relative inline-block text-left">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex bg-rose-600 px-4 py-2 rounded-md hover:bg-white text-white hover:text-black text-sm font-medium justify-center items-center"
              >
                <span className="pr-1">Filter</span>
                <svg
                  xmlns="http://w3.org"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                >
                  <path d="M2 4h12M4 8h8M6 12h4" />
                </svg>
              </button>
              {filterOpen && (
                <>
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <a
                      onClick={() => setFilter("Campur")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Campur
                    </a>
                    <a
                      onClick={() => setFilter("Putri")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Putri
                    </a>
                    <a
                      onClick={() => setFilter("")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Putra
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          <main className="mt-5 grid grid-cols-4 gap-5">
            {lodgings.map((lodging, i) => {
              return (
                <Card lodging={lodging} i={i} fetchLodging={fetchLodging} />
              );
            })}
          </main>

          <nav className="flex items-center justify-center gap-x-1 p-5">
            <button
              type="button"
              className="flex justify-center items-center rounded-md ring-2 ring-blue-500/50 hover:bg-fuchsia-500 hover:border-2 hover:border-black py-2 px-3 text-sm disabled:bg-fuchsia-500"
              onClick={handlePrevious}
              disabled={currentPage <= 1 ? true : false}
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="{2}"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-x-1">
              {pages.map((page) => {
                return (
                  <div key={page}>
                    <button
                      type="button"
                      className={
                        page === currentPage
                          ? "flex justify-center items-center bg-fuchsia-500 py-2 px-3 text-sm rounded-md ring-2 ring-blue-500/50"
                          : "flex justify-center items-center rounded-md ring-2 ring-blue-500/50 hover:bg-fuchsia-500 hover:border-2 text-sm"
                      }
                      onClick={() => handlePages(page)}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="flex justify-center items-center rounded-md ring-2 ring-blue-500/50 hover:bg-fuchsia-500 hover:border-2 hover:border-black py-2 px-3 text-sm disabled:bg-fuchsia-500"
              onClick={handleNext}
              disabled={currentPage >= totalPage ? true : false}
            >
              <span>Next</span>
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="{2}"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </nav>
        </>
      )}
    </>
  );
}
