//package Agricultural.service;
//
//import jakarta.annotation.PostConstruct;
//import jakarta.annotation.PreDestroy;
//import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
//import org.eclipse.paho.client.mqttv3.MqttClient;
//import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
//import org.eclipse.paho.client.mqttv3.MqttException;
//import org.eclipse.paho.client.mqttv3.MqttMessage;
//import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//@Service
//public class LightSensorMonitorService {
//
//    @Value("${adafruit.username}")
//    private String username;
//
//    @Value("${adafruit.aio-key}")
//    private String aioKey;
//
//    private MqttClient client;
//
//    // Inject the MqttService used for controlling the light feed (lightkey)
//    @Autowired
//    private LightMqttService mqttService;
//
//
//
//    @PostConstruct
//    public void init() throws MqttException {
//        String brokerUrl = "ssl://io.adafruit.com:8883";
//        String clientId = username + "-light-sensor-monitor";
//        client = new MqttClient(brokerUrl, clientId, new MemoryPersistence());
//
//        MqttConnectOptions connOpts = new MqttConnectOptions();
//        connOpts.setUserName(username);
//        connOpts.setPassword(aioKey.toCharArray());
//        connOpts.setCleanSession(true);
//
//        client.connect(connOpts);
//        System.out.println("Connected to Adafruit IO for Light Sensor Monitoring via MQTT");
//
//        // Subscribe to the light-sensor feed.
//        String sensorTopic = username + "/feeds/light-sensor";
//        client.subscribe(sensorTopic, new IMqttMessageListener() {
//            @Override
//            public void messageArrived(String topic, MqttMessage message) throws Exception {
//                String payload = new String(message.getPayload()).trim();
//                System.out.println("Received message on " + topic + ": " + payload);
//
//
//
////                try {
////                    int sensorValue = Integer.parseInt(payload);
////                    // Publish command to light feed based on sensor value:
////                    // If sensor value is below 30, publish "1" to turn light on; otherwise, "0" to turn it off.
////                    if (sensorValue < 30) {
////                        mqttService.publish("1");
////                        System.out.println("Sensor value below 30. Light turned on.");
////                    } else {
////                        mqttService.publish("0");
////                        System.out.println("Sensor value 30 or above. Light turned off.");
////                    }
////                } catch (NumberFormatException e) {
////                    System.err.println("Invalid sensor value received: " + payload);
////                }
//                try {
//                    int sensorValue = Integer.parseInt(payload);
//                    // Removed automatic light control. Now, simply log the sensor value.
//                    System.out.println("Sensor value: " + sensorValue);
//                    // Optionally, republish the sensor data if needed:
//                    // mqttService.publish(payload);
//                } catch (NumberFormatException e) {
//                    System.err.println("Invalid sensor value received: " + payload);
//                }
//
//            }
//        });
//    }
//
//    @PreDestroy
//    public void disconnect() throws MqttException {
//        if (client != null && client.isConnected()) {
//            client.disconnect();
//            System.out.println("Disconnected from Adafruit IO Light Sensor Monitoring");
//        }
//    }
//}
