import React from "react";
import { Col, Row } from "antd";
import bk01 from "../../assets/bku01.jpeg";
import bk02 from "../../assets/bku02.jpeg";
import bk03 from "../../assets/bku03.jpg";
import bk04 from "../../assets/bku04.jpeg";
import bk05 from "../../assets/bku05.png";
import bk07 from "../../assets/bku07.png";
import farm3 from "../../assets/farm3.jpg";

import styles from "./styles.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const About = () => (
  <div class={cx("wrapper_about container")}>
    <div class={cx("wrapper_about_row row")}>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <img className={cx("warpper_picture")} src={bk01} alt="bk01" />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <div>
          <h2 class="wrapper_detail_title">Giới thiệu chung về trường</h2>
          <p>
            Tên trường: Đại học Bách Khoa Đại học Quốc Gia TPHCM, tên tiếng Anh
            là Ho Chi Minh City University of Technology, viết tắt là HCMUT.
            –Địa chỉ: 268 Lý Thường Kiệt, P.14, Q.10, TP. Hồ Chí Minh Tiền thân
            của trường là Trung tâm Kỹ thuật Quốc gia được đổi tên thành Đại học
            Bách Khoa TPHCM vào năm 1976 với 5 khoa chuyên ngành: Điện – Điện
            tử, Xây Dựng, Thủy lợi, Hóa học và Cơ khí. Đến năm 1996, Đại học
            Bách Khoa chính thức trở thành thành viên của Đại học Quốc gia TP.
            Hồ Chí Minh. Nhà trường luôn phấn đấu để trở thành cơ sở đào tạo đại
            học đạt trình độ cao với đa ngành đa lĩnh vực, đồng thời là trung
            tâm nghiên cứu khoa học công nghệ hàng đầu của khu vực miền Nam nói
            riêng và của cả nước nói chung. Đội ngũ lãnh đạo nhà trường cũng
            luôn phấn đấu để đưa đại học Bách Khoa trở thành địa chỉ đáng tin
            cậy và hấp dẫn đối với những nhà đầu tư phát triển công nghệ và với
            giới doanh nghiệp trong nước cũng như quốc tế. Đại học Bách Khoa có
            đội ngũ cán bộ công nhân viên chức gồm hơn 930 người, trong đó có 9
            giáo sư, 103 phó giáo sư, hơn 338 Tiến sĩ, hơn 443 Thạc sĩ và 99
            Giảng viên có trình độ đại học. Mỗi giảng viên đều có dày dạn kinh
            nghiệm, có nhiệt huyết đối với các hoạt động đào tạo và nghiên cứu
            khoa học, chuyển giao công nghệ. Nhà trường cũng đang từng bước nâng
            cao chất lượng giảng viên để xây dựng một trường đại học vững mạnh,
            phục vụ đất nước.{" "}
          </p>
        </div>
      </div>
    </div>
    <div class={cx("wrapper_about_row row")}>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <img className={cx("warpper_picture")} src={farm3} alt="bk01" />
        {/* <img className={cx("warpper_picture")} src={bk03} alt="bk03" /> */}
      </div>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <div>
          <h2 class="wrapper_detail_title">Giới thiệu về dự án SMARTGROW</h2>
          <p>
            Nhà kính được sử dụng để điều chỉnh các điều kiện khí hậu cho các
            loại cây nhạy cảm hoặc không phải là cây bản địa của khí hậu địa
            phương. Vì các biến số bên ngoài như ánh sáng mặt trời, gió và mưa
            ảnh hưởng rất lớn đến nhà kính theo những cách không thể đoán trước,
            nên việc duy trì nhà kính trong điều kiện phù hợp luôn là một nhiệm
            vụ đòi hỏi nhiều công sức. Do đó, nhà kính thương mại hiện đại là cơ
            sở sản xuất công nghệ cao với các thiết bị như lưới chắn nắng tự
            động, kiểm soát khí hậu nhân tạo, chiếu sáng, v.v. và có thể được
            điều khiển bằng máy tính để tối ưu hóa các điều kiện cho cây trồng
            phát triển. Các kỹ thuật khác nhau được sử dụng để ước tính mức độ
            tối ưu của các điều kiện trong nhà kính, chẳng hạn như nhiệt độ
            không khí, độ ẩm và thay đổi áp suất bên trong do hơi nước.Đối với
            dự án này, mục tiêu của chúng tôi là phát triển nguyên mẫu của một
            hệ thống như vậy, tận dụng những tiến bộ trong kết nối Internet và
            không dây để tăng cường sự tiện lợi và linh hoạt với nhiều chức năng
            dư thu thập dữ liệu trong nhà kính để tiến hành đánh giá, phân tích.
            Các chức năng tự động giúp công việc trở nên dễ dàng hơn đồng thời
            người điều khiển có thể kiểm soát nhà kính thông qua hệ thống của
            chúng tôi.{" "}
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default About;
