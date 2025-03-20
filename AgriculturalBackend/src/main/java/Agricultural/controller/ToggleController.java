package Agricultural.controller;

import Agricultural.service.MqttService;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

;

@RestController
@RequestMapping("/toggle")
public class ToggleController {

    private final MqttService mqttService;

    @Autowired
    public ToggleController(MqttService mqttService) {
        this.mqttService = mqttService;
    }

    @GetMapping("/{state}")
    public ResponseEntity<String> toggle(@PathVariable String state) {
        String payload;
        if (state.equalsIgnoreCase("on")) {
            payload = "1";
        } else if (state.equalsIgnoreCase("off")) {
            payload = "0";
        } else {
            return ResponseEntity.badRequest().body("Invalid state. Use 'on' or 'off'.");
        }

        try {
            mqttService.publish(payload);
            return ResponseEntity.ok("Toggled light to " + state + " (payload: " + payload + ")");
        } catch (MqttException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error publishing MQTT message: " + e.getMessage());
        }
    }

}
