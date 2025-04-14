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

const cx = classNames.bind(styles);

const response = {
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
  const chartData = transformData(response.probabilities);

  return (
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
  );
}

export default LeafMango;
