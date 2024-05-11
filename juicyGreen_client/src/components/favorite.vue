<template>
  <div class="favorite" @click="getIntoFavorite">
    <header class="favorite-title">Favorite</header>
  </div>
  <div v-if="itemsState.intoFavorite" class="goBack" @click="getOutFavorite">
    <img class="image-goBack" src="http://localhost:8082/goBack.png" />
    <p class="p-goBack">GO BACK</p>
  </div>
</template>

<script setup>
import { useItemsState } from "~/src/store/itemsState";
const itemsState = useItemsState();

const getIntoFavorite = () => {
  itemsState.intoFavorite = true;
};

const getOutFavorite = () => {
  itemsState.intoFavorite = false;
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

.goBack {
  margin-top: 10px;
  margin-left: 140px;
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
