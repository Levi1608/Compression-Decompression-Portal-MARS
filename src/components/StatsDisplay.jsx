import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatsDisplay = ({ stats }) => {
  if (!stats) return null;

  const isCompress = stats.mode === "compress";

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const chartData = [
    {
      name: isCompress ? "Original" : "Compressed",
      size: stats.inputSize,
    },
    {
      name: isCompress ? "Compressed" : "Decompressed",
      size: stats.outputSize,
    },
  ];

  const spaceSaved = stats.inputSize - stats.outputSize;
  const spaceSavedPercentage = ((spaceSaved / stats.inputSize) * 100).toFixed(1);
  const isSpaceSaved = spaceSaved > 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-10 space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          {isCompress ? "Compression" : "Decompression"} Summary
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Overview of file size, efficiency, and algorithm performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">
            {isCompress ? "Original Size" : "Compressed Size"}
          </h3>
          <p className="text-3xl font-bold text-gray-900">{formatSize(stats.inputSize)}</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">
            {isCompress ? "Compressed Size" : "Decompressed Size"}
          </h3>
          <p className="text-3xl font-bold text-blue-700">{formatSize(stats.outputSize)}</p>
        </div>
      </div>

      {/* Compression Ratio */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md">
        <h3 className="text-sm font-semibold text-gray-500 mb-1">Compression Ratio</h3>
        <p
          className={`text-4xl font-extrabold ${
            isSpaceSaved ? "text-green-600" : "text-red-600"
          }`}
        >
          {stats.compressionRatio}:1
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {isSpaceSaved
            ? `Space saved: ${formatSize(Math.abs(spaceSaved))} (${spaceSavedPercentage}%)`
            : `Size increased by: ${formatSize(Math.abs(spaceSaved))} (${spaceSavedPercentage}%)`}
        </p>
      </div>

      {/* Time and Algorithm */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md">
        <h3 className="text-sm font-semibold text-gray-500 mb-1">Processing Time</h3>
        <p className="text-3xl font-bold text-gray-900">{stats.timeTaken}ms</p>
        <p className="text-sm text-gray-600 mt-1">Algorithm Used: {stats.algorithm}</p>
      </div>

      {/* Bar Chart */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Size Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => [formatSize(value), "Size"]}
              labelFormatter={(label) => `${label} File`}
            />
            <Bar
              dataKey="size"
              fill="#2563eb" // Tailwind blue-600
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsDisplay;
