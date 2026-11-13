export default function RowTypes({ type, i }) {
  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors" key={i}>
        <td className="px-6 py-4">{i + 1}.</td>
        <td className="px-6 py-4">{type.name}</td>
      </tr>
    </>
  );
}
