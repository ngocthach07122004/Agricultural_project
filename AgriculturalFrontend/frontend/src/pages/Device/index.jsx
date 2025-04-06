import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Icon
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { GiWateringCan } from "react-icons/gi";
import { FaFan } from "react-icons/fa";
import { BsLightbulbFill } from "react-icons/bs";

// RC-Slider cho thanh điều chỉnh cường độ
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import "./styles.scss";

function DevicePage() {
  // === Phần 1: Điều khiển thiết bị ===
  // State cho Bơm nước
  const [pumpOn, setPumpOn] = useState(false);
  const [pumpLevel, setPumpLevel] = useState(0);
  // State cho Đèn
  const [lightOn, setLightOn] = useState(false);
  const [lightLevel, setLightLevel] = useState(0);
  // State cho Quạt
  const [fanOn, setFanOn] = useState(false);
  const [fanLevel, setFanLevel] = useState(0);

  // Hàm bật/tắt thiết bị
  // const toggleDevice = (device, status) => {
  //   console.log(`Toggle ${device} ->`, status);
  //   // Gọi API thật nếu cần
  // };

  // // Hàm chỉnh cường độ
  // const setDeviceLevel = (device, level) => {
  //   console.log(`Level ${device} ->`, level);
  //   // Gọi API thật nếu cần
  // };

  // === Phần 2: Đặt lịch (Schedule) ===
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [scheduleStartTime, setScheduleStartTime] = useState(new Date());
  const [scheduleEndTime, setScheduleEndTime] = useState(new Date());
  const [scheduleDevice, setScheduleDevice] = useState("pump");
  const [scheduleAction, setScheduleAction] = useState("on");

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const convertLevel = pumpLevel * 10;
    const urlWaterPump = `http://localhost:8080/water/${convertLevel}`;

    fetch(urlWaterPump, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }, [pumpLevel]);

  useEffect(() => {
    const convertLevel = fanLevel * 10;
    const urlWaterPump = `http://localhost:8080/fan/${convertLevel}`;

    fetch(urlWaterPump, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }, [fanLevel]);

  useEffect(() => {
    const convertLevel = lightLevel * 25;
    const urlWaterPump = `http://localhost:8080/light/${convertLevel}`;

    fetch(urlWaterPump, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }, [lightLevel]);

  // Lưu lịch (với kiểm tra giờ kết thúc > giờ bắt đầu)
  const handleSaveSchedule = () => {
    if (scheduleEndTime <= scheduleStartTime) {
      alert("Giờ kết thúc phải sau giờ bắt đầu!");
      return;
    }
    const newSchedule = {
      id: Date.now(),
      date: scheduleDate.toLocaleDateString("vi-VN"),
      startTime: scheduleStartTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: scheduleEndTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      device: scheduleDevice,
      action: scheduleAction,
    };
    setSchedules((prev) => [...prev, newSchedule]);
    console.log("Đặt lịch:", newSchedule);
    // Gọi API POST nếu cần
  };

  const handleDeleteSchedule = (id) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
  };

  // Hàm hiển thị icon cho thiết bị
  const getDeviceIcon = (dev) => {
    switch (dev) {
      case "pump":
        return <GiWateringCan size={18} className="me-1" />;
      case "fan":
        return <FaFan size={18} className="me-1" />;
      case "light":
        return <BsLightbulbFill size={18} className="me-1" />;
      default:
        return null;
    }
  };

  // Hàm hiển thị nhãn thiết bị
  const getDeviceLabel = (dev) => {
    switch (dev) {
      case "pump":
        return "Bơm nước";
      case "fan":
        return "Quạt";
      case "light":
        return "Đèn";
      default:
        return "";
    }
  };

  // Hàm hiển thị nhãn hành động
  const getActionLabel = (act) => (act === "on" ? "Bật" : "Tắt");

  return (
    <div className="device-page container py-4">
      <h2 className="text-center mb-4 fw-bold">Thiết Lập Hệ Thống</h2>

      {/* --------------------- Phần Điều khiển Thiết bị --------------------- */}
      <h4 className="fw-bold mb-3">Điều khiển thiết bị</h4>
      <div className="card shadow-sm p-4 mb-5">
        <div className="row g-4">
          {/* Bơm nước */}
          <div className="col-md-4">
            <div className="device-card p-3">
              <div className="toggle-header d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <GiWateringCan size={30} color="#4caf50" className="me-2" />
                  <h5 className="mb-0 fw-bold">Bơm Nước</h5>
                </div>
                <div
                  className={`big-toggle ${pumpOn ? "on" : "off"}`}
                  onClick={() => {
                    setPumpOn(!pumpOn);
                    // toggleDevice("pump", !pumpOn);
                    if (!pumpOn) {
                      setPumpLevel((prev) => prev);
                    } else {
                      setPumpLevel(0);
                    }
                  }}
                >
                  {pumpOn ? "ON" : "OFF"}
                </div>
              </div>
              <div className="mb-2 slider-label">Cường độ: {pumpLevel}</div>
              <Slider
                min={0}
                max={10}
                value={pumpLevel}
                onChange={(value) => {
                  setPumpLevel(value);
                  if (value !== 0) {
                    setPumpOn(true);
                  } else {
                    setPumpOn(false);
                  }
                  // setDeviceLevel("pump", val);
                }}
                trackStyle={{ backgroundColor: "#4caf50", height: 8 }}
                handleStyle={{
                  borderColor: "#4caf50",
                  height: 24,
                  width: 24,
                  marginLeft: -12,
                  marginTop: -8,
                }}
                railStyle={{ backgroundColor: "#ddd", height: 8 }}
              />
            </div>
          </div>

          {/* Đèn */}
          <div className="col-md-4">
            <div className="device-card p-3">
              <div className="toggle-header d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <BsLightbulbFill size={30} color="#ffc107" className="me-2" />
                  <h5 className="mb-0 fw-bold">Đèn</h5>
                </div>
                <div
                  className={`big-toggle ${lightOn ? "on" : "off"}`}
                  onClick={() => {
                    setLightOn(!lightOn);
                    if (!lightOn) {
                      setLightLevel((prev) => prev);
                    } else {
                      setLightLevel(0);
                    }
                    // toggleDevice("light", !lightOn);
                  }}
                >
                  {lightOn ? "ON" : "OFF"}
                </div>
              </div>
              <div className="mb-2 slider-label">Cường độ: {lightLevel}</div>
              <Slider
                min={0}
                max={4}
                value={lightLevel}
                onChange={(value) => {
                  setLightLevel(value);
                  if (value !== 0) {
                    setLightOn(true);
                  } else {
                    setLightOn(false);
                  }
                }}
                trackStyle={{ backgroundColor: "#ffc107", height: 8 }}
                handleStyle={{
                  borderColor: "#ffc107",
                  height: 24,
                  width: 24,
                  marginLeft: -12,
                  marginTop: -8,
                }}
                railStyle={{ backgroundColor: "#ddd", height: 8 }}
              />
            </div>
          </div>

          {/* Quạt */}
          <div className="col-md-4">
            <div className="device-card p-3">
              <div className="toggle-header d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <FaFan size={30} color="#2196f3" className="me-2" />
                  <h5 className="mb-0 fw-bold">Quạt</h5>
                </div>
                <div
                  className={`big-toggle ${fanOn ? "on" : "off"}`}
                  onClick={() => {
                    setFanOn(!fanOn);
                    if (!fanOn) {
                      setFanLevel((prev) => prev);
                    } else {
                      setFanLevel(0);
                    }
                  }}
                >
                  {fanOn ? "ON" : "OFF"}
                </div>
              </div>
              <div className="mb-2 slider-label">Cường độ: {fanLevel}</div>
              <Slider
                min={0}
                max={10}
                value={fanLevel}
                onChange={(value) => {
                  setFanLevel(value);
                  if (value !== 0) {
                    setFanOn(true);
                  } else {
                    setFanOn(false);
                  }
                }}
                trackStyle={{ backgroundColor: "#2196f3", height: 8 }}
                handleStyle={{
                  borderColor: "#2196f3",
                  height: 24,
                  width: 24,
                  marginLeft: -12,
                  marginTop: -8,
                }}
                railStyle={{ backgroundColor: "#ddd", height: 8 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========== Phần Đặt lịch ========== */}
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
                selected={scheduleDate}
                onChange={(date) => setScheduleDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>
          </div>

          {/* Giờ bắt đầu */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Giờ bắt đầu</label>
            <div className="input-group">
              <span className="input-group-text">
                <AiOutlineClockCircle />
              </span>
              <DatePicker
                selected={scheduleStartTime}
                onChange={(time) => setScheduleStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                className="form-control"
              />
            </div>
          </div>

          {/* Giờ kết thúc */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Giờ kết thúc</label>
            <div className="input-group">
              <span className="input-group-text">
                <AiOutlineClockCircle />
              </span>
              <DatePicker
                selected={scheduleEndTime}
                onChange={(time) => setScheduleEndTime(time)}
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
              value={scheduleDevice}
              onChange={(e) => setScheduleDevice(e.target.value)}
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
              value={scheduleAction}
              onChange={(e) => setScheduleAction(e.target.value)}
            >
              <option value="on">Bật</option>
              <option value="off">Tắt</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-end">
          <button className="btn btn-primary px-4" onClick={handleSaveSchedule}>
            Lưu lịch
          </button>
        </div>
      </div>

      {/* ========== Danh sách lịch ========== */}
      <h4 className="fw-bold mb-3">Danh sách lịch</h4>
      <div className="table-responsive">
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
                      onClick={() => handleDeleteSchedule(item.id)}
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
  );
}

export default DevicePage;
