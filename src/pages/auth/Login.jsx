import { RiBuilding2Fill } from "react-icons/ri";
import { Divider } from "primereact/divider";
import { LoginForm } from "../../components";

const Login = () => {
  return (
    <section id="Login-section" className="login-screen">
      <section className="absolute z-10 w-[90%] sm:w-[90%] md:w-[50%] lg:w-[30%] mx-auto">
        <svg
          className="blob-1 -z-10 absolute w-[600px] -top-[170px] -left-[150px] hidden sm:hidden md:block"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#228B22"
            d="M42.9,-11.3C52.1,14.4,53.7,45.3,38.1,58C22.4,70.7,-10.5,65.2,-29.5,49.3C-48.6,33.4,-53.8,7.1,-46.6,-15.9C-39.3,-38.9,-19.7,-58.6,-1.4,-58.2C16.8,-57.7,33.7,-37.1,42.9,-11.3Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="blob-2 -z-10 absolute w-[600px] -top-[75px] -left-[110px] rotate-[218deg] hidden sm:hidden md:block"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#F1C21B"
            d="M53.8,-43.2C69.6,-38,82.2,-19,77.7,-4.5C73.2,10,51.6,20,35.8,33.4C20,46.7,10,63.5,-4.5,68C-19,72.5,-38.1,64.8,-53.3,51.4C-68.6,38.1,-80.1,19,-80.2,0C-80.2,-19.1,-68.8,-38.2,-53.5,-43.4C-38.2,-48.5,-19.1,-39.8,-0.1,-39.7C19,-39.7,38,-48.3,53.8,-43.2Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="blob-3 -z-10 absolute w-[600px] -top-[200px] -left-[30px] rotate-[386deg] hidden sm:hidden md:block"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#3ad59f"
            d="M20.1,-23.7C32.5,-23.3,53.5,-28.6,65.5,-23.7C77.5,-18.7,80.5,-3.3,78.9,11.7C77.2,26.7,70.9,41.3,58.7,45.3C46.5,49.2,28.5,42.5,13.2,48.6C-2.1,54.7,-14.6,73.6,-22.2,72.8C-29.9,71.9,-32.6,51.2,-33.4,36.6C-34.2,21.9,-33.2,13.3,-29.3,7.3C-25.5,1.2,-18.8,-2.1,-16.1,-7.1C-13.4,-12,-14.7,-18.5,-12.7,-23.7C-10.7,-28.8,-5.4,-32.7,-0.8,-31.5C3.8,-30.3,7.7,-24.1,20.1,-23.7Z"
            transform="translate(100 100)"
          />
        </svg>

        <div className="login-card bg-white shadow-lg rounded-lg w-full">
          <div className="card-body py-10 px-5">
            <div className="flex items-center justify-center">
              <RiBuilding2Fill className="text-6xl text-primaryColor"></RiBuilding2Fill>
              <h6 className="ml-2 font-bold">Hotel Management System</h6>
            </div>

            <h6 className="text-center font-extrabold my-4">
              LOGIN TO CONTINUE
            </h6>

            <LoginForm></LoginForm>

            <span className="block italic text-gray-400 text-sm mt-4 text-center">
              <a href="">I don't remember my password!</a>
            </span>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Login;
