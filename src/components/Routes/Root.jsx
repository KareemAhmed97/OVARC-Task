import { Outlet } from "react-router";
import { Sidebar } from "../layout/Sidebar";
import Header from "../layout/Header/Header";

export default function Root() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 z-20 ">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col ml-[282px] mr-8 w-[calc(100%-282px)] min-h-screen">
        <div className="fixed left-[282px] top-0 right-0  z-[10000] mr-8 bg-[#f1f1f1]">
          <Header />
        </div>

        <div className="mt-[130px] pb-10  overflow-y-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
