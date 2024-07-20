<template>
  <div class="classification">
    <div class="selection">
      <header class="billboard">Classification</header>
      <button class="selected-item">
        {{ selectedOption.category }}
      </button>
      <div class="selection-content">
        <div
          v-for="option in options"
          :key="option.id"
          @click="selectOption(option)"
          :class="[
            'selection-items',
            { selected: option.id === selectedOption.id },
          ]"
        >
          {{ option.category }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useItemsState } from "~/src/store/itemsState";
const itemsState = useItemsState();

/* All categories */
const options = [
  {
    id: 0,
    firstPlantId: 1,
    category: "All",
    image: "http://localhost:8082/classification/all.jpeg",
  },
  {
    id: 1,
    firstPlantId: 1,
    category: "Cactus",
    image: "http://localhost:8082/classification/catcus.jpeg",
  },
  {
    id: 2,
    firstPlantId: 11,
    category: "Succulents",
    image: "http://localhost:8082/classification/succulents.jpeg",
  },
  {
    id: 3,
    firstPlantId: 21,
    category: "Flower",
    image: "http://localhost:8082/classification/flower.jpeg",
  },
  {
    id: 4,
    firstPlantId: 31,
    category: "Tree",
    image: "http://localhost:8082/classification/tree.jpeg",
  },
  {
    id: 5,
    firstPlantId: 41,
    category: "Herbs",
    image: "http://localhost:8082/classification/herbs.jpeg",
  },
  {
    id: 6,
    firstPlantId: 51,
    category: "Shrubs",
    image: "http://localhost:8082/classification/shrubs.jpeg",
  },
  {
    id: 7,
    firstPlantId: 61,
    category: "Vine",
    image: "http://localhost:8082/classification/vine.jpeg",
  },
  {
    id: 8,
    firstPlantId: 71,
    category: "Bamboo",
    image: "http://localhost:8082/classification/bamboo.jpeg",
  },
  {
    id: 9,
    firstPlantId: 78,
    category: "Ferns",
    image: "http://localhost:8082/classification/ferns.jpeg",
  },
  {
    id: 10,
    firstPlantId: 88,
    category: "Moss",
    image: "http://localhost:8082/classification/moss.jpeg",
  },
  {
    id: 11,
    firstPlantId: 98,
    category: "Mushroom",
    image: "http://localhost:8082/classification/mushroom.jpeg",
  },
];

/* Default selected category */
const selectedOption = ref(options[0]);

/* Click event */
const selectOption = (option) => {
  // Reset counter for itemsList (set .list.first style for first item)
  itemsState.counter = 0;

  // Set selected category and refresh state
  selectedOption.value = option;
  itemsState.category = option.category;

  // If search bar has been use, execution setPlantsRegex
  if (itemsState.searchInput === "") {
    itemsState.setPlants();
    itemsState.plantId = option.firstPlantId;
    itemsState.setPlantDetail();
  } else {
    itemsState.setPlantsRegex(itemsState.searchInput);
  }

  // Change classification image
  document.querySelector(".selected-item").style.backgroundImage =
    "url(" + option.image + ")";
};
</script>

<style>
.billboard {
  margin-bottom: 10px;
  background-color: rgba(60, 60, 0, 0.7);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  color: rgb(255, 255, 255);
  text-align: center;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  font-size: 25px;
  font-style: italic;
  font-weight: 800;
  line-height: 50px;
}

.selection {
  position: relative;
  display: inline-block;
  font-size: 20px;
  border-radius: 10px;
}

.selected-item {
  background: url("http://localhost:8082/classification/all.jpeg");
  background-size: cover;
  color: rgb(255, 255, 255);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  width: 250px;
  height: 170px;
  padding: 16px 24px;
  font-size: 40px;
  font-weight: 600;
  text-shadow: 5px 5px rgb(0, 0, 0);
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

.selection-content {
  margin-top: 20px;
  position: absolute;
  background: none;
  z-index: 1;
  min-width: 250px;
  max-height: 270px;
  overflow-y: auto;
  scroll-behavior: smooth;
  border-radius: 10px;
}

.selection-items {
  margin: 10px;
  border-radius: 10px;
  background-color: rgba(255, 225, 130, 0.7);
  color: rgb(65, 35, 0);
  padding: 16px 24px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  font-size: 20px;
  text-align: center;
}

.selection-items:hover {
  background-color: rgb(255, 200, 95);
}

.selection-items.selected {
  background-color: rgba(100, 50, 0, 0.6);
}
</style>
