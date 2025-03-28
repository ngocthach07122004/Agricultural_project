import React from "react";
import "./styles.scss";
import Chart from "react-apexcharts";
import { FaTree } from "react-icons/fa";
import {
  WiThermometer,
  WiHumidity,
  WiRaindrops,
  WiDaySunny,
} from "react-icons/wi";

/**
 * Ví dụ minh họa:
 * - Temperature: °C
 * - Humidity: RH%
 * - Soil Moisture: %
 * - Light: lx
 */
const Dashboard = () => {
  // Thông số môi trường (giả lập)
  const temperature = 28; // °C
  const humidity = 65; // RH%
  const soilMoisture = 55; // %
  const lightLevel = 200; // lx

  // Thông tin cây
  const treeName = "Cây Xoài";
  const location = "Nhà Kính A";

  // Biểu đồ cột so sánh (Sáng vs Chiều)
  const barOptions = {
    chart: { type: "bar" },
    xaxis: {
      categories: ["Temp (°C)", "Humidity (%)", "Soil (%)", "Light (lx)"],
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
      },
    },
    colors: ["#4caf50", "#ffc107"], // Màu cột Sáng (xanh lá), Chiều (vàng)
    dataLabels: { enabled: true },
    legend: { position: "top" },
  };
  // Giá trị Sáng vs Chiều (VD: Sáng 25°C, Chiều 30°C, v.v.)
  const barSeries = [
    {
      name: "Sáng",
      data: [25, 60, 50, 150], // (Temp, Humi, Soil, Light)
    },
    {
      name: "Chiều",
      data: [30, 65, 55, 220],
    },
  ];

  return (
    <div className="dashboard container py-4">
      {/* Tiêu đề */}
      <div className="text-center mb-4">
        <h1 className="dashboard-title">SmartGrow Dashboard</h1>
        <p className="dashboard-subtitle">
          Giám sát & Quản lý môi trường trồng trọt
        </p>
      </div>

      {/* Card Cây */}
      <div className="tree-card card shadow mb-4 p-4">
        <div className="d-flex align-items-center mb-3">
          <FaTree size={40} color="#4caf50" className="me-3" />
          <div>
            <h4 className="mb-0 fw-bold">{treeName}</h4>
            <small className="text-muted">{location}</small>
          </div>
        </div>

        {/* Thông số môi trường trong card */}
        <div className="row g-3">
          {/* Temperature */}
          <div className="col-6 col-md-3 param-col">
            <div className="param-icon">
              <WiThermometer size={28} color="#f44336" />
            </div>
            <div className="param-text">
              <span className="param-value">{temperature}</span>
              <span className="param-unit">°C</span>
            </div>
            <div className="param-label">Nhiệt độ</div>
          </div>

          {/* Humidity */}
          <div className="col-6 col-md-3 param-col">
            <div className="param-icon">
              <WiHumidity size={28} color="#2196f3" />
            </div>
            <div className="param-text">
              <span className="param-value">{humidity}</span>
              <span className="param-unit">%</span>
            </div>
            <div className="param-label">Độ ẩm</div>
          </div>

          {/* Soil Moisture */}
          <div className="col-6 col-md-3 param-col">
            <div className="param-icon">
              <WiRaindrops size={28} color="#4caf50" />
            </div>
            <div className="param-text">
              <span className="param-value">{soilMoisture}</span>
              <span className="param-unit">%</span>
            </div>
            <div className="param-label">Soil</div>
          </div>

          {/* Light */}
          <div className="col-6 col-md-3 param-col">
            <div className="param-icon">
              <WiDaySunny size={28} color="#ffc107" />
            </div>
            <div className="param-text">
              <span className="param-value">{lightLevel}</span>
              <span className="param-unit">lx</span>
            </div>
            <div className="param-label">Ánh sáng</div>
          </div>
        </div>
      </div>

      {/* Biểu đồ cột so sánh */}
      <div className="card shadow p-3">
        <h5 className="mb-3 fw-bold">So sánh thông số (Sáng vs Chiều)</h5>
        <Chart
          options={barOptions}
          series={barSeries}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};

export default Dashboard;