package juicy_green.plants;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantsRepository extends JpaRepository<Plant, Integer> {

    List<Plant> findByCategory(String category);

    void deleteByCommonName(String commonName);
}