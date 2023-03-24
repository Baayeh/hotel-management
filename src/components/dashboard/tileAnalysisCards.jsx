import { MdOutlinePayments } from "react-icons/md";
import { FiChevronsRight } from "react-icons/fi";
import { BsCheck2Square } from "react-icons/bs";
import { AiOutlineKey, AiOutlineUserSwitch } from "react-icons/ai";

const TileAnalysisCard = () => {
  return (
    <div className="w-full md:w-full lg:w-[40%]">
      <div className="card mb-3">
        <div className="card-body flex items-center justify-between py-5 pl-4 pr-10">
          <section className="flex items-center">
            <div className="symbol w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <AiOutlineKey className="text-blue-700 text-xl"></AiOutlineKey>
            </div>

            <div className="ml-3">
              <span className="block text-gray-400 font-semibold text-sm">
                Total Rooms
              </span>
              <h1 className="text-lg font-extrabold">82</h1>
            </div>
          </section>

          <button type="button" className="btn-icon">
            <FiChevronsRight className="text-xl"></FiChevronsRight>
          </button>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body flex items-center justify-between py-5 pl-4 pr-10">
          <section className="flex items-center">
            <div className="symbol w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <BsCheck2Square className="text-green-700 text-xl"></BsCheck2Square>
            </div>

            <div className="ml-3">
              <span className="block text-gray-400 font-semibold text-sm">
                Available Rooms
              </span>
              <h1 className="text-lg font-extrabold">44</h1>
            </div>
          </section>

          <button type="button" className="btn-icon">
            <FiChevronsRight className="text-xl"></FiChevronsRight>
          </button>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body flex items-center justify-between py-5 pl-4 pr-10">
          <section className="flex items-center">
            <div className="symbol w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
              <AiOutlineUserSwitch className="text-red-700 text-xl"></AiOutlineUserSwitch>
            </div>

            <div className="ml-3">
              <span className="block text-gray-400 font-semibold text-sm">
                Staffs
              </span>
              <h1 className="text-lg font-extrabold">44</h1>
            </div>
          </section>

          <button type="button" className="btn-icon">
            <FiChevronsRight className="text-xl"></FiChevronsRight>
          </button>
        </div>
      </div>

      <div className="card mb-5">
        <div className="card-body flex items-center justify-between py-5 pl-4 pr-10">
          <section className="flex items-center">
            <div className="symbol w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
              <MdOutlinePayments className="text-indigo-700 text-xl"></MdOutlinePayments>
            </div>

            <div className="ml-3">
              <span className="block text-gray-400 font-semibold text-sm">
                Pending Payments
              </span>
              <h1 className="text-base font-extrabold">GHS21,222.00</h1>
            </div>
          </section>

          <button type="button" className="btn-icon">
            <FiChevronsRight className="text-xl"></FiChevronsRight>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TileAnalysisCard;
