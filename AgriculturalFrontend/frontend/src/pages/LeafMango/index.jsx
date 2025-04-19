import styles from "./LeafMango.module.scss";
import classNames from "classnames/bind";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaLeaf, FaMicroscope } from "react-icons/fa";
import { useState } from "react";

const cx = classNames.bind(styles);

const responseFakeData = {
  prediction: "Powdery Mildew",
  confidence: 99.49,
  probabilities: {
    Anthracnose: 0.04,
    "Bacterial Canker": 0.02,
    "Cutting Weevil": 0.03,
    "Die Back": 0.14,
    "Gall Midge": 0.02,
    Healthy: 0.02,
    "Powdery Mildew": 99.49,
    "Sooty Mould": 0.24,
  },
};

const transformData = (probabilities) =>
  Object.entries(probabilities).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

function LeafMango() {
  const [imageSrc, setImageSrc] = useState(null);
  const [response, setResponse] = useState(responseFakeData);
  const chartData = transformData(response.probabilities);
  const [filePicture, setFilePicture] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePicture(file);
      const previewUrl = URL.createObjectURL(file);
      setImageSrc(previewUrl);
    }
  };
  const handleOnClickUploadFile = async () => {
    if (!filePicture) {
      alert("Vui lòng chọn một file ảnh.");
      return;
    }

    const formData = new FormData();
    formData.append("file", filePicture);

    try {
      const response = await fetch("http://127.0.0.1:8001/predict/", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();
      setResponse(data);
      console.log("abc");
    } catch (error) {
      console.error("Lỗi khi gửi ảnh:", error);
      alert("Gửi ảnh thất bại!");
    }
    // finally {
    //   setLoading(false);
    // }
  };
  return (
    <div>
      <div className={cx("container_uploadFile")}>
        <div className={cx("wrapper_uploadFile")}>
          <h3 className={cx("wrapper_uploadFile_title")}>
            {" "}
            Upload ảnh để tiến hành dự đoán
          </h3>
          <div className={cx("wrapper_uploadFile_forInput")}>
            <input
              className={cx("wrapper_uploadFile_input")}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className={cx("wrapper_uploadFile_forButton")}>
            <button
              className={cx("wrapper_uploadFile_button")}
              onClick={handleOnClickUploadFile}
            >
              {" "}
              Phân tích{" "}
            </button>
          </div>
          <div className={cx("wrapper_imageUpload_parent")}>
            {imageSrc && (
              <img
                className={cx("wrapper_imageUpload")}
                src={imageSrc}
                alt="preview"
              />
            )}
          </div>
        </div>
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("title")}>
          <FaLeaf className={cx("icon")} />
          Phát hiện bệnh lá xoài
        </div>
        <div className={cx("result")}>
          <FaMicroscope /> Dự đoán bệnh: <strong>{response.prediction}</strong>
          <span className={cx("badge")}>{response.confidence.toFixed(2)}%</span>
        </div>

        <div className={cx("chart")}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-15} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#6c5ce7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default LeafMango;
