// import React, { useEffect, useState } from 'react';
// import "./styles.scss";

// function WeatherChart() {
//   const [forecast, setForecast] = useState([]);

//   useEffect(() => {
//     fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q=Ho%20Chi%20Minh%20City&cnt=7&appid=YOUR_API_KEY&units=metric')
//       .then(response => response.json())
//       .then(data => setForecast(data.list));
//   }, []);

//   return (
//     <div className="chart-container">
//       {forecast.map((day, index) => (
//         <div key={index} className="chart-bar" styles={{ height: `${day.temp.day * 2}px` }}>
//           <span>{day.temp.day}°C</span>
//           <span>{new Date(day.dt * 1000).toLocaleDateString()}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// import React, {useState} from "react";
// import "./styles.scss";


// const weatherData = [
//   { day: "Thứ bảy", date: "22/03/2025", icon: "⛅", maxTemp: 34, minTemp: 24, humidity: 23 },
//   { day: "Chủ nhật", date: "23/03/2025", icon: "🌡️", maxTemp: 35, minTemp: 25, humidity: 5 },
//   { day: "Thứ hai", date: "24/03/2025", icon: "⛅", maxTemp: 34, minTemp: 24, humidity: 24 },
//   { day: "Thứ ba", date: "25/03/2025", icon: "🌡️", maxTemp: 35, minTemp: 25, humidity: 4 },
//   { day: "Thứ năm", date: "27/03/2025", icon: "🌡️", maxTemp: 35, minTemp: 25, humidity: 6 },
//   { day: "Thứ sáu", date: "28/03/2025", icon: "🌞", maxTemp: 35, minTemp: 26, humidity: 5 },
//   { day: "Thứ bảy", date: "29/03/2025", icon: "🌤️", maxTemp: 34, minTemp: 25, humidity: 20 },
//   { day: "Chủ nhật", date: "30/03/2025", icon: "☁️", maxTemp: 34, minTemp: 25, humidity: 21 },
// ];

// function WeatherForecast() {
//   return (
//     <div className="forecast-container">
//       {weatherData.map((data, index) => (
//         <div key={index} className="forecast-card">
//           <h3>{data.day}</h3>
//           <p className="date">{data.date}</p>
//           <div className="weather-icon">{data.icon}</div>
//           <p className="temp max-temp">{data.maxTemp}°C</p>
//           <p className="temp min-temp">{data.minTemp}°C</p>
//           <p className="humidity">💧 {data.humidity}%</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default WeatherForecast;


import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { GiWateringCan } from "react-icons/gi";
import { FaFan } from "react-icons/fa";
import { BsLightbulbFill } from "react-icons/bs";
import "./styles.scss";




function WeatherForecast () {
  // State cho các thiết bị
  const [pumpOn, setPumpOn] = useState(false);
  const [pumpLevel, setPumpLevel] = useState(5);

  const [lightOn, setLightOn] = useState(false);
  const [lightLevel, setLightLevel] = useState(10);

  const [fanOn, setFanOn] = useState(false);
  const [fanLevel, setFanLevel] = useState(5);

  // State cho Hẹn giờ
  const [timerDevice, setTimerDevice] = useState("pump");
  const [timerAction, setTimerAction] = useState("on");
  const [timerDatetime, setTimerDatetime] = useState("");

  // Hàm bật/tắt thiết bị
  const toggleDevice = (device, status) => {
    // Gọi API, hoặc set state
    console.log(`Toggle ${device} ->`, status);
  };

  // Hàm chỉnh cường độ
  const setDeviceLevel = (device, level) => {
    // Gọi API, hoặc set state
    console.log(`Level ${device} ->`, level);
  };

  // Hàm đặt lịch
  const handleSetTimer = () => {
    console.log("Đặt lịch:", timerDevice, timerAction, timerDatetime);
    // Gọi API POST /api/devices/schedule
  };

  // Form state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [device, setDevice] = useState("pump");
  const [action, setAction] = useState("on");

  // Danh sách lịch
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // Nếu có backend, fetch("/api/schedule")...
  }, []);

  // Lưu lịch
  const handleSave = () => {
    const newItem = {
      id: Date.now(),
      date: selectedDate.toLocaleDateString("vi-VN"), // YYYY-MM-DD
      startTime: selectedTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: selectedEndTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),

      device,
      action,
    };
    setSchedules((prev) => [...prev, newItem]);
  };

  // Xóa lịch
  const handleDelete = (id) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
  };

  // Lấy icon cho thiết bị
  const getDeviceIcon = (dev) => {
    switch (dev) {
      case "pump":
        return <GiWateringCan size={18} className="me-1" />;
      case "fan":
        return <FaFan size={18} className="me-1" />;
      case "light":
        return <BsLightbulbFill size={18} className="me-1" />;
      default:
        return <GiWateringCan size={18} className="me-1" />;
    }
  };
  
    // Lấy nhãn thiết bị
    const getDeviceLabel = (dev) => {
      switch (dev) {
        case "pump":
          return "Bơm nước";
        case "fan":
          return "Quạt";
        case "light":
          return "Đèn";
        default:
          return "Bơm nước";
      }
    };
  
    // Lấy nhãn hành động
    const getActionLabel = (act) => (act === "on" ? "Bật" : "Tắt");




  return (
    <div className="settings-page">
      <div className=" container py-4">
        <h2 className="text-center mb-4 fw-bold">Thiết Lập Hệ Thống</h2>

        {/* Row 1: 3 thiết bị */}
        <h4 className="fw-bold mb-3">Thiết bị</h4>
        <div className="row g-4 mb-3">
          {/* Bơm Nước */}
          <div className="col-md-4">
            <div className="device-card card shadow-sm p-3">
              <div className="d-flex align-items-center mb-3">
                <GiWateringCan size={30} color="#4caf50" className="me-2" />
                <h5 className="mb-0 fw-bold">Bơm Nước</h5>
              </div>

              {/* Công tắc bật/tắt (Bootstrap switch) */}
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="pumpSwitch"
                  checked={pumpOn}
                  onChange={(e) => {
                    setPumpOn(e.target.checked);
                    toggleDevice("pump", e.target.checked);
                  }}
                />
                <label className="form-check-label" htmlFor="pumpSwitch">
                  {pumpOn ? "Đang bật" : "Đang tắt"}
                </label>
              </div>

              {/* Slider cường độ */}
              <div className="mb-2">Cường độ: {pumpLevel}</div>
              <input
                type="range"
                className="form-range"
                min="1"
                max="10"
                value={pumpLevel}
                onChange={(e) => {
                  const lvl = parseInt(e.target.value);
                  setPumpLevel(lvl);
                  setDeviceLevel("pump", lvl);
                }}
              />
            </div>
          </div>

          {/* Đèn */}
          <div className="col-md-4">
            <div className="device-card card shadow-sm p-3">
              <div className="d-flex align-items-center mb-3">
                <BsLightbulbFill size={30} color="#ffc107" className="me-2" />
                <h5 className="mb-0 fw-bold">Đèn</h5>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="lightSwitch"
                  checked={lightOn}
                  onChange={(e) => {
                    setLightOn(e.target.checked);
                    toggleDevice("light", e.target.checked);
                  }}
                />
                <label className="form-check-label" htmlFor="lightSwitch">
                  {lightOn ? "Đang bật" : "Đang tắt"}
                </label>
              </div>

              <div className="mb-2">Cường độ: {lightLevel}</div>
              <input
                type="range"
                className="form-range"
                min="10"
                max="90"
                value={lightLevel}
                onChange={(e) => {
                  const lvl = parseInt(e.target.value);
                  setLightLevel(lvl);
                  setDeviceLevel("light", lvl);
                }}
              />
            </div>
          </div>

          {/* Quạt */}
          <div className="col-md-4">
            <div className="device-card card shadow-sm p-3">
              <div className="d-flex align-items-center mb-3">
                <FaFan size={30} color="#2196f3" className="me-2" />
                <h5 className="mb-0 fw-bold">Quạt</h5>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="fanSwitch"
                  checked={fanOn}
                  onChange={(e) => {
                    setFanOn(e.target.checked);
                    toggleDevice("fan", e.target.checked);
                  }}
                />
                <label className="form-check-label" htmlFor="fanSwitch">
                  {fanOn ? "Đang bật" : "Đang tắt"}
                </label>
              </div>

              <div className="mb-2">Cường độ: {fanLevel}</div>
              <input
                type="range"
                className="form-range"
                min="1"
                max="10"
                value={fanLevel}
                onChange={(e) => {
                  const lvl = parseInt(e.target.value);
                  setFanLevel(lvl);
                  setDeviceLevel("fan", lvl);
                }}
              />
            </div>
          </div>
        </div>

        {/* Row 2: Hẹn giờ */}
        {/* Card form */}
        <h4 className="fw-bold mb-3">Đặt lịch</h4>
        <div className="card shadow-sm p-4 mb-3">
          <div className="row g-3">
            {/* Chọn ngày */}
            <div className="col-md-3">
              <label className="form-label fw-semibold">Chọn ngày</label>
              <div className="input-group">
                <span className="input-group-text">
                  <AiOutlineCalendar />
                </span>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
              </div>
            </div>
  
            {/* Chọn giờ */}
            <div className="col-md-3">
              <label className="form-label fw-semibold">Chọn giờ bắt đầu</label>
              <div className="input-group">
                <span className="input-group-text">
                  <AiOutlineClockCircle />
                </span>
                <DatePicker
                  selected={selectedTime}
                  onChange={(time) => setSelectedTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  className="form-control"
                />
              </div>
            </div>
  
            <div className="col-md-3">
              <label className="form-label fw-semibold">Chọn giờ kết thúc</label>
              <div className="input-group">
                <span className="input-group-text">
                  <AiOutlineClockCircle />
                </span>
                <DatePicker
                  selected={selectedEndTime}
                  onChange={(time) => setSelectedEndTime(time)} // Cập nhật riêng giờ kết thúc
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  className="form-control"
                />
              </div>
            </div>
  
            {/* Thiết bị */}
            <div className="col-md-3">
              <label className="form-label fw-semibold">Thiết bị</label>
              <select
                className="form-select"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
              >
                <option value="pump">Bơm nước</option>
                <option value="fan">Quạt</option>
                <option value="light">Đèn</option>
              </select>
            </div>
  
            {/* Hành động */}
            <div className="col-md-3">
              <label className="form-label fw-semibold">Hành động</label>
              <select
                className="form-select"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                <option value="on">Bật</option>
                <option value="off">Tắt</option>
              </select>
            </div>
          </div>
  
          {/* Nút Lưu lịch */}
          <div className="mt-4 text-end">
            <button className="btn btn-primary px-4" onClick={handleSave}>
              Lưu lịch
            </button>
          </div>
        </div>

        {/* Danh sách lịch */}
        <h4 className="fw-bold mb-3">Danh sách lịch</h4>
        <div className="table-responsive ">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Ngày</th>
                <th>Giờ bắt đầu</th>
                <th>Giờ kết thúc</th>
                <th>Thiết bị</th>
                <th>Hành động</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {schedules.length > 0 ? (
                schedules.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td>
                      {getDeviceIcon(item.device)}
                      {getDeviceLabel(item.device)}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          item.action === "on" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {getActionLabel(item.action)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Chưa có lịch nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        

      </div>
    </div>
    
  )
}

export default WeatherForecast;