export default function Button({ nameProp, cam }) {
  return (
    <button className="ring-3 ring-black-500/50 text-sm font-medium text-white bg-gray-700 hover:bg-black rounded-2xl shadow-md p-3 mt-10">
      {nameProp} {cam}
    </button>
  );
}
