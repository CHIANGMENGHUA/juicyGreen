<template>
  <div v-if="!itemsState.inFavorite" class="favorite" @click="getInFavorite">
    <header class="favorite-title">Favorite</header>
  </div>
  <div v-if="itemsState.inFavorite" class="inFavorite">
    <header class="favorite-title">Favorite</header>
  </div>
  <div v-if="itemsState.inFavorite" class="home" @click="getOutFavorite">
    <img class="image-goBack" src="http://localhost:8082/home.png" />
  </div>
</template>

<script setup>
import { useItemsState } from "~/src/store/itemsState";
const itemsState = useItemsState();

const getInFavorite = () => {
  itemsState.inFavorite = true;

  // Set favorite plants
  // Check search bar has been use or not
  if (itemsState.searchInput === "") {
    itemsState.setPlants();
  } else {
    itemsState.setPlantsRegex(itemsState.searchInput);
  }

  // Set condition logic if favorite plants exist or not
  if (itemsState.plants.length === 0) {
    // If not, set descriptionCard display nothing
    itemsState.plantDetail = [];
  } else {
    // If has favorite plants, set descriptionCard display first plant
    itemsState.plantId = itemsState.plants[0].id;
    itemsState.setPlantDetail();
  }

  // Set none selected plant
  itemsState.counter = 0;
  itemsState.selectedPlant = [];
};

const getOutFavorite = () => {
  // Reload page
  window.location.reload();
};
</script>

<style>
.favorite {
  background-image: url("http://localhost:8082/favorite.jpeg");
  background-size: cover;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.5);
  color: rgb(255, 85, 0);
  text-align: center;
  text-shadow: 5px 5px rgb(250, 190, 0);
  width: 250px;
  height: 250px;
  line-height: 250px;
  border-radius: 10px;
  font-size: 50px;
  font-weight: 1000;
  cursor: pointer;
}

.favorite:hover {
  box-shadow: 0px 8px 16px 0px rgb(0, 150, 0);
}

.inFavorite {
  background-image: url("http://localhost:8082/favorite.jpeg");
  background-size: cover;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.5);
  color: rgb(255, 85, 0);
  text-align: center;
  text-shadow: 5px 5px rgb(250, 190, 0);
  width: 250px;
  height: 250px;
  line-height: 250px;
  border-radius: 10px;
  font-size: 50px;
  font-weight: 1000;
}

.home {
  margin-top: 10px;
  margin-left: 160px;
  font-size: 20px;
  scale: 0.7;
  cursor: pointer;
}

.image-goBack:hover {
  scale: 1.1;
}

.p-goBack {
  margin-top: 0;
}
</style>
