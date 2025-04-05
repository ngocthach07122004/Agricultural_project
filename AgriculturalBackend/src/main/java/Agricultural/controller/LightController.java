package Agricultural.controller;

import Agricultural.service.AdaLightService;
// Using manual injection as shown in the provided code
import org.springframework.beans.factory.annotation.Autowired;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays; // Import Arrays for list creation
import java.util.List;   // Import List

// Example URL: http://localhost:8080/light/75
@RestController
@RequestMapping("/light")
public class LightController {

    private final AdaLightService adaLightService;

    // Manual constructor injection
    @Autowired
    public LightController(AdaLightService adaLightService) {
        this.adaLightService = adaLightService;
    }

    // Define the allowed values
    private static final List<Integer> ALLOWED_VALUES = Arrays.asList(0, 25, 50, 75, 100);

    @GetMapping("/{value}")
    public ResponseEntity<String> controlLight(@PathVariable String value) {
        int numericValue;
        try {
            // 1. Try to parse the input string to an integer
            numericValue = Integer.parseInt(value);

            // 2. Validate the numeric value:
            //    - Must be one of the predefined allowed values (0, 25, 50, 75, 100)
            //    Using List.contains() for easy checking
            if (!ALLOWED_VALUES.contains(numericValue)) { // <--- UPDATED VALIDATION LOGIC
                // If validation fails, return a bad request with the new specific error message
                return ResponseEntity.badRequest().body("Invalid value. Use one of the following values: 0, 25, 50, 75, 100."); // <--- UPDATED ERROR MESSAGE
            }

        } catch (NumberFormatException e) {
            // 3. If parsing fails (input is not a number), return a bad request
            return ResponseEntity.badRequest().body("Invalid value. Input must be a numeric value.");
        }

        // 4. If validation passes, proceed to publish
        try {
            adaLightService.publish(value); // Publish the original string value
            // Update success message to reflect "light value"
            return ResponseEntity.ok("Set light value to " + value); // <--- UPDATED SUCCESS MESSAGE
        } catch (MqttException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error publishing MQTT message: " + e.getMessage());
        }
    }
}