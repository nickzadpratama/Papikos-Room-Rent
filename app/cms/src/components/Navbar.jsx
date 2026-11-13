import { Link, NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <nav className="sticky top-0 bg-blue-400 flex justify-between rounded-2xl shadow-md p-5">
        <Link to={"/"}>
          <div className="flex">
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 80 80"
              width="25px"
              height="25px"
            >
              <g
                fill="none"
                stroke="#0052D4"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15 32 L40 12 L65 32" />

                <path d="M28 32 L28 68" />
                <path d="M28 32 L50 32 C58 32 58 48 50 48 L28 48" />
              </g>
            </svg>
          </div>
        </Link>
        <div className="flex gap-5 text-white">
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive
                ? "font-bold px-6 cursor-pointer underline"
                : "px-6 cursor-pointer"
            }
          >
            <span>Add Lodging</span>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold px-6 cursor-pointer underline"
                : "px-6 cursor-pointer"
            }
          >
            <span>Lodging List</span>
          </NavLink>
          <NavLink
            to="/types"
            className={({ isActive }) =>
              isActive
                ? "font-bold px-6 cursor-pointer underline"
                : "px-6 cursor-pointer"
            }
          >
            <span>Type List</span>
          </NavLink>
          <NavLink
            to="/add-user"
            className={({ isActive }) =>
              isActive
                ? "font-bold px-6 cursor-pointer underline"
                : "px-6 cursor-pointer"
            }
          >
            <span>Add User</span>
          </NavLink>
        </div>
        <a
          className="px-6 cursor-pointer hover:text-white"
          onClick={handleLogout}
        >
          <span>Logout</span>
        </a>
      </nav>
    </>
  );
}
