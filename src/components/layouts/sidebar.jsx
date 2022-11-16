import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { TbBrandAirtable } from "react-icons/tb";
import { GiVacuumCleaner } from "react-icons/gi";
import { BiChevronRight } from "react-icons/bi";
import { Divider } from "primereact/divider";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

const Sidebar = ({ sidebarFullWidth, setSidebarFullWidth }) => {
  const navigate = useNavigate();
  const confirmSignOut = () => {
    confirmDialog({
      message: "Are you sure you want to sign out?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      position: "bottom",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sign Out",
      rejectLabel: "Cancel",
      accept: () => acceptSignout(),
    });
  };

  const acceptSignout = () => {
    navigate("/");
  };

  return (
    <nav
      className={`sidebar-nav ${
        sidebarFullWidth ? "w-[12%]" : "w-[5%]"
      } transition-all`}
    >
      <section className="nav-header">
        <h1 className="font-extrabold text-center pt-1">
          {sidebarFullWidth ? "HOTEL MGT SYSTEM" : "HMS"}
        </h1>
      </section>

      <button
        type="button"
        className="nav-toggle-btn"
        onClick={() => setSidebarFullWidth(!sidebarFullWidth)}
      >
        <BiChevronRight className="text-black"></BiChevronRight>
      </button>

      <button
        onClick={confirmSignOut}
        type="button"
        className="btn-icon absolute bottom-10 left-[50%] -translate-x-[50%] flex items-center"
      >
        <RiLogoutCircleRLine className="text-white text-2xl"></RiLogoutCircleRLine>
        {sidebarFullWidth && <span className="text-white ml-3">Logout</span>}
      </button>

      <Divider type="dashed"></Divider>

      <ul className="list-group mt-10">
        <li
          className={`list-group-item active ${
            sidebarFullWidth
              ? "justify-start max-w-[100%]"
              : "justify-center max-w-[100%]"
          }`}
        >
          <span className="block">
            <AiOutlineHome></AiOutlineHome>
          </span>
          {sidebarFullWidth && <span className="nav-label">Dashboard</span>}
        </li>
        <li
          className={`list-group-item ${
            sidebarFullWidth
              ? "justify-start max-w-[100%]"
              : "justify-center max-w-[100%]"
          }`}
        >
          <span className="block">
            <TbBrandAirtable></TbBrandAirtable>
          </span>
          {sidebarFullWidth && <span className="nav-label">Front Desk</span>}
        </li>
        <li
          className={`list-group-item ${
            sidebarFullWidth
              ? "justify-start max-w-[100%]"
              : "justify-center max-w-[100%]"
          }`}
        >
          <span className="block">
            <GiVacuumCleaner></GiVacuumCleaner>
          </span>
          {sidebarFullWidth && <span className="nav-label">Housekeeping</span>}
        </li>
      </ul>

      <ConfirmDialog />
    </nav>
  );
};

export default Sidebar;
