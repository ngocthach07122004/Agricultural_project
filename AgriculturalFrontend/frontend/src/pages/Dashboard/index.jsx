import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import "./styles.scss";
import { FaTree } from "react-icons/fa";
import { WiThermometer, WiHumidity, WiRaindrops, WiDaySunny } from "react-icons/wi";

const treeName = "Cây Xoài";
const location = "Nhà Kính A";

const dataAirHumidity = [
  {
    "id":"0FVGV0H8GHBF9YV5251MDTTJ2V",
    "value":"123",
    "feed_id":3052297,
    "created_at":"2025-04-05T10:02:55.720Z"
  },
  {
    "id":"0FVGV0PQZ4H6AC0PBDYFXNAX2J",
    "value":"99",
    "feed_id":3052297,
    "created_at":"2025-04-05T10:03:13.686Z"
  },
  {
    "id":"0FVGV0R3XSVCBV0G7GSY0GSWMJ",
    "value":"21",
    "feed_id":3052297,
    "created_at":"2025-04-05T10:03:18.188Z"
  }
]

const Dashboard = () => {
  const [latestTemp, setLatestTemp] = useState(0);
  const [latestAir, setLatestAir] = useState(0);
  const [latestLand, setLatestLand] = useState(0);
  const [latestLight, setLatestLight] = useState(0);

  const [temperatureData, setTemperatureData] = useState([]);
  const [airHumidityData, setAirHumidityData] = useState([]);
  const [landHumidityData, setLandHumidityData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTemp = await axios.get("http://localhost:8080/temperature/all");
        const responseAir = await axios.get("http://localhost:8080/airHumidity/all");
        const responseLand = await axios.get("http://localhost:8080/landHumidity/all");
        const responseLight = await axios.get("http://localhost:8080/light/all");
  
        // Hàm sort tăng dần theo thời gian
        const sortByTime = (data) =>
          data.sort((a, b) => new Date(a.time) - new Date(b.time));
  
        const formatData = (data, field) => data.map(d => parseFloat(d[field]));
        const formatTime = (data) =>
          data.map((d) => {
            const date = new Date(d.time);
            return date.toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
              timeZone: "Asia/Ho_Chi_Minh"
            });
          });
  
        // Sort từng loại dữ liệu
        const tempSorted = sortByTime(responseTemp.data);
        const airSorted = sortByTime(responseAir.data);
        const landSorted = sortByTime(responseLand.data);
        const lightSorted = sortByTime(responseLight.data);

        console.log('temp: ', responseTemp.data)
        console.log('air: ', responseAir.data)
        console.log('land: ', responseLand.data)
        console.log('light: ', responseLight.data)
        console.log('kkkkkk')
        console.log('temp: ', tempSorted)
        console.log('air: ', airSorted)
        console.log('land: ', landSorted)
        console.log('light: ', lightSorted)
        console.log('hhhhh')
  
        // Gán dữ liệu vào state
        setTemperatureData(formatData(tempSorted, "valueTemperature"));
        setAirHumidityData(formatData(airSorted, "valueAirHumidity"));
        setLandHumidityData(formatData(landSorted, "valueLandHumidity"));
        setLightData(formatData(lightSorted, "valueLight"));
        setTimestamps(formatTime(tempSorted));
  
        setLatestTemp(tempSorted[tempSorted.length - 1]?.valueTemperature || 0);
        setLatestAir(airSorted[airSorted.length - 1]?.valueAirHumidity || 0);
        setLatestLand(landSorted[landSorted.length - 1]?.valueLandHumidity || 0);
        setLatestLight(lightSorted[lightSorted.length - 1]?.valueLight || 0);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const generateChart = (title, data, color) => ({
    options: {
      chart: { type: "line" },
      xaxis: { categories: timestamps, title: { text: "Thời gian" } },
      stroke: { curve: "smooth" },
      colors: [color],
      dataLabels: { enabled: false },
      title: { text: title, align: "left" }
    },
    series: [{ name: title, data }]
  });

  return (
    <div className="dashboard">
      <div className="container py-4">
        <div className="text-center mb-4">
          <h1 className="dashboard-title">SmartGrow Dashboard</h1>
          <p className="dashboard-subtitle">Giám sát & Quản lý môi trường trồng trọt</p>
        </div>

        <div className="tree-card shadow p-3 mb-4">
          <div className="d-flex align-items-center mb-3">
            <FaTree size={30} className="me-2 text-success" />
            <div>
              <h5 className="mb-0">{treeName}</h5>
              <small className="text-muted">{location}</small>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-6 col-md-3 param-col text-center">
              <div className="param-icon"><WiThermometer size={28} color="#f44336" /></div>
              <div className="param-text">
                <span className="param-value">{latestTemp}</span><span className="param-unit">°C</span>
              </div>
              <div className="param-label">Nhiệt độ</div>
            </div>

            <div className="col-6 col-md-3 param-col text-center">
              <div className="param-icon"><WiHumidity size={28} color="#2196f3" /></div>
              <div className="param-text">
                <span className="param-value">{latestAir}</span><span className="param-unit">%</span>
              </div>
              <div className="param-label">Độ ẩm không khí</div>
            </div>

            <div className="col-6 col-md-3 param-col text-center">
              <div className="param-icon"><WiRaindrops size={28} color="#4caf50" /></div>
              <div className="param-text">
                <span className="param-value">{latestLand}</span><span className="param-unit">%</span>
              </div>
              <div className="param-label">Độ ẩm đất</div>
            </div>

            <div className="col-6 col-md-3 param-col text-center">
              <div className="param-icon"><WiDaySunny size={28} color="#ffc107" /></div>
              <div className="param-text">
                <span className="param-value">{latestLight}</span><span className="param-unit">lx</span>
              </div>
              <div className="param-label">Ánh sáng</div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <Chart {...generateChart("Nhiệt độ (°C)", temperatureData, "#f44336")} type="line" height={300} />
          </div>
          <div className="col-md-6">
            <Chart {...generateChart("Độ ẩm không khí (%)", airHumidityData, "#2196f3")} type="line" height={300} />
          </div>
          <div className="col-md-6">
            <Chart {...generateChart("Độ ẩm đất (%)", landHumidityData, "#4caf50")} type="line" height={300} />
          </div>
          <div className="col-md-6">
            <Chart {...generateChart("Ánh sáng (lx)", lightData, "#ffc107")} type="line" height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;