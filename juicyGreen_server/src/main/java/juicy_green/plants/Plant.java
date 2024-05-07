package juicy_green.plants;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@EqualsAndHashCode
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
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
