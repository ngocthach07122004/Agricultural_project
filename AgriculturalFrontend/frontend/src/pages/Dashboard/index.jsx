// import React from "react";
// import "./styles.scss";
// import Chart from "react-apexcharts";
// import { FaTree } from "react-icons/fa";
// import {
//   WiThermometer,
//   WiHumidity,
//   WiRaindrops,
//   WiDaySunny,
// } from "react-icons/wi";

// /**
//  * Ví dụ minh họa:
//  * - Temperature: °C
//  * - Humidity: RH%
//  * - Soil Moisture: %
//  * - Light: lx
//  */
// const Dashboard = () => {
//   // Thông số môi trường (giả lập)
//   const temperature = 28; // °C
//   const humidity = 65; // RH%
//   const soilMoisture = 55; // %
//   const lightLevel = 200; // lx

//   // Thông tin cây
//   const treeName = "Cây Xoài";
//   const location = "Nhà Kính A";

//   // Biểu đồ cột so sánh (Sáng vs Chiều)
//   const barOptions = {
//     chart: { type: "bar" },
//     xaxis: {
//       categories: ["Temp (°C)", "Humidity (%)", "Soil (%)", "Light (lx)"],
//     },
//     plotOptions: {
//       bar: {
//         borderRadius: 6,
//         horizontal: false,
//       },
//     },
//     colors: ["#4caf50", "#ffc107"], // Màu cột Sáng (xanh lá), Chiều (vàng)
//     dataLabels: { enabled: true },
//     legend: { position: "top" },
//   };
//   // Giá trị Sáng vs Chiều (VD: Sáng 25°C, Chiều 30°C, v.v.)
//   const barSeries = [
//     {
//       name: "Sáng",
//       data: [25, 60, 50, 150], // (Temp, Humi, Soil, Light)
//     },
//     {
//       name: "Chiều",
//       data: [30, 65, 55, 220],
//     },
//   ];

//   return (
//     <div className="dashboard container py-4">
//       {/* Tiêu đề */}
//       <div className="text-center mb-4">
//         <h1 className="dashboard-title">SmartGrow Dashboard</h1>
//         <p className="dashboard-subtitle">
//           Giám sát & Quản lý môi trường trồng trọt
//         </p>
//       </div>

//       {/* Card Cây */}
//       <div className="tree-card card shadow mb-4 p-4">
//         <div className="d-flex align-items-center mb-3">
//           <FaTree size={40} color="#4caf50" className="me-3" />
//           <div>
//             <h4 className="mb-0 fw-bold">{treeName}</h4>
//             <small className="text-muted">{location}</small>
//           </div>
//         </div>

//         {/* Thông số môi trường trong card */}
//         <div className="row g-3">
//           {/* Temperature */}
//           <div className="col-6 col-md-3 param-col">
//             <div className="param-icon">
//               <WiThermometer size={28} color="#f44336" />
//             </div>
//             <div className="param-text">
//               <span className="param-value">{temperature}</span>
//               <span className="param-unit">°C</span>
//             </div>
//             <div className="param-label">Nhiệt độ</div>
//           </div>

//           {/* Humidity */}
//           <div className="col-6 col-md-3 param-col">
//             <div className="param-icon">
//               <WiHumidity size={28} color="#2196f3" />
//             </div>
//             <div className="param-text">
//               <span className="param-value">{humidity}</span>
//               <span className="param-unit">%</span>
//             </div>
//             <div className="param-label">Độ ẩm</div>
//           </div>

//           {/* Soil Moisture */}
//           <div className="col-6 col-md-3 param-col">
//             <div className="param-icon">
//               <WiRaindrops size={28} color="#4caf50" />
//             </div>
//             <div className="param-text">
//               <span className="param-value">{soilMoisture}</span>
//               <span className="param-unit">%</span>
//             </div>
//             <div className="param-label">Soil</div>
//           </div>

//           {/* Light */}
//           <div className="col-6 col-md-3 param-col">
//             <div className="param-icon">
//               <WiDaySunny size={28} color="#ffc107" />
//             </div>
//             <div className="param-text">
//               <span className="param-value">{lightLevel}</span>
//               <span className="param-unit">lx</span>
//             </div>
//             <div className="param-label">Ánh sáng</div>
//           </div>
//         </div>
//       </div>

//       {/* Biểu đồ cột so sánh */}
//       <div className="card shadow p-3">
//         <h5 className="mb-3 fw-bold">So sánh thông số (Sáng vs Chiều)</h5>
//         <Chart
//           options={barOptions}
//           series={barSeries}
//           type="bar"
//           height={300}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./styles.scss";
// import Chart from "react-apexcharts";
// import { FaTree } from "react-icons/fa";
// import { WiThermometer, WiHumidity, WiRaindrops, WiDaySunny } from "react-icons/wi";

// const Dashboard = () => {
//   const [data, setData] = useState({});
//   const [dataChart, setDataChart] = useState({});
   
//   const treeName = "Cây Xoài";
//   const location = "Nhà Kính A";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1"); // API mẫu
//         setData(response.data);
//         console.log("data ", response.data);
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu từ API:", error);
//       }
//     };
    
//     fetchData();
//     const interval = setInterval(fetchData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // 🔹 Dữ liệu biểu đồ theo từng khoảng 6 giờ
//   const lineOptions = {
//     chart: { type: "line" },
//     xaxis: {
//       categories: ["00:00", "06:00", "12:00", "18:00"],
//       title: { text: "Thời gian trong ngày" }
//     },
//     stroke: { curve: "smooth" },
//     markers: { size: 5 },
//     colors: ["#f44336", "#2196f3", "#4caf50", "#ffc107"],
//     legend: { position: "top" },
//     dataLabels: { enabled: false }
//   };

//   const lineSeries = [
//     { name: "Nhiệt độ (°C)", data: [data.id, data.id + 3, data.id + 6, data.id + 9] },
//     // { name: "Độ ẩm không khí (%)", data: [70, 65, 60, 75] },
//     // { name: "Độ ẩm đất (%)", data: [55, 50, 45, 60] },
//     // { name: "Ánh sáng (lx)", data: [0, 80, 150, 40] }
//   ];  

//   return (
//     <div className="dashboard">
//       <div className="container py-4">
//         <div className="text-center mb-4">
//           <h1 className="dashboard-title">SmartGrow Dashboard</h1>
//           <p className="dashboard-subtitle">Giám sát & Quản lý môi trường trồng trọt</p>
//         </div>

//         <div className="row">
//           <div className="col-md-4">
//             <div className="tree-card card shadow mb-4 p-4">
//               <div className="d-flex align-items-center mb-3">
//                 <FaTree size={40} color="#4caf50" className="me-3" />
//                 <div>
//                   <h4 className="mb-0 fw-bold">{treeName}</h4>
//                   <small className="text-muted">{location}</small>
//                 </div>
//               </div>

//               <div className="row g-3">
//                 <div className="col-6 param-col">
//                   <WiThermometer size={28} color="#f44336" />
//                   <div className="param-text"><span className="param-value">{data.id}</span><span className="param-unit">°C</span></div>
//                   <div className="param-label">Nhiệt độ</div>
//                 </div>

//                 <div className="col-6 param-col">
//                   <WiHumidity size={28} color="#2196f3" />
//                   <div className="param-text"><span className="param-value">{data.id}</span><span className="param-unit">%</span></div>
//                   <div className="param-label">Độ ẩm</div>
//                 </div>

//                 <div className="col-6 param-col">
//                   <WiRaindrops size={28} color="#4caf50" />
//                   <div className="param-text"><span className="param-value">{data.id}</span><span className="param-unit">%</span></div>
//                   <div className="param-label">Độ ẩm đất</div>
//                 </div>

//                 <div className="col-6 param-col">
//                   <WiDaySunny size={28} color="#ffc107" />
//                   <div className="param-text"><span className="param-value">{data.id}</span><span className="param-unit">lx</span></div>
//                   <div className="param-label">Ánh sáng</div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="col-md-8">
//             <div className="card shadow p-3">
//               <h5 className="mb-3 fw-bold">Biểu đồ môi trường trong ngày</h5>
//               <Chart options={lineOptions} series={lineSeries} type="line" height={300} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles.scss";
import Chart from "react-apexcharts";
import { FaTree } from "react-icons/fa";
import { WiThermometer, WiHumidity, WiRaindrops, WiDaySunny } from "react-icons/wi";

const test = [
  {
      "idAirHumidity": "090833f5-0e9c-4866-b33e-069ea5f0fe02",
      "time": "2025-03-28T14:57:37",
      "valueAirHumidity": "123"
  },
  {
      "idAirHumidity": "36e26ab0-834c-4781-8ba9-3b9575ab7bc3",
      "time": "2025-03-28T14:59:49",
      "valueAirHumidity": "999"
  },
  {
      "idAirHumidity": "895f5dd2-1c6f-496d-bead-a5cb2e60b9d8",
      "time": "2025-03-28T14:57:35",
      "valueAirHumidity": "21"
  },
  {
      "idAirHumidity": "d3376456-6705-47f4-8400-d0d830080daf",
      "time": "2025-03-28T14:57:31",
      "valueAirHumidity": "213"
  },
  {
      "idAirHumidity": "de424907-4035-4072-9688-0d160c0f4bd1",
      "time": "2025-03-28T14:59:46",
      "valueAirHumidity": "42"
  },
  {
      "idAirHumidity": "e300c8dc-dc83-407f-9681-8a1da14241ae",
      "time": "2025-03-28T14:59:51",
      "valueAirHumidity": "111"
  }
];

const Dashboard = () => {
  const [data, setData] = useState({ temperature: 0, humidity: 0, soilMoisture: 0, lightLevel: 0 });
  const [timestamps, setTimestamps] = useState([]);
  const [lineSeries, setLineSeries] = useState([
    { name: "Nhiệt độ (°C)", data: [] },
    { name: "Độ ẩm không khí (%)", data: [] },
    { name: "Độ ẩm đất (%)", data: [] },
    { name: "Ánh sáng (lx)", data: [] }
  ]);

  const treeName = "Cây Xoài";
  const location = "Nhà Kính A";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1"); // API thực tế
        const newData = response.data;
        setData(newData);
        

        setTimestamps(prev => [...prev.slice(-9), new Date().toLocaleTimeString()]);
        setLineSeries(prev => [
          { name: "Nhiệt độ (°C)", data: [...prev[0].data.slice(-9), newData.id] },
          // { name: "Độ ẩm không khí (%)", data: [...prev[1].data.slice(-9), newData.id] },
          // { name: "Độ ẩm đất (%)", data: [...prev[2].data.slice(-9), newData.id] },
          // { name: "Ánh sáng (lx)", data: [...prev[3].data.slice(-9), newData.id] }
        ]);
        console.log("du lieu ", newData);
        
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const lineOptions = {
    chart: { type: "line" },
    xaxis: { categories: timestamps, title: { text: "Thời gian cập nhật" } },
    stroke: { curve: "smooth" },
    markers: { size: 5 },
    colors: ["#f44336", "#2196f3", "#4caf50", "#ffc107"],
    legend: { position: "top" },
    dataLabels: { enabled: false }
  };

  return (
    <div className="dashboard">
      <div className="container py-4">
        <div className="text-center mb-4">
          <h1 className="dashboard-title">SmartGrow Dashboard</h1>
          <p className="dashboard-subtitle">Giám sát & Quản lý môi trường trồng trọt</p>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="tree-card card shadow mb-4 p-4">
              <div className="d-flex align-items-center mb-3">
                <FaTree size={40} color="#4caf50" className="me-3" />
                <div>
                  <h4 className="mb-0 fw-bold">{treeName}</h4>
                  <small className="text-muted">{location}</small>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-6 param-col">
                  <WiThermometer size={28} color="#f44336" />
                  <div className="param-text"><span className="param-value">{test[test.length -1].valueAirHumidity}</span><span className="param-unit">°C</span></div>
                  <div className="param-label">Nhiệt độ</div>
                </div>

                <div className="col-6 param-col">
                  <WiHumidity size={28} color="#2196f3" />
                  <div className="param-text"><span className="param-value">{data.id}</span><span className="param-unit">%</span></div>
                  <div className="param-label">Độ ẩm</div>
                </div>

                <div className="col-6 param-col">
                  <WiRaindrops size={28} color="#4caf50" />
                  <div className="param-text"><span className="param-value">{data.id}</span><span className="param-unit">%</span></div>
                  <div className="param-label">Độ ẩm đất</div>
                </div>

                <div className="col-6 param-col">
                  <WiDaySunny size={28} color="#ffc107" />
                  <div className="param-text"><span className="param-value">{data.id}</span><span className="param-unit">lx</span></div>
                  <div className="param-label">Ánh sáng</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            <div className="card shadow p-3">
              <h5 className="mb-3 fw-bold">Biểu đồ môi trường theo thời gian</h5>
              <Chart options={lineOptions} series={lineSeries} type="line" height={400} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
