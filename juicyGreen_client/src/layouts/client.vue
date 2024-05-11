<template>
  <body class="clientBody">
    <div class="container1">
      <webSiteLogo class="webSiteLogo" />
      <div class="container2">
        <div class="container3">
          <classification
            v-if="!itemsState.intoFavorite"
            class="classification"
          />
          <favorite class="favorite" />
        </div>
        <div class="container4">
          <searchBar class="searchBar" />
          <itemsList class="itemsList" />
        </div>
        <div class="container5">
          <descriptionCard />
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import { useItemsState } from "~/src/store/itemsState";
const itemsState = useItemsState();

import classification from "../components/classification.vue";
import searchBar from "../components/searchBar.vue";
import webSiteLogo from "../components/webSiteLogo.vue";
import itemsList from "../components/itemsList.vue";
import descriptionCard from "../components/descriptionCard.vue";
import favorite from "../components/favorite.vue";
</script>

<style>
.container1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.container2 {
  display: flex;
  margin-top: 10px;
}

.classification {
  margin-bottom: 340px;
}

.container4 {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
