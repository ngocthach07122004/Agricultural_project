package Agricultural.controller;

import Agricultural.service.WaterMqttService;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/water")
public class WaterController {

    private final WaterMqttService waterMqttService;

    @Autowired
    public WaterController(WaterMqttService waterMqttService) {
        this.waterMqttService = waterMqttService;
    }

    @GetMapping("/{value}")
    public ResponseEntity<String> controlWater(@PathVariable String value) {
        // Validate that the value is one of "0", "1", or "2"
        if (!value.equals("0") && !value.equals("1") && !value.equals("2")) {
            return ResponseEntity.badRequest().body("Invalid value. Use '0', '1', or '2'.");
        }
        try {
            waterMqttService.publish(value);
            return ResponseEntity.ok("Set water feed to " + value);
        } catch (MqttException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error publishing MQTT message: " + e.getMessage());
        }
    }
}
