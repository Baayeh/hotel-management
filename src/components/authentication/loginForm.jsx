import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const authenticate = () => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <form action="" className="w-[70%] mx-auto">
      <div className="form-group mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
        />
      </div>

      <div className="form-group mb-8">
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
        />
      </div>

      <div className="text-center">
        <button
          onClick={authenticate}
          type="button"
          className="bg-primaryColor hover:bg-primaryColorDark px-10 py-3 text-white rounded-md text-sm flex items-center justify-center min-w-max mx-auto"
        >
          {loading ? "Authenticating..." : "Sign In"}
          {loading && (
            <svg
              className="animate-spin ml-2 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
