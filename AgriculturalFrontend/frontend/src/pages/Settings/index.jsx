import React, { useState } from "react";
import "./styles.scss";

// Icon ví dụ
import { GiWateringCan } from "react-icons/gi";
import { BsLightbulbFill } from "react-icons/bs";
import { FaFan } from "react-icons/fa";

// Sử dụng input type="range" cho cường độ
// Sử dụng input type="checkbox" (Bootstrap switch) cho bật/tắt
// Sử dụng input type="datetime-local" cho hẹn giờ (hoặc DatePicker)

const SettingsPage = () => {
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

  return (
    <div className="settings-page container py-4">
      <h2 className="text-center mb-4 fw-bold">Thiết Lập Hệ Thống</h2>

      {/* Row 1: 3 thiết bị */}
      <div className="row g-4 mb-5">
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
              min="1"
              max="10"
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
      <div className="timer-card card shadow-sm p-4">
        <h5 className="mb-3 fw-bold">Hẹn Giờ</h5>
        <div className="row g-3 align-items-end">
          {/* Chọn thiết bị */}
          <div className="col-md-4">
            <label className="form-label">Thiết bị</label>
            <select
              className="form-select"
              value={timerDevice}
              onChange={(e) => setTimerDevice(e.target.value)}
            >
              <option value="pump">Bơm Nước</option>
              <option value="light">Đèn</option>
              <option value="fan">Quạt</option>
            </select>
          </div>
          {/* Chọn hành động */}
          <div className="col-md-4">
            <label className="form-label">Hành động</label>
            <select
              className="form-select"
              value={timerAction}
              onChange={(e) => setTimerAction(e.target.value)}
            >
              <option value="on">Bật</option>
              <option value="off">Tắt</option>
            </select>
          </div>
          {/* Chọn thời gian */}
          <div className="col-md-4">
            <label className="form-label">Thời gian</label>
            <input
              type="datetime-local"
              className="form-control"
              value={timerDatetime}
              onChange={(e) => setTimerDatetime(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <button className="btn btn-success" onClick={handleSetTimer}>
            Đặt Lịch
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
