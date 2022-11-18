import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaRegTimesCircle } from "react-icons/fa";
import { AiOutlineLogin, AiOutlinePlus } from "react-icons/ai";
import { Divider } from "primereact/divider";
import { WeeklyChartAnalysis, TileAnalysisCard } from "../components";

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-8">
      <section className="dashboard-header flex items-center justify-between">
        <h3 className="font-bold text-2xl">Dashboard</h3>

        <button
          type="button"
          className="bg-primaryColor hover:bg-primaryColorDark text-white flex items-center px-5 py-3 rounded-md text-sm"
        >
          <AiOutlinePlus className="mr-2"></AiOutlinePlus>
          New Reservation
        </button>
      </section>

      <section className="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card ">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-gray-500 font-semibold">
                  Total Booked Room(s)
                </span>
                <h3 className="font-bold text-2xl">64</h3>
              </div>

              <div className="symbol w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <MdOutlineMeetingRoom className="text-blue-700 text-xl"></MdOutlineMeetingRoom>
              </div>
            </div>

            <Divider type="dashed"></Divider>

            <div className="">
              <span className="text-gray-500 text-sm">
                <a href="" className="text-blue-700 font-bold mr-1">
                  16 new booked rooms
                </a>
                today
              </span>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-gray-500 font-semibold">
                  Cancelled Rooms
                </span>
                <h3 className="font-bold text-2xl">16</h3>
              </div>

              <div className="symbol w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <FaRegTimesCircle className="text-red-600 text-xl"></FaRegTimesCircle>
              </div>
            </div>

            <Divider type="dashed"></Divider>

            <div className="">
              <span className="text-gray-500 text-sm">
                <a href="" className="text-red-600 font-bold mr-1">
                  2 cancelled rooms
                </a>
                today
              </span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-gray-500 font-semibold">
                  Checked In
                </span>
                <h3 className="font-bold text-2xl">24</h3>
              </div>

              <div className="symbol w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <AiOutlineLogin className="text-primaryColor text-xl"></AiOutlineLogin>
              </div>
            </div>

            <Divider type="dashed"></Divider>

            <div className="">
              <span className="text-gray-500 text-sm">
                <a href="" className="text-primaryColor font-bold mr-1">
                  43 reservation
                </a>
                incoming
              </span>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-gray-500 font-semibold">
                  Checked Out
                </span>
                <h3 className="font-bold text-2xl">28</h3>
              </div>

              <div className="symbol w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <AiOutlineLogin className="text-yellow-600 text-xl"></AiOutlineLogin>
              </div>
            </div>

            <Divider type="dashed"></Divider>

            <div className="">
              <span className="text-gray-500 text-sm">
                <a href="" className="text-yellow-600 font-bold mr-1">
                  34 rooms
                </a>
                available
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 flex flex-col sm:flex-col md:flex-col lg:flex-row items-start gap-x-5">
        <WeeklyChartAnalysis></WeeklyChartAnalysis>
        <TileAnalysisCard></TileAnalysisCard>
      </section>
    </section>
  );
};

export default Dashboard;
