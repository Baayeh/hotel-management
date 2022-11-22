import { Outlet } from "react-router-dom";

const FrontDesk = () => {
  return (
    <section id="front-desk" className="mt-[100px]">
      <Outlet></Outlet>
    </section>
  );
};

export default FrontDesk;
