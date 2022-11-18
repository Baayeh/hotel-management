import { RiBuilding2Fill, RiReservedLine } from "react-icons/ri";
import { BiBell, BiMessageSquareDetail } from "react-icons/bi";
import { BsCalendar2Check, BsSignpostSplit } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const TopNavbar = ({ sidebarFullWidth }) => {
  const location = useLocation();

  const updateNavbarTitle = () => {
    if (location.pathname.startsWith("/dashboard")) {
      return (
        <div className="font-bold md:text-lg lg:text-xl flex items-center">
          <RiBuilding2Fill className="text-4xl mr-2 text-primaryColor"></RiBuilding2Fill>
          Welcome to Hotel Management System
        </div>
      );
    } else if (location.pathname.startsWith("/front-desk")) {
      return (
        <ul className="list-group">
          <NavLink to="front-desk" className="list-group-item" end>
            <RiReservedLine className="mr-1 text-lg"></RiReservedLine>
            Overview
          </NavLink>
          <NavLink to="front-desk/availables" className="list-group-item" end>
            <BsCalendar2Check className="mr-1 text-lg"></BsCalendar2Check>
            Availables
          </NavLink>
          <NavLink to="checkin-checkout" className="list-group-item">
            <BsSignpostSplit className="mr-1 text-lg"></BsSignpostSplit>
            Checkin/Checkout
          </NavLink>
          <NavLink to="guests" className="list-group-item">
            <FiUsers className="mr-1 text-lg"></FiUsers>
            Guests
          </NavLink>
        </ul>
      );
    }
  };

  return (
    <nav
      className={`top-nav ${
        sidebarFullWidth ? "lg:w-[86%] md:w-[70%]" : "lg:w-[92%] md:w-[84%]"
      }`}
    >
      {updateNavbarTitle()}
      <div className="auth-section flex items-center gap-x-5">
        <BiBell></BiBell>

        <span className="relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryColorLight opacity-75 -top-[10px] -right-[10px]"></span>
          <span className="absolute inline-flex rounded-full h-3 w-3 bg-primaryColorLight -top-[5px] -right-[5px]"></span>
          <BiMessageSquareDetail></BiMessageSquareDetail>
        </span>

        <div className="auth-info flex items-center cursor-pointer">
          <div className="mr-3 text-right">
            <span className="font-extrabold text-sm leading-none block mb-1">
              John Smith
            </span>
            <span className="block text-gray-400 text-xs italic">#001212</span>
          </div>
          <div className="auth-symbol w-10 h-10 rounded-full bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80')]"></div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
