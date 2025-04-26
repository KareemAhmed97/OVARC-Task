import { useState } from "react";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Logo from "/logo.svg";
import ShopSvg from "../../assets/images/Svgs/ShopSvg";
import StoreSvg from "../../assets/images/Svgs/StoreSvg";
import AuthorSvg from "../../assets/images/Svgs/AuthorSvg";
import BookSvg from "../../assets/images/Svgs/BookSvg";

const pages = [
  {
    id: 1,
    name: "Shop",
    icon: <ShopSvg />,
  },
  {
    id: 2,
    name: "Stores",
    icon: <StoreSvg />,
  },
  {
    id: 3,
    name: "Author",
    icon: <AuthorSvg />,
  },
  {
    id: 4,
    name: "Books",
    icon: <BookSvg />,
  },
];
export function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState("");
  useEffect(() => {
    const path = location.pathname.substring(1);
    const page = pages.find(
      (page) => page.name.toLowerCase() === path.toLowerCase()
    );
    if (page) {
      setActive(page.id);
    }
  }, [location]);
  console.log(location.pathname.substring(1));
  console.log(active);
  return (
    <div className="min-h-screen bg-white flex flex-col pt-[50px] pb-8 pr-[30px]  gap-[50px] w-full">
      <Link to="/" className="flex items-center gap-[10px] pl-[29px]">
        <div className="size-[50px]  ">
          <img src={Logo} alt="Logo" className="size-full" />
        </div>
        <p className="text-lg">
          <strong>BOOK</strong> WORLD
        </p>
      </Link>

      <nav className="flex-1 w-full pl-10">
        <ul className="space-y-6">
          {pages.map((page) => (
            <li key={page.id} className="relative">
              {page.id == active && (
                <div className="absolute w-[3px] h-full bg-main rounded-r-md -left-[40px] top-0"></div>
              )}
              <Link
                onClick={() => setActive(page.id)}
                to={`/${page.name.toLowerCase()}`}
                className={`flex items-center gap-[15px] h-[40px] duration-200 ${
                  page.id === active
                    ? "text-main"
                    : "text-gray-400 hover:text-main"
                }`}
              >
                <div className="text-3xl">{page.icon}</div>
                <p>{page.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pl-10">
        <button className="flex items-center gap-[15px] h-[40px] text-gray-400 hover:text-main">
          <div className="w-10 h-10 flex items-center justify-center rounded-md">
            <BiLogOut className="text-3xl" />
          </div>
          <p>Log Out</p>
        </button>
      </div>
    </div>
  );
}
