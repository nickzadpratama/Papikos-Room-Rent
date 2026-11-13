export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 bg-blue-400 rounded-2xl p-5">
        <a href="/" className="inline-block">
          <svg
            xmlns="http://w3.org"
            viewBox="0 0 80 80"
            width="25px"
            height="25px"
            className="bg-amber-50"
          >
            <g
              fill="none"
              stroke="#0052D4"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 32 L40 12 L65 32" />

              <path d="M28 32 L28 68" />
              <path d="M28 32 L50 32 C58 32 58 48 50 48 L28 48" />
            </g>
          </svg>
        </a>
      </nav>
    </>
  );
}
