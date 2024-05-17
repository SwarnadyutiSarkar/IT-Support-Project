import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class MDMClient extends JFrame {
    private JPanel mainPanel;
    private JTextField deviceNameField;
    private JTextField ownerField;
    private JButton addButton;
    private JButton refreshButton;
    private JButton deleteButton;
    private JTextArea outputArea;
    private JTextField deviceIdField;

    public MDMClient() {
        setTitle("MDM Solution");
        setSize(600, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setContentPane(mainPanel);

        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                addDevice();
            }
        });

        refreshButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                getDevices();
            }
        });

        deleteButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                deleteDevice();
            }
        });
    }

    private void addDevice() {
        try {
            String deviceName = deviceNameField.getText();
            String owner = ownerField.getText();

            URL url = new URL("http://localhost:5000/devices");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);

            String jsonInputString = String.format("{\"device_name\": \"%s\", \"owner\": \"%s\"}", deviceName, owner);

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            Scanner scanner = new Scanner(conn.getInputStream(), "UTF-8");
            String response = scanner.useDelimiter("\\A").next();
            outputArea.setText(response);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private void getDevices() {
        try {
            URL url = new URL("http://localhost:5000/devices");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            Scanner scanner = new Scanner(conn.getInputStream(), "UTF-8");
            String response = scanner.useDelimiter("\\A").next();
            outputArea.setText(response);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private void deleteDevice() {
        try {
            int deviceId = Integer.parseInt(deviceIdField.getText());

            URL url = new URL("http://localhost:5000/devices/" + deviceId);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("DELETE");

            Scanner scanner = new Scanner(conn.getInputStream(), "UTF-8");
            String response = scanner.useDelimiter("\\A").next();
            outputArea.setText(response);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                MDMClient client = new MDMClient();
                client.setVisible(true);
            }
        });
    }
}
