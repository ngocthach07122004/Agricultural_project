package Agricultural.controller;

import Agricultural.service.FanMqttService; // Import the correct service
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Example URL: http://localhost:8080/fan/60
@RestController
@RequestMapping("/fan") // Map to the /fan path
public class FanController {

    // Inject the FanMqttService
    private final FanMqttService fanMqttService;

    @Autowired
    public FanController(FanMqttService fanMqttService) {
        this.fanMqttService = fanMqttService;
    }

    @GetMapping("/{value}")
    // Method name reflects the resource
    public ResponseEntity<String> controlFan(@PathVariable String value) {
        int numericValue;
        try {
            // 1. Try to parse the input string to an integer
            numericValue = Integer.parseInt(value);

            // 2. Validate the numeric value (0-100, step 10 - same as water)
            if (numericValue < 0 || numericValue > 100 || numericValue % 10 != 0) {
                // If validation fails, return a bad request with the correct message
                return ResponseEntity.badRequest().body("Invalid value. Use a multiple of 10 between 0 and 100 (e.g., 0, 10, 20,..., 100).");
            }

        } catch (NumberFormatException e) {
            // 3. If parsing fails, return a bad request
            return ResponseEntity.badRequest().body("Invalid value. Input must be a numeric value.");
        }

        // 4. If validation passes, proceed to publish using the fan service
        try {
            fanMqttService.publish(value); // Call the correct service instance
            // Update the success message
            return ResponseEntity.ok("Set fan value to " + value);
        } catch (MqttException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error publishing MQTT message: " + e.getMessage());
        }
    }
}