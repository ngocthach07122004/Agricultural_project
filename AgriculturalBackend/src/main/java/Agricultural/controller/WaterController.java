package Agricultural.controller;

import Agricultural.service.WaterMqttService;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//http://localhost:8080/water/100
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
        int numericValue;
        try {
            // 1. Try to parse the input string to an integer
            numericValue = Integer.parseInt(value);

            // 2. Validate the numeric value:
            //    - Must be between 0 and 100 (inclusive)
            //    - Must be a multiple of 10
            if (numericValue < 0 || numericValue > 100 || numericValue % 10 != 0) {
                // If validation fails, return a bad request with a new error message
                return ResponseEntity.badRequest().body("Invalid value. Use a multiple of 10 between 0 and 100 (e.g., 0, 10, 20,..., 100).");
            }

        } catch (NumberFormatException e) {
            // 3. If parsing fails (input is not a number), return a bad request
            return ResponseEntity.badRequest().body("Invalid value. Input must be a numeric value.");
        }

        // 4. If validation passes, proceed to publish
        try {
            waterMqttService.publish(value); // Publish the original string value
            return ResponseEntity.ok("Set water feed value to " + value);
        } catch (MqttException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error publishing MQTT message: " + e.getMessage());
        }
    }
}