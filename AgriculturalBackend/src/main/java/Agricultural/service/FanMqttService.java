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
public class FanMqttService {

    @Value("${adafruit.username}")
    private String username;

    // Use the specific configuration key for the fan
    @Value("${adafruit.fan}")
    private String fanFeedKey; // Use a descriptive variable name

    @Value("${adafruit.aio-key}")
    private String aioKey;

    private MqttClient client;

    @PostConstruct
    public void init() throws MqttException {
        String brokerUrl = "ssl://io.adafruit.com:8883";
        // Use a specific client ID for the fan service
        String clientId = username + "-fan-spring-boot-client";
        client = new MqttClient(brokerUrl, clientId, new MemoryPersistence());

        MqttConnectOptions connOpts = new MqttConnectOptions();
        connOpts.setUserName(username);
        connOpts.setPassword(aioKey.toCharArray());
        connOpts.setCleanSession(true);

        client.connect(connOpts);
        // Updated log message
        System.out.println("Connected to Adafruit IO for Fan Feed via MQTT");
    }

    public void publish(String message) throws MqttException {
        // Topic uses the fanFeedKey variable (which holds "fan")
        String topic = username + "/feeds/" + fanFeedKey;

        MqttMessage mqttMessage = new MqttMessage(message.getBytes());
        mqttMessage.setQos(1); // Quality of Service level 1
        client.publish(topic, mqttMessage);
        // Updated log message
        System.out.println("Published fan message: " + message + " to topic: " + topic);
    }

    @PreDestroy
    public void disconnect() throws MqttException {
        if (client != null && client.isConnected()) {
            client.disconnect();
            // Updated log message
            System.out.println("Disconnected from Adafruit IO for Fan Feed");
        }
    }
}