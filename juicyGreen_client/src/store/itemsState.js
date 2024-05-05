import { defineStore } from "pinia";

export const useItemsState = defineStore("itemsState", {
  state: () => ({
    plants: [],
    plantId: 1,
    plantDetail: [],
    category: "Cactus",
    counter: 0,
  }),

  getters: {
    getPlants() {
      return this.plants;
    },
    getFirstPlant() {
      return this.plants[0];
    },
    getPlantDetail() {
      return this.plantDetail;
    },
    getCounter() {
      return this.counter;
    },
  },

  actions: {
    async setPlants() {
      try {
        const response = await fetch(
          `http://localhost:8080/plants/category/${this.category}`
        );
        this.plants = await response.json();
      } catch (err) {
        console.log(err);
      }
    },

    async setPlantDetail() {
      try {
        const response = await fetch(
          `http://localhost:8080/plants/${this.plantId}`
        );
        this.plantDetail.splice(0, 1, await response.json());
      } catch (err) {
        console.log(err);
      }
    },

    setPlantId(id) {
      this.plantId = id;
    },

    setCategory(c) {
      this.category = c;
    },

    increaseCounter() {
      this.counter++;
    },

    resetCounter() {
      this.counter = 0;
    },
  },
});
