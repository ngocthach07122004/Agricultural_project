import React from "react";
import "./styles.scss";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiCloud,
  WiDaySunny,
  WiRain,
} from "react-icons/wi";

/**
 * Đây là dữ liệu giả lập (dummy) để minh họa hiển thị.
 * Khi dùng API thật, bạn thay thế bằng props hoặc state.
 */
const dummyForecast = [
  { time: "01:00", temp: 26, icon: "cloud" },
  { time: "02:00", temp: 25, icon: "cloud" },
  { time: "03:00", temp: 24, icon: "rain" },
  { time: "04:00", temp: 24, icon: "cloud" },
  { time: "05:00", temp: 23, icon: "sun" },
  { time: "06:00", temp: 24, icon: "sun" },
  { time: "07:00", temp: 26, icon: "sun" },
  { time: "08:00", temp: 28, icon: "cloud" },
  { time: "09:00", temp: 29, icon: "sun" },
];

const renderIcon = (icon) => {
  switch (icon) {
    case "cloud":
      return <WiCloud size={30} />;
    case "rain":
      return <WiRain size={30} />;
    case "sun":
      return <WiDaySunny size={30} />;
    default:
      return <WiCloud size={30} />;
  }
};

const FancyWeatherCard = () => {
  // Dữ liệu mô phỏng cho thời tiết hiện tại
  const cityName = "Biên Hòa, Đồng Nai";
  const currentTemp = 26;
  const condition = "Trời nhiều mây";
  const humidity = 64;
  const windSpeed = 11;
  const airQuality = "Tốt";
  const aqi = 50;

  return (
    <div className="fancy-weather-card">
      {/* Thông tin chính */}
      <div className="fwc-header">
        <h2 className="fwc-city">{cityName}</h2>
        <p className="fwc-status">
          {currentTemp}°C | {condition}
        </p>
      </div>

      <div className="fwc-info">
        <div className="fwc-info-item">
          <WiThermometer size={24} />
          <span>{currentTemp}°C</span>
        </div>
        <div className="fwc-info-item">
          <WiHumidity size={24} />
          <span>{humidity}%</span>
        </div>
        <div className="fwc-info-item">
          <WiStrongWind size={24} />
          <span>{windSpeed} km/h</span>
        </div>
      </div>

      {/* AQI */}
      <div className="fwc-aqi">
        <span>Chỉ số AQI: {aqi}</span> - <span>{airQuality}</span>
      </div>

      {/* Dự báo giờ */}
      <div className="fwc-forecast">
        {dummyForecast.map((item, index) => (
          <div key={index} className="fwc-forecast-item">
            <span className="fwc-forecast-time">{item.time}</span>
            <span className="fwc-forecast-icon">{renderIcon(item.icon)}</span>
            <span className="fwc-forecast-temp">{item.temp}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FancyWeatherCard;
