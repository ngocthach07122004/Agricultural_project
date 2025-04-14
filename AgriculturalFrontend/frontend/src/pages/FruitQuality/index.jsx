import styles from "./FruitQuality.module.scss";
import classNames from "classnames/bind";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  FaAppleAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaPercent,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const cx = classNames.bind(styles);

const response = {
  fruit: {
    prediction: "Apple",
    confidence: 99.97,
    probabilities: {
      Apple: 99.97,
      Banana: 0,
      Guava: 0.03,
      Lime: 0,
      Orange: 0,
      Pomegranate: 0,
    },
  },
  quality: {
    prediction: "Bad",
    confidence: 99.99,
    probabilities: {
      Good: 0.01,
      Bad: 99.99,
    },
  },
};

const transformData = (probabilities) =>
  Object.entries(probabilities).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

function FruitQuality() {
  const fruitData = transformData(response.fruit.probabilities);
  const qualityData = transformData(response.quality.probabilities);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("section")}>
        <div className={cx("title")}>
          <FaAppleAlt className={cx("iconHeader")} />
          Dự đoán loại trái cây
        </div>
        <div className={cx("description")}>
          <FaCheckCircle color="#2ecc71" /> Kết quả:{" "}
          <strong>{response.fruit.prediction}</strong> (
          <FaPercent /> {response.fruit.confidence.toFixed(2)}%)
        </div>
        <div className={cx("chart")}>
          <ResponsiveContainer width="90%" height={250}>
            <BarChart data={fruitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={cx("section")}>
        <div className={cx("title")}>
          {response.quality.prediction === "Good" ? (
            <FaThumbsUp className={cx("iconHeader")} />
          ) : (
            <FaThumbsDown className={cx("iconHeader")} />
          )}
          Dự đoán chất lượng
        </div>
        <div className={cx("description")}>
          {response.quality.prediction === "Good" ? (
            <FaCheckCircle color="#2ecc71" />
          ) : (
            <FaExclamationCircle color="#e74c3c" />
          )}{" "}
          Kết qủa :{" "}
          <strong
            style={{
              color:
                response.quality.prediction === "Good" ? "#27ae60" : "#e74c3c",
            }}
          >
            {response.quality.prediction}
          </strong>{" "}
          (<FaPercent /> {response.quality.confidence.toFixed(2)}%)
        </div>
        <div className={cx("chart")}>
          <ResponsiveContainer width="90%" height={250}>
            <BarChart data={qualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#f66f91" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default FruitQuality;
