package Agricultural.service;

import Agricultural.entity.Temperature;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class    TemperatureService {
    @Autowired
    private TemperatureDataService temperatureService;

    // Inject your Adafruit IO username and key from application.properties
    @Value("${adafruit.username}")
    private String username;

    @Value("${adafruit.aio-key}")
    private String aioKey;

    /**
     * You have multiple ways to specify the feed:
     *  1) Hardcode "air-moisture" if you want it dedicated for this service.
     *  2) Make it configurable in application.properties with something like:
     *       adafruit.air-moisture-feed=air-moisture
     *     then use @Value("${adafruit.air-moisture-feed}") here.
     */
    private final String feedKey = "temperature";

    private MqttClient client;

    // Path to the local text file where data will be stored
    private static final Path FEED_DATA_FILE = Paths.get("air_moisture_feed_data.txt");

    @PostConstruct
    public void init() throws MqttException {
        // MQTT broker URL for Adafruit IO with TLS on port 8883
        String brokerUrl = "ssl://io.adafruit.com:8883";
            String clientId  = username + "-temperature-service";

        // Create an MQTT client with in-memory persistence
        client = new MqttClient(brokerUrl, clientId, new MemoryPersistence());

        // Set MQTT connection options
        MqttConnectOptions connOpts = new MqttConnectOptions();
        connOpts.setUserName(username);
        connOpts.setPassword(aioKey.toCharArray());
        connOpts.setCleanSession(true);

        // Connect to Adafruit IO
        client.connect(connOpts);
        System.out.println("Connected to Adafruit IO (AirMoistureMqttService)");

        // Subscribe to the "air-moisture" feed
        String topic = username + "/feeds/" + feedKey;
        client.subscribe(topic, (receivedTopic, message) -> {
            String payload = new String(message.getPayload());
            System.out.println("Received message on air-moisture feed: " + payload);

            // Optionally, prepend a timestamp
//            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
//            String lineToWrite = timestamp + " - " + payload;
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//            LocalDate timestampConvert = LocalDate.parse(timestamp, formatter);
////            System.out.println( "CHECK" +  timestamp);
////            System.out.println( "CHECK" + lineToWrite);
//            Temperature temperature = Temperature.builder().time(timestampConvert).build();

            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            String lineToWrite = timestamp + " - " + payload;

// Định dạng đúng để parse timestamp
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

// Chuyển đổi trực tiếp thành LocalDateTime
            LocalDateTime timestampConvert = LocalDateTime.parse(timestamp, formatter);

// Tạo đối tượng Temperature
            Temperature temperature = Temperature.builder().time(timestampConvert).valueTemperature(payload).build();
            temperatureService.createTemperature(temperature);
            // Append the payload to a text file
//            try {
//                Files.writeString(
//                        FEED_DATA_FILE,
//                        lineToWrite + System.lineSeparator(),
//                        StandardOpenOption.CREATE,  // create file if not exists
//                        StandardOpenOption.APPEND   // append to the file
//                );
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
        });
    }
    /**
     * Optional method if you also want to publish to this feed.
     */
    public void publish(String data) throws MqttException {
        String topic = username + "/feeds/" + feedKey;
        MqttMessage mqttMessage = new MqttMessage(data.getBytes());
        mqttMessage.setQos(1);
        client.publish(topic, mqttMessage);
        System.out.println("Published data to air-moisture feed: " + data);
    }

    @PreDestroy
    public void disconnect() throws MqttException {
        if (client != null && client.isConnected()) {
            client.disconnect();
            System.out.println("Disconnected from Adafruit IO (AirMoistureMqttService)");
        }
    }
}
