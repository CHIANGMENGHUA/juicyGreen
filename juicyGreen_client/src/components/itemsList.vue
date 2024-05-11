<template>
  <div class="itemsList">
    <div
      v-for="item in itemsState.getPlants"
      :key="item.id"
      :class="[
        'list',
        {
          /* If counter == 0, set first item style (initial view), or remove it */
          first: item === itemsState.getPlants[0] && itemsState.counter == 0,
        },
        {
          /* Set selected item style */
          selected: item === itemsState.selectedItem,
        },
      ]"
      @click="selectItem(item)"
    >
      <div class="imgBox">
        <img class="listImg" :src="item.image" />
      </div>
      <div class="content">
        <h3 class="commonName" v-html="highlightText(item.commonName)"></h3>
        <p class="BotanicalName">Botanical Name: {{ item.botanicalName }}</p>
      </div>
    </div>

    <div v-if="!itemsState.hasResult" class="noResult">
      <img src="http://localhost:8082/noResult.png" />
    </div>

    <div
      v-if="showScrollToTopButton"
      class="scroll-to-top"
      @click="scrollToTop"
    >
      <img src="http://localhost:8082/scrollToTop.png" />
    </div>
  </div>
</template>

<script setup>
import { useItemsState } from "~/src/store/itemsState";
import { onMounted, ref } from "vue";
const itemsState = useItemsState();

/* Highlighting plants name with search input key words */
const highlightText = (text) => {
  if (itemsState.highlight !== "") {
    const searchInput = itemsState.highlight;
    const regex = new RegExp(`^${searchInput}`, "gi");
    return text.replace(regex, "<mark>$&</mark>");
  }
  return text;
};

/* initialize description card */
itemsState.setPlantDetail();

/* Handle click event */
const selectItem = (item) => {
  // Set selected plant
  itemsState.selectedItem = item;

  // Pinia state handler
  itemsState.increaseCounter();
  itemsState.setPlantId(item.id);
  itemsState.setPlantDetail();
};

/* scrollToTop button */
// don't show scrollToTop button when initial
const showScrollToTopButton = ref(false);

const itemsList = ref(null);

// execution scroll to top
const scrollToTop = () => {
  const itemsList = document.querySelector(".itemsList");
  itemsList.scrollTo({ top: 0, behavior: "smooth" });
};

// if start scroll down, show scrollToTop button
const handleScroll = () => {
  showScrollToTopButton.value = itemsList.value.scrollTop > 0;
};

onMounted(() => {
  // add eventListener for scrollToTop button
  itemsList.value = document.querySelector(".itemsList");
  itemsList.value.addEventListener("scroll", handleScroll);

  // Watch for changes in itemsState and scroll to top
  watch(
    () => itemsState.plants[0],
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        scrollToTop();
      }
    }
  );
});
</script>

<style>
.itemsList {
  width: 500px;
  margin-top: 10px;
  max-height: 770px;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.commonName {
  font-size: 30px;
  color: rgb(73, 82, 0);
  margin-top: 15px;
  margin-bottom: 0;
}

.BotanicalName {
  font-size: 18px;
  color: rgb(65, 35, 0);
  margin-top: 12px;
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

/* If counter == 0, set first item style (initial view), or remove it */
.list.first {
  background-color: rgba(100, 50, 0, 0.6);
}

/* Set selected item style */
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

.noResult {
  margin-top: 50px;
  width: 100px;
}

.scroll-to-top {
  position: sticky;
  bottom: 0px;
  margin-left: 410px;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
}

.scroll-to-top:hover {
  scale: 1.2;
}
</style>
