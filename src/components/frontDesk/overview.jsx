import { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineUserAdd,
  AiOutlineSearch,
  AiOutlineExport,
} from "react-icons/ai";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DataGrid } from "@mui/x-data-grid";

const filterCategories = [];

const columns = [
  { field: "roomno", type: "number", headerName: "Room No", flex: 1 },
  {
    field: "roomstate",
    type: "number",
    headerName: "Romm State",
    flex: 1,
    renderCell: (params) => {
      console.log(params, "params");
      return (
        <span
          className={`text-white w-full h-full flex items-center justify-center ${
            params.value === "Clean" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {params.value}
        </span>
      );
    },
  },
  { field: "roomType", type: "number", headerName: "Room Type", flex: 1 },
  {
    field: "guest",
    headerName: "Guest Name",
    type: "number",
    flex: 1,
  },
  {
    field: "occupantNo",
    headerName: "No of Occupant",
    type: "number",
    flex: 1,
  },
  {
    field: "checkin",
    headerName: "Check In",
    type: "string",
    flex: 1,
  },
  {
    field: "checkout",
    headerName: "Check Out",
    type: "string",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Room Price",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {
      return (
        <button
          type="button"
          className="btn bg-white border border-gray-200 hover:bg-gray-200 px-3 py-2 rounded-md text-sm ml-4 flex items-center"
        >
          Details
        </button>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    roomno: 109,
    roomstate: "Clean",
    roomType: "Standard",
    guest: "Chia Forster",
    occupantNo: 3,
    checkin: "Mon, July, 12, 2012",
    checkout: "Mon, July, 12, 2012",
    price: 500.0,
  },
  {
    id: 2,
    roomno: 213,
    roomstate: "Clean",
    roomType: "Executive",
    guest: "Moreno Diaz",
    occupantNo: 1,
    checkin: "Mon, July, 12, 2012",
    checkout: "Mon, July, 12, 2012",
    price: 2500.0,
  },
  {
    id: 3,
    roomno: 217,
    roomstate: "Dirty",
    roomType: "Standard",
    guest: "Martin Iglesias",
    occupantNo: 1,
    checkin: "Mon, July, 12, 2012",
    checkout: "Mon, July, 12, 2012",
    price: 2500.0,
  },
  {
    id: 5,
    roomno: 300,
    roomstate: "Dirty",
    roomType: "Standard",
    guest: "Lana Magdalena",
    occupantNo: 1,
    checkin: "Mon, July, 12, 2012",
    checkout: "Mon, July, 12, 2012",
    price: 2500.0,
  },
];

const FrontDeskOverview = () => {
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  return (
    <section id="frontDeskOverview" className="bg-white rounded-lg p-5">
      <section className="overview-header flex items-center justify-between">
        <h3 className="font-bold text-2xl">Reservation Overview</h3>

        <div className="flex items-center">
          <button
            type="button"
            className="bg-primaryColor hover:bg-primaryColorDark text-white flex items-center px-5 py-3 rounded-md text-sm mr-3"
          >
            <AiOutlinePlus className="mr-2"></AiOutlinePlus>
            New Reservation
          </button>
          <button
            type="button"
            className="bg-white hover:bg-primaryColorDark hover:text-white border border-primaryColor text-primaryColorDark flex items-center px-5 py-3 rounded-md text-sm font-semibold"
          >
            <AiOutlineUserAdd className="mr-2"></AiOutlineUserAdd>
            Check Guest In
          </button>
        </div>
      </section>

      <Divider />

      <section className="flex items-center w-full gap-x-10">
        <span className="p-input-icon-left w-[80%]">
          <AiOutlineSearch></AiOutlineSearch>
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for guest name / check-in date..."
            className="w-[100%] p-inputtext-sm"
          />
        </span>

        <div className="w-[20%] flex items-center">
          <Dropdown
            value={filterSearch}
            options={filterCategories}
            optionLabel="name"
            placeholder="Filter table..."
          />
          <button
            className="export-btn bg-white border border-gray-200 hover:bg-gray-200 px-3 py-2 rounded-md text-sm ml-4 flex items-center font-semibold"
            type="button"
          >
            <AiOutlineExport className="mr-1"></AiOutlineExport>
            Export
          </button>
        </div>
      </section>

      <section className="h-[350px] mt-5">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </section>
    </section>
  );
};

export default FrontDeskOverview;
