package Agricultural.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;


@Data
@Builder
@FieldDefaults(level =  AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DeviceAction  {
    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    String idDeviceAction;
    LocalDate date; // Ngày thực hiện hành động

    LocalTime startTime; // Giờ bắt đầu

    LocalTime endTime; // Giờ kết thúc

    String device; // Tên thiết bị

    String action;

}

