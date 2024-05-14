<template>
  <div class="descriptionCard">
    <div class="descriptionCard-content">
      <div
        v-for="detail in itemsState.plantDetail"
        :key="detail.id"
        class="plantName"
      >
        <h1>{{ detail.commonName }}</h1>
      </div>

      <div
        v-for="detail in itemsState.plantDetail"
        :key="detail.id"
        class="card"
      >
        <img class="bigImage" :src="detail.image" />
        <div class="description">
          <h4 class="h4-card">
            <b>Botanical Name: {{ detail.botanicalName }}</b>
          </h4>
          <p>
            {{ detail.description }}
          </p>
          <div class="link">
            <a class="wiki" target="_blank" :href="detail.wikiLink">
              <img class="wiwkiLogo" src="http://localhost:8082/wikipedia.jpeg"
            /></a>

            <a
              class="moreImages"
              target="_blank"
              :href="detail.externalImagesLink"
              ><img
                class="moreImagesLogo"
                src="http://localhost:8082/images.jpeg"
            /></a>

            <div
              v-if="!itemsState.checkFavorite(itemsState.plantDetail[0])"
              class="addToFavorite"
              :key="favoriteKey"
              @click="handleAddToFavorite"
            >
              <img src="http://localhost:8082/favorite.png" />
            </div>

            <div
              v-if="itemsState.checkFavorite(itemsState.plantDetail[0])"
              class="removeFromFavorite"
              :key="favoriteKey"
              @click="handleRemoveFromFavorite"
            >
              <img src="http://localhost:8082/trashCan.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItemsState } from "~/src/store/itemsState";
const itemsState = useItemsState();

/* Handle click event */
let favoriteKey = ref(0);
const handleAddToFavorite = () => {
  itemsState.addToFavorite(itemsState.plantDetail[0]);
  // refresh addToFavorite button
  favoriteKey.value++;
  itemsState.favoriteKeyState++;
};
const handleRemoveFromFavorite = () => {
  itemsState.removeFromFavorite(itemsState.plantDetail[0]);
  // refresh removeFromFavorite button
  favoriteKey.value++;
  itemsState.favoriteKeyState++;
};

/* Execution scroll to top */
const scrollToTop = () => {
  const itemsList = document.querySelector(".descriptionCard");
  itemsList.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  // Watch for changes in itemsState and scroll to top
  watch(
    () => itemsState.plantId,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        scrollToTop();
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
.descriptionCard {
  max-height: 800px;
  width: 635px;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  top: 0;
}

.descriptionCard-content {
  margin: 0px 10px 10px 10px;
}

.plantName {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 170, 70);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  border-radius: 10px;
  width: 600px;
  height: 50px;
  font-size: 20px;
}

.card {
  background-color: rgba(255, 255, 255, 0);

  width: 600px;
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
  padding: 5px 20px;
  border-radius: 10px;
  background-color: rgb(255, 170, 70);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
}

.h4-card {
  font-size: 25px;
  margin-top: 20px;
}

.link {
  display: flex;
  margin-top: 50px;
  margin-bottom: 10px;
}

.wiki {
  margin-left: 10px;
  margin-right: 20px;
}

.wiwkiLogo:hover {
  scale: 1.1;
}

.moreImagesLogo:hover {
  scale: 1.1;
}

.addToFavorite {
  margin-left: 25px;
  cursor: pointer;
}

.addToFavorite:hover {
  scale: 1.1;
}

.removeFromFavorite {
  margin-left: 25px;
  cursor: pointer;
}

.removeFromFavorite:hover {
  scale: 1.1;
}
</style>
