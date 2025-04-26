import ClipLoader from "react-spinners/ClipLoader";

export default function Button({ onclick, children, loading, color }) {
  return (
    <button
      onClick={() => onclick()}
      className={`bg-main ${color} p-2 rounded-[4px] text-white font-medium text-base flex items-center justify-center hover:bg-main/80 transition-all duration-300 ease-in-out`}
    >
      {loading ? <ClipLoader color="#fff" size={15} /> : children}
    </button>
  );
}
