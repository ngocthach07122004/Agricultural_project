import React from "react";
import "./styles.scss";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
  WiRain,
  WiCloud,
} from "react-icons/wi";

/**
 * Dữ liệu giả lập cho ví dụ.
 * Khi có API thật, bạn truyền qua props.
 */
const dummyForecast = [
  { time: "08:00", temp: 26, icon: "cloud" },
  { time: "09:00", temp: 27, icon: "sun" },
  { time: "10:00", temp: 28, icon: "sun" },
  { time: "11:00", temp: 29, icon: "sun" },
  { time: "12:00", temp: 30, icon: "cloud" },
  { time: "13:00", temp: 31, icon: "sun" },
];

const renderIcon = (icon) => {
  switch (icon) {
    case "sun":
      return <WiDaySunny size={24} />;
    case "rain":
      return <WiRain size={24} />;
    case "cloud":
      return <WiCloud size={24} />;
    default:
      return <WiCloud size={24} />;
  }
};

const UnifiedWeatherCard = () => {
  // Thông tin thời tiết hiện tại (dummy)
  const cityName = "Biên Hòa, Đồng Nai";
  const temperature = 26;
  const condition = "Trời nhiều mây";
  const humidity = 64;
  const windSpeed = 11;
  const airQuality = "Tốt";
  const aqi = 50;

  return (
    <div className="unified-weather-card card shadow-sm">
      <div className="card-body">
        {/* Tiêu đề */}
        <h5 className="card-title text-center mb-3">{cityName}</h5>

        {/* Thông tin chính */}
        <div className="uwc-info mb-3">
          <div className="uwc-info-item">
            <WiThermometer size={24} />
            <span>{temperature}°C</span>
          </div>
          <div className="uwc-info-item">
            <WiHumidity size={24} />
            <span>{humidity}%</span>
          </div>
          <div className="uwc-info-item">
            <WiStrongWind size={24} />
            <span>{windSpeed} km/h</span>
          </div>
        </div>

        <p className="text-center mb-2">
          <strong>Tình trạng:</strong> {condition}
        </p>
        <p className="text-center mb-2">
          <strong>AQI:</strong> {aqi} - {airQuality}
        </p>

        {/* Dự báo giờ */}
        <div className="uwc-forecast">
          {dummyForecast.map((item, idx) => (
            <div key={idx} className="uwc-forecast-item">
              <span className="uwc-forecast-time">{item.time}</span>
              {renderIcon(item.icon)}
              <span className="uwc-forecast-temp">{item.temp}°C</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnifiedWeatherCard;
