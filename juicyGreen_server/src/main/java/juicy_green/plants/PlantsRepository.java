package juicy_green.plants;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface PlantsRepository extends JpaRepository<Plant, Integer> {

    List<Plant> findByCategory(String category);

    void deleteByCommonName(String commonName);
}