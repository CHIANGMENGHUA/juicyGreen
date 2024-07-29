package juicy_green.plants;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="plant")
public class Plant {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name="category")
    private String category;

    @Column(name="common_name")
    private String commonName;

    @Column(name="botanical_name")
    private String botanicalName;

    @Column(name="description")
    private String description;

    @Column(name="image")
    private String image;

    @Column(name="external_images_link")
    private String externalImagesLink;

    @Column(name="wiki_link")
    private String wikiLink;

    @Column(name="created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
