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
//public class AdaLightService {
//
//    @Value("${adafruit.username}")
//    private String username;
//
//    @Value("${adafruit.light}")
//    private String light;
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
//        String clientId = username + "-light-spring-boot-client";
//        client = new MqttClient(brokerUrl, clientId, new MemoryPersistence());
//
//        MqttConnectOptions connOpts = new MqttConnectOptions();
//        connOpts.setUserName(username);
//        connOpts.setPassword(aioKey.toCharArray());
//        connOpts.setCleanSession(true);
//
//        client.connect(connOpts);
//        System.out.println("Connected to Adafruit IO for new Light Feed via MQTT");
//    }
//
//    public void publish(String message) throws MqttException {
//        // The topic for Adafruit IO MQTT is in the form: username/feeds/light
//        String topic = username + "/feeds/" + light;
//
//        MqttMessage mqttMessage = new MqttMessage(message.getBytes());
//        mqttMessage.setQos(1); // Quality of Service level 1
//        client.publish(topic, mqttMessage);
//        System.out.println("Published light message: " + message + " to topic: " + topic);
//    }
//
//    @PreDestroy
//    public void disconnect() throws MqttException {
//        if (client != null && client.isConnected()) {
//            client.disconnect();
//            System.out.println("Disconnected from Adafruit IO for new Light Feed");
//        }
//    }
//}

package Agricultural.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AdaLightService {

    @Value("${adafruit.username}")
    private String username;

    @Value("${adafruit.light}")
    private String light;

    @Value("${adafruit.aio-key}")
    private String aioKey;

    private MqttClient client;
    private MqttConnectOptions connOpts;

    @PostConstruct
    public void init() throws MqttException {
        String brokerUrl = "ssl://io.adafruit.com:8883";
        String clientId = username + "-light-spring-boot-client";

        client = new MqttClient(brokerUrl, clientId, new MemoryPersistence());

        connOpts = new MqttConnectOptions();
        connOpts.setUserName(username);
        connOpts.setPassword(aioKey.toCharArray());
        connOpts.setCleanSession(true);
        connOpts.setAutomaticReconnect(true);

        connectIfNeeded();

        System.out.println("Connected to Adafruit IO for new Light Feed via MQTT");
    }

    public void publish(String message) throws MqttException {
        connectIfNeeded(); // ensure client is connected

        String topic = username + "/feeds/" + light;

        MqttMessage mqttMessage = new MqttMessage(message.getBytes());
        mqttMessage.setQos(1);

        client.publish(topic, mqttMessage);
        System.out.println("Published light message: " + message + " to topic: " + topic);
    }

    private void connectIfNeeded() throws MqttException {
        if (client != null && !client.isConnected()) {
            System.out.println("MQTT client not connected. Attempting to reconnect...");
            client.connect(connOpts);
            System.out.println("Reconnected to Adafruit IO MQTT broker.");
        }
    }

    @PreDestroy
    public void disconnect() throws MqttException {
        if (client != null && client.isConnected()) {
            client.disconnect();
            System.out.println("Disconnected from Adafruit IO for new Light Feed");
        }
    }
}
