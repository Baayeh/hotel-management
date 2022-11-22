import { useState } from "react";
import { Sidebar, TopNavbar } from "../../components";
import { Outlet } from "react-router-dom";

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
        className={`main ml-auto ${
          sidebarFullWidth ? "lg:w-[87%] md:w-[73%]" : "lg:w-[94%] md:w-[87%]"
        } `}
      >
        <TopNavbar sidebarFullWidth={sidebarFullWidth}></TopNavbar>

        <div className="main-outlet mt-[64px]">
          <Outlet></Outlet>
        </div>
      </main>
    </section>
  );
};

export default AppWrapper;
