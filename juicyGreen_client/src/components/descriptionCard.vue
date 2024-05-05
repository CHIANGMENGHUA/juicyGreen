<template>
  <div class="descriptionCard">
    <div
      v-for="detail in itemsState.getPlantDetail"
      :key="detail.id"
      class="plantName"
    >
      <h1>{{ detail.commonName }}</h1>
    </div>

    <div
      v-for="detail in itemsState.getPlantDetail"
      :key="detail.id"
      class="card"
    >
      <img class="bigImage" :src="detail.image" />
      <div class="description">
        <h4 class="cardH4">
          <b>Botanical Name: {{ detail.botanicalName }}</b>
        </h4>
        <p>
          {{ detail.description }}
        </p>
        <div class="link">
          <a class="wiki" target="_blank" :href="detail.wikiLink">
            <img src="http://localhost:8082/wikipedia.jpeg"
          /></a>
          <a
            class="moreImages"
            target="_blank"
            :href="detail.externalImagesLink"
            ><img src="http://localhost:8082/images.jpeg"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItemsState } from "~/src/store/itemsState";
const itemsState = useItemsState();
</script>

<style>
.descriptionCard {
  max-height: 820px;
  overflow-y: scroll;
}

.plantName {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 170, 70);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  margin-top: 0;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 500px;
  height: 50px;
  font-size: 20px;
}

.card {
  background-color: rgba(255, 255, 255, 0);
  width: 500px;
}

.bigImage {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 10px;
  height: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
}

.description {
  font-size: 20px;
  margin-bottom: 10px;
  padding: 2px 10px;
  border-radius: 10px;
  background-color: rgb(255, 170, 70);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
}

.cardH4 {
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 0;
}

.wiki {
  margin-right: 10px;
}
</style>
