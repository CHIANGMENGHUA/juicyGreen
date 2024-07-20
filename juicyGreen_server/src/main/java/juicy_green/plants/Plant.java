package juicy_green.plants;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="plant")
public class Plant {

    @Id
    @GeneratedValue
    private Long id;

    private String category;
    private String commonName;
    private String botanicalName;
    private String description;
    private String image;
    private String externalImagesLink;
    private String wikiLink;
    private LocalDateTime createdAt = LocalDateTime.now();
}
