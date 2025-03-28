package Agricultural.repository;

import Agricultural.entity.DeviceAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface DeviceActionRepository extends JpaRepository< DeviceAction, String> {
    List<DeviceAction> findByIdDeviceAction(String idDeviceAction);
    List<DeviceAction> findByDate(LocalDate date);
}
