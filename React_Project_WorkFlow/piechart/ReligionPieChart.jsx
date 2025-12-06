import React, { useMemo, useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import axios from "axios";

const ReligionPieChart = ({ dataArray = null, apiUrl = null }) => {

  const [rawData, setRawData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  // If apiUrl is provided, fetch data once on mount
  useEffect(() => {
    if (!apiUrl) return;
    setLoading(true);
    setError(null);

    axios
      .get(apiUrl)
      .then((res) => {
        // Expecting an array in res.data, e.g. ["Hindu","Muslim","Hindu"...] or objects that have religion property.
        setRawData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch religion data:", err);
        setError("Failed to fetch data");
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  // Choose the data source priority: api > prop > fallback sample
  const sourceArray = useMemo(() => {
    if (rawData) return rawData;
    if (dataArray) return dataArray;
    // fallback sample (your provided list)
    return [
      "Hindu","Muslim","Christian",
      "Hindu","Muslim","Christian",
      "Hindu","Muslim","Christian",
      "Hindu","Muslim"
    ];
  }, [rawData, dataArray]);

  // Normalize raw source into a simple list of strings.
  // If API returned objects like [{religion: "Hindu"}, ...], we try to handle that.
  const normalized = useMemo(() => {
    if (!Array.isArray(sourceArray)) return [];
    return sourceArray.map(item => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        // common keys to check
        return item.religion || item.religions || item.religion_name || item.religionType || "";
      }
      return String(item);
    }).filter(Boolean);
  }, [sourceArray]);

  // Count occurrences for the three religions
  const chartData = useMemo(() => {
    const counts = { Hindu: 0, Muslim: 0, Christian: 0 };
    normalized.forEach(r => {
      const trimmed = String(r).trim();
      if (counts.hasOwnProperty(trimmed)) counts[trimmed]++;
      // If you have variations (lowercase or different spellings), handle them here:
      // e.g. if (trimmed.toLowerCase() === 'hindu') counts.Hindu++;
    });

    return [
      { name: "Hindu", value: counts.Hindu },
      { name: "Muslim", value: counts.Muslim },
      { name: "Christian", value: counts.Christian }
    ];
  }, [normalized]);

  const COLORS = ["#FFBB28", "#0088FE", "#00C49F"];

  // total for checking empty
  const total = chartData.reduce((s, d) => s + d.value, 0);

  if (loading) return <div>Loading chart data...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;


  
  return (

    <div style={{ width: "100%", height: 320 }}>
      <h3 style={{ textAlign: "center", marginBottom: 8 }}>Religion Distribution</h3>

      {total === 0 ? (
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          No data available
        </div>
      ) : (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={40}      // set >0 for donut look; set to 0 for full pie
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              isAnimationActive={true}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip formatter={(value) => `${value} persons`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>

  );
};

export default ReligionPieChart;
