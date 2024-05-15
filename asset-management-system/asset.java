import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "assets")
public class Asset {
    @Id
    private String id;
    private String name;
    private String type;
    private String location;

    // Getters and Setters
}
