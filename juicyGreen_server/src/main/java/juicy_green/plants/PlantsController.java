package juicy_green.plants;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin
@Transactional
@RequestMapping("/plants")
public class PlantsController {

    @Autowired
    private PlantsRepository plantsRepository;

    @GetMapping("/")
    public List<Plant> findAll() {
        return plantsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Plant> findOneByid(@PathVariable int id) {
        return plantsRepository.findById(id);
    }

    @GetMapping("/category/{category}")
    public List<Plant> findAllByCategory(@PathVariable String category) {
        return plantsRepository.findByCategory(category);
    }

    @GetMapping("/commonName/{commonName}")
    public Optional<Plant> findByCommonName(@PathVariable String commonName) {
        return plantsRepository.findByCommonName(commonName);
    }

    @PostMapping("/")
    public Plant create(@RequestBody Plant plant) {
        return plantsRepository.save(plant);
    }

    @PutMapping("/commonName/{commonName}")
    public Plant update(@PathVariable String commonName, @RequestBody Plant plantDetails) {
        Optional<Plant> optionalPlant = plantsRepository.findByCommonName(commonName);
        if (optionalPlant.isPresent()) {
            Plant plant = optionalPlant.get();
            plant.setId(plantDetails.getId());
            plant.setCategory(plantDetails.getCategory());
            plant.setCommonName(plantDetails.getCommonName());
            plant.setBotanicalName(plantDetails.getBotanicalName());
            plant.setDescription(plantDetails.getDescription());
            plant.setImage(plantDetails.getImage());
            plant.setExternalImagesLink(plantDetails.getExternalImagesLink());
            plant.setWikiLink(plantDetails.getWikiLink());
            return plantsRepository.save(plant);
        } else {
            return null;
        }
    }

    @DeleteMapping("/commonName/{commonName}")
    public void delete(@PathVariable String commonName) {
        plantsRepository.deleteByCommonName(commonName);
    }
}