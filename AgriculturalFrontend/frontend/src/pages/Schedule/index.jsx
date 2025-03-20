import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

// Icon
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { GiWateringCan } from "react-icons/gi";
import { FaFan } from "react-icons/fa";
import { BsLightbulbFill } from "react-icons/bs";

const SchedulePage = () => {
  // Form state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
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
      date: selectedDate.toLocaleDateString("en-CA"), // YYYY-MM-DD
      time: selectedTime.toLocaleTimeString("en-GB", {
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
    <div className="schedule-page container my-5">
      <h2 className="mb-4 text-center fw-bold">
        Thiết lập lịch bật/tắt thiết bị
      </h2>

      {/* Card form */}
      <div className="card shadow-sm p-4 mb-5">
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
            <label className="form-label fw-semibold">Chọn giờ</label>
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
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Ngày</th>
              <th>Giờ</th>
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
                  <td>{item.time}</td>
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
                <td colSpan="5" className="text-center text-muted">
                  Chưa có lịch nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePage;
