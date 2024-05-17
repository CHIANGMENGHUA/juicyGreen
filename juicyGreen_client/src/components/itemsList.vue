<template>
  <div class="itemsList">
    <div v-for="item in itemsState.plants" class="list" :key="item.id">
      <div
        :class="[
          'list-content',
          {
            /* If counter == 0, set first item style (initial view), or remove it */
            first: item === itemsState.plants[0] && itemsState.counter === 0,
          },
          {
            /* Set selected item style */
            selected: item === itemsState.selectedPlant[0],
          },
        ]"
        @click="selectItem(item)"
      >
        <div class="imgBox">
          <img class="listImg" :src="item.image" />
        </div>
        <div class="list-description">
          <h3 class="commonName" v-html="highlightText(item.commonName)"></h3>
          <p class="BotanicalName">Botanical Name: {{ item.botanicalName }}</p>
        </div>
      </div>

      <div class="favButton">
        <div
          v-if="!itemsState.checkFavorite(item)"
          class="addToFavorite"
          :key="favoriteKey"
          @click="handleAddToFavorite(item)"
        >
          <img src="http://localhost:8082/list_favorite.png" />
        </div>

        <div
          v-if="itemsState.checkFavorite(item)"
          class="removeFromFavorite"
          :key="favoriteKey"
          @click="handleRemoveFromFavorite(item)"
        >
          <img src="http://localhost:8082/list_trashCan.png" />
        </div>
      </div>
    </div>

    <div
      v-if="
        itemsState.plants.length == 0 &&
        itemsState.inFavorite &&
        itemsState.searchInput === ''
      "
      class="nothingFound"
    >
      <img src="http://localhost:8082/nothingFound.png" />
    </div>

    <div
      v-if="!itemsState.hasResult && itemsState.searchInput !== ''"
      class="noResult"
    >
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

/* Highlighting plants name with search input keywords */
const highlightText = (text) => {
  if (itemsState.searchInput !== "") {
    const searchInput = itemsState.searchInput;
    const regex = new RegExp(`^${searchInput}`, "gi");
    return text.replace(regex, "<mark>$&</mark>");
  }
  return text;
};

/* Handle click event */
const selectItem = (item) => {
  // Set selected plant
  itemsState.selectedPlant.splice(0, 1, item);
  // State refresh
  itemsState.counter++;
  itemsState.plantId = item.id;
  itemsState.setPlantDetail();
};

/* Handle click event */
let favoriteKey = ref(0);

const handleAddToFavorite = (item) => {
  itemsState.addToFavorite(item);
  // refresh addToFavorite button
  favoriteKey.value++;
  // sync with descriptionCard
  itemsState.favoriteKeyState++;
};

const handleRemoveFromFavorite = (item) => {
  itemsState.removeFromFavorite(item);
  // refresh removeFromFavorite button
  favoriteKey.value++;
  // sync with descriptionCard
  itemsState.favoriteKeyState++;
};

/* ScrollToTop button */
// Don't show scrollToTop button when initial
const showScrollToTopButton = ref(false);
const itemsList = ref(null);

// Execution scroll to top
const scrollToTop = () => {
  const itemsList = document.querySelector(".itemsList");
  itemsList.scrollTo({ top: 0, behavior: "smooth" });
};

// If start scroll down, show scrollToTop button
const handleScroll = () => {
  showScrollToTopButton.value = itemsList.value.scrollTop > 0;
};

onMounted(() => {
  // Set plants by category if search bar not using
  if (itemsState.searchInput === "") {
    itemsState.setPlants();
  }

  /* Add eventListener for scrollToTop button */
  itemsList.value = document.querySelector(".itemsList");
  itemsList.value.addEventListener("scroll", handleScroll);

  /* If state changed scroll to top */
  watch(
    () => itemsState.category,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        scrollToTop();
      }
    }
  );
  watch(
    () => itemsState.inFavorite,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        scrollToTop();
      }
    }
  );

  /* If searchInput changed then reset counter */
  watch(
    () => itemsState.searchInput,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        itemsState.counter = 0;
      }
    }
  );

  /* If favoriteKeyState changed refresh favorite button */
  watch(
    () => itemsState.favoriteKeyState,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        favoriteKey.value++;
      }
    }
  );
});
</script>

<style>
.itemsList {
  width: 500px;
  margin-top: 10px;
  max-height: 740px;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.list {
  display: flex;
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

.list-content {
  width: 400px;
  position: relative;
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  background-color: rgb(170, 150, 120, 0.7);
  transition: transform 0.3s ease-in-out;
}

.list-content:hover {
  transform: translateX(5px);
  background-color: rgb(255, 196, 95);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

/* If counter == 0, set first item style (initial view), or remove it */
.list-content.first {
  background-color: rgba(100, 50, 0, 0.6);
}

/* Set selected item style */
.list-content.selected {
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

.favButton {
  position: relative;
  top: 40px;
  right: 10px;
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
