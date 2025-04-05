//package Agricultural.controller;
//
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import org.eclipse.paho.client.mqttv3.MqttException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import Agricultural.service.LightMqttService;
//
//@RestController
//@RequestMapping("/lighttoggle")
//@RequiredArgsConstructor
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
//public class ToggleController {
//    //    @Autowired
//     LightMqttService mqttService;
//
//
////    public ToggleController(LightMqttService mqttService) {
////        this.mqttService = mqttService;
////    }
//
//    @GetMapping("/{value}")
//    public ResponseEntity<String> toggle(@PathVariable String value) {
//        if (!value.equals("0") && !value.equals("1")) {
//            return ResponseEntity.badRequest().body("Invalid value. Use '0' for off or '1' for on.");
//        }
//        try {
//            mqttService.publish(value);
//            String status = value.equals("1") ? "on" : "off";
//            return ResponseEntity.ok("Toggled light to " + status + " (payload: " + value + ")");
//        } catch (MqttException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Error publishing MQTT message: " + e.getMessage());
//        }
//    }
//}
