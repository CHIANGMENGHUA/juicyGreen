package juicy_green.plants;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantsRepository extends JpaRepository<Plant, Integer> {
    List<Plant> findByCategory(String category);

    Optional<Plant> findByCommonName(String commonName);

    void deleteByCommonName(String commonName);
}