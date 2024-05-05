<template>
  <div class="itemsList">
    <div class="box">
      <div
        v-for="item in itemsState.getPlants"
        :key="item.id"
        :class="[
          'list',
          {
            first: item === itemsState.getPlants[0] && itemsState.counter == 0,
          },
          { selected: item === selectedItem },
        ]"
        @click="selectItem(item)"
      >
        <div class="imgBox">
          <img class="listImg" :src="item.image" />
        </div>
        <div class="content">
          <h3 class="commonName">{{ item.commonName }}</h3>
          <p class="BotanicalName">Botanical Name: {{ item.botanicalName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItemsState } from "~/src/store/itemsState";
const itemsState = useItemsState();

itemsState.setPlantDetail();

const items = itemsState.plants;
const selectedItem = ref(items);

const selectItem = (item) => {
  selectedItem.value = item;
  itemsState.increaseCounter();
  itemsState.setPlantId(item.id);
  itemsState.setPlantDetail();
};
</script>

<style>
.itemsList {
  width: 500px;
  max-height: 770px;
  overflow-y: scroll;
}

.commonName {
  font-size: 2em;
  color: rgb(73, 82, 0);
  margin-top: 15px;
  margin-bottom: 0;
}

.BotanicalName {
  font-size: 1.2em;
  color: rgb(65, 35, 0);
  margin-bottom: 0;
}

.list {
  position: relative;
  display: flex;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  background-color: rgb(170, 150, 120, 0.7);
  transition: transform 0.3s ease-in-out;
}

.list:hover {
  transform: translateX(10px);
  background-color: rgb(255, 196, 95);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

.list.first {
  background-color: rgba(100, 50, 0, 0.6);
}

.list.selected {
  background-color: rgba(100, 50, 0, 0.6);
}

.imgBox {
  margin-right: 30px;
}

.listImg {
  width: 93px;
  height: 93px;
  border-radius: 10px;
}
</style>
