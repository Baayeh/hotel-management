import { useEffect, useState } from "react";
import { startOfWeek, endOfWeek } from "date-fns";
import { Calendar } from "primereact/calendar";
import { BsCalendar2Week } from "react-icons/bs";
import Chart from "react-apexcharts";

const WeeklyChartAnalysis = () => {
  const [daterange, setDateRange] = useState();
  const [weeklyChart, setWeeklyChart] = useState(null);

  useEffect(() => {
    setDateRange([startOfWeek(new Date()), endOfWeek(new Date())]);

    setWeeklyChart({
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      options: {
        chart: {
          height: 250,
          type: "area",
        },
        colors: ["#228B22"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    });
  }, []);

  return (
    <div className="weekly-revenue-analysis card w-[60%]">
      <div className="card-header flex items-center justify-between p-4">
        <h1 className="font-semibold">Weekly Revenue Report</h1>

        <div className="flex items-center">
          <BsCalendar2Week className="mr-2"></BsCalendar2Week>
          <Calendar
            id="daterange"
            value={daterange}
            onChange={(e) => setDateRange(e.value)}
            selectionMode="range"
            readOnlyInput
            dateFormat="M d, yy"
          />
        </div>
      </div>
      <div className="card-body p-5">
        {weeklyChart && (
          <Chart
            options={weeklyChart && weeklyChart.options}
            series={weeklyChart && weeklyChart.series}
            type="area"
            height="300"
          />
        )}
      </div>
    </div>
  );
};

export default WeeklyChartAnalysis;
