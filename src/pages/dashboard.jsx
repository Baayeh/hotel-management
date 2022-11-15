import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineMeetingRoom } from "react-icons/md";

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

      <section className="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="card bg-white rounded-lg cursor-pointer">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-gray-500">New Booked Rooms</span>
                <h3 className="font-bold text-2xl">64</h3>
              </div>

              <div className="symbol w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center">
                <MdOutlineMeetingRoom className="text-blue-700 text-xl"></MdOutlineMeetingRoom>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-white rounded-lg">
          <div className="card-body p-3"></div>
        </div>
        <div className="card bg-white rounded-lg">
          <div className="card-body p-3"></div>
        </div>
        <div className="card bg-white rounded-lg">
          <div className="card-body p-3"></div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
