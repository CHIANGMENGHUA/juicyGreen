import { defineStore } from "pinia";

export const useItemsState = defineStore("itemsState", {
  state: () => ({
    plants: [],
    category: "Cactus",
  }),

  getters: {
    getPlants() {
      return this.plants;
    },
    getSelectedPlants() {
      return this.plants[0];
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

    setCategory(c) {
      this.category = c;
    },

    async onInit() {
      await this.setPlants();
    },
  },
});
