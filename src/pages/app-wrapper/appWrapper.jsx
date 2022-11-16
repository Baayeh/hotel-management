import { useState } from "react";
import { Sidebar } from "../../components";
import { BiBell, BiMessageSquareDetail } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { RiBuilding2Fill } from "react-icons/ri";

const AppWrapper = () => {
  const [sidebarFullWidth, setSidebarFullWidth] = useState(false);

  return (
    <section
      id="app-wrapper"
      className="bg-greyBaseColor p-3 flex items-start gap-x-5 min-h-screen h-full"
    >
      <Sidebar
        sidebarFullWidth={sidebarFullWidth}
        setSidebarFullWidth={setSidebarFullWidth}
      ></Sidebar>

      <main
        className={`main ml-auto ${sidebarFullWidth ? "w-[87%]" : "w-[94%]"}`}
      >
        <nav className={`top-nav ${sidebarFullWidth ? "w-[86%]" : "w-[92%]"}`}>
          <div className="font-bold text-xl flex items-center">
            <RiBuilding2Fill className="text-4xl mr-2 text-primaryColor"></RiBuilding2Fill>
            Welcome to Hotel Management System
          </div>
          <div className="auth-section flex items-center gap-x-5">
            <BiBell></BiBell>

            <span class="relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryColorLight opacity-75 -top-[10px] -right-[10px]"></span>
              <span class="absolute inline-flex rounded-full h-3 w-3 bg-primaryColorLight -top-[5px] -right-[5px]"></span>
              <BiMessageSquareDetail></BiMessageSquareDetail>
            </span>

            <div className="auth-info flex items-center cursor-pointer">
              <div className="mr-3 text-right">
                <span className="font-extrabold text-sm leading-none block mb-1">
                  John Smith
                </span>
                <span className="block text-gray-400 text-xs italic">
                  #001212
                </span>
              </div>
              <div className="auth-symbol w-10 h-10 rounded-full bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80')]"></div>
            </div>
          </div>
        </nav>

        <div className="main-outlet mt-[64px]">
          <Outlet></Outlet>
        </div>
      </main>
    </section>
  );
};

export default AppWrapper;
