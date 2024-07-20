package juicy_green.plants;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class PlantsApiTest {

	@Mock
	private PlantsRepository plantsRepository;

	@InjectMocks
	private PlantsController plantsController;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void testFindAll() {
		// Arrange
		List<Plant> plants = new ArrayList<>();
		plants.add(new Plant());
		when(plantsRepository.findAll()).thenReturn(plants);

		// Act
		List<Plant> result = plantsController.findAll();

		// Assert
		assertNotNull(result);
		assertEquals(1, result.size());
	}

	@Test
	public void testFindOneById() {
		// Arrange
		Plant plant = new Plant();
		plant.setId((long) 1);
		when(plantsRepository.findById(1)).thenReturn(Optional.of(plant));

		// Act
		Optional<Plant> result = plantsController.findOneById(1);

		// Assert
		assertTrue(result.isPresent());
		assertEquals(1, result.get().getId());
	}

	@Test
	public void testFindAllByCategory() {
		// Arrange
		List<Plant> plants = new ArrayList<>();
		plants.add(new Plant());
		when(plantsRepository.findByCategory("category")).thenReturn(plants);

		// Act
		List<Plant> result = plantsController.findAllByCategory("category");

		// Assert
		assertNotNull(result);
		assertEquals(1, result.size());
	}

	@Test
	public void testCreate() {
		// Arrange
		Plant plant = new Plant();
		when(plantsRepository.save(any(Plant.class))).thenReturn(plant);

		// Act
		Plant result = plantsController.create(plant);

		// Assert
		assertNotNull(result);
	}

	@Test
	public void testUpdate() {
		// Arrange
		Plant existingPlant = new Plant();
		existingPlant.setCommonName("commonName");
		Plant updatedPlant = new Plant();
		updatedPlant.setId((long) 1);
		updatedPlant.setCategory("category");
		updatedPlant.setCommonName("updatedCommonName");
		updatedPlant.setBotanicalName("botanicalName");
		updatedPlant.setDescription("description");
		updatedPlant.setImage("image");
		updatedPlant.setExternalImagesLink("externalImagesLink");
		updatedPlant.setWikiLink("wikiLink");
		when(plantsController.findOneById(1)).thenReturn(Optional.of(existingPlant));
		when(plantsRepository.save(any(Plant.class))).thenReturn(updatedPlant);

		// Act
		Plant result = plantsController.update(1, updatedPlant);

		// Assert
		assertNotNull(result);
		assertEquals(1, result.getId());
		assertEquals("category", result.getCategory());
		assertEquals("updatedCommonName", result.getCommonName());
		assertEquals("botanicalName", result.getBotanicalName());
		assertEquals("description", result.getDescription());
		assertEquals("image", result.getImage());
		assertEquals("externalImagesLink", result.getExternalImagesLink());
		assertEquals("wikiLink", result.getWikiLink());
	}

	@Test
	public void testDelete() {
		// Arrange
		doNothing().when(plantsRepository).deleteByCommonName("commonName");

		// Act
		plantsController.delete("commonName");

		// Assert
		verify(plantsRepository, times(1)).deleteByCommonName("commonName");
	}
}