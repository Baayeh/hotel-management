import { RiBuilding2Fill } from "react-icons/ri";

const Login = () => {
  return (
    <section id="Login-section" className="login-screen">
      <div className="login-card bg-white shadow-lg rounded-2xl w-[30%] mx-auto absolute z-10">
        <div className="card-body py-6 px-4">
          <div className="flex justify-center">
            <RiBuilding2Fill className="text-6xl"></RiBuilding2Fill>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
