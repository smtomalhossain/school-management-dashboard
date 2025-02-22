"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const CountChart = ({ male, female }: { male: number; female: number }) => {
  const total = male + female;
  const malePercentage = total > 0 ? ((male / total) * 100).toFixed(1) : "0";
  const femalePercentage = total > 0 ? ((female / total) * 100).toFixed(1) : "0";

  const data = [
    {
      name: "Total",
      count: total,
      fill: "white",
    },
    {
      name: "Girls",
      count: female,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: male,
      fill: "#C3EBFA",
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1 text-center">
          <div className="w-5 h-5 bg-tomSky rounded-full" />
          <h1 className="font-bold">{male}</h1>
          <h2 className="text-xs text-gray-300">Boys ({malePercentage}%)</h2>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <div className="w-5 h-5 bg-tomYellow rounded-full" />
          <h1 className="font-bold">{female}</h1>
          <h2 className="text-xs text-gray-300">Girls ({femalePercentage}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;