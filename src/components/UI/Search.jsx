import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { BiSearch } from "react-icons/bi";

export default function Search({ pathToSearch }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearchTable = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/${pathToSearch}?search=${searchText}`);
  };

  useEffect(() => {
    setSearchText("");
  }, [pathname]);
  return (
    <div className="relative">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchTable}
        placeholder="Search"
        className="outline-none pl-11 py-2 rounded-[4px]  w-[340px] bg-white "
      />
      <div
        className="w-[50px] absolute  top-0 left-0 h-full flex items-center justify-center cursor-pointer "
        onClick={() => handleSearch()}
      >
        <BiSearch className="text-gray-400 text-xl" />
      </div>
    </div>
  );
}
