//package Agricultural.service;
//
//import jakarta.annotation.PostConstruct;
//import jakarta.annotation.PreDestroy;
//import org.eclipse.paho.client.mqttv3.MqttClient;
//import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
//import org.eclipse.paho.client.mqttv3.MqttException;
//import org.eclipse.paho.client.mqttv3.MqttMessage;
//import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//@Service
//public class LightMqttService {
//
//
//    @Value("${adafruit.username}")
//    private String username;
//
//    @Value("${adafruit.feed}")
//    private String feed;
//
//    @Value("${adafruit.aio-key}")
//    private String aioKey;
//
//    private MqttClient client;
//
//    @PostConstruct
//    public void init() throws MqttException {
//        // Use secure connection (TLS) on port 8883
//        String brokerUrl = "ssl://io.adafruit.com:8883";
////        String clientId = username + "-spring-boot-client";
//
//     String clientId = username + "-spring-boot-client";
////        String clientId = "spring-boot-client-" + System.currentTimeMillis();
//
//        client = new MqttClient(brokerUrl, clientId, new MemoryPersistence());
//
//        MqttConnectOptions connOpts = new MqttConnectOptions();
//        connOpts.setUserName(username);
//        connOpts.setPassword(aioKey.toCharArray());
//        connOpts.setCleanSession(true);
//
//        client.connect(connOpts);
//        System.out.println("Connected to Adafruit IO via MQTT");
//    }
//
//    public void publish(String message) throws MqttException {
//        // The topic for Adafruit IO MQTT is in the form: username/feeds/feedkey
//        String topic = username + "/feeds/" + feed;
//        MqttMessage mqttMessage = new MqttMessage(message.getBytes());
//        mqttMessage.setQos(1); // Quality of Service level 1
//        client.publish(topic, mqttMessage);
//        System.out.println("Published message: " + message + " to topic: " + topic);
//    }
//
//    @PreDestroy
//    public void disconnect() throws MqttException {
//        if (client != null && client.isConnected()) {
//            client.disconnect();
//            System.out.println("Disconnected from Adafruit IO");
//        }
//    }
//}
