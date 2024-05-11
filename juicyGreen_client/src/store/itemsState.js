import { defineStore } from "pinia";

export const useItemsState = defineStore("itemsState", {
  state: () => ({
    plants: [],
    plantId: 1,
    selectedPlant: [],
    plantDetail: [],
    category: "Cactus",
    counter: 0,
    highlight: "",
    noResult: false,
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
        // GET request from DB by category
        const response = await fetch(
          `http://localhost:8080/plants/category/${this.category}`
        );
        // Refresh palnts list state
        this.plants = await response.json();
      } catch (err) {
        console.log(err);
      }
    },

    async setPlantsRegex(searchInput) {
      try {
        // Create a case-insensitive regular expression
        const regex = new RegExp(`^${searchInput}`, "i");

        // GET request from DB by category
        const response = await fetch(
          `http://localhost:8080/plants/category/${this.category}`
        );

        // Refresh plants list state with filtered results
        this.plants = (await response.json()).filter((plant) =>
          regex.test(plant.commonName)
        );

        // refresh state for plant id and plant detail if plants existing
        if (this.plants.length !== 0) {
          const firstPlant = this.plants[0];
          this.setPlantId(firstPlant.id);
          this.setPlantDetail();
          this.noResult = false;
        } else {
          this.setPlantDetailNull();
          this.noResult = true;
        }

        // Set highlight character for item list
        this.highlight = searchInput;

        // Reset counter for itemsList (set .list.first style for first item)
        this.resetCounter();
      } catch (err) {
        console.log(err);
      }
    },

    async setPlantDetail() {
      try {
        // GET request from DB by ID
        const response = await fetch(
          `http://localhost:8080/plants/${this.plantId}`
        );
        // Refresh palnt detail state
        this.plantDetail.splice(0, 1, await response.json());
      } catch (err) {
        console.log(err);
      }
    },

    setPlantDetailNull() {
      this.plantDetail = [];
    },

    setPlantId(id) {
      this.plantId = id;
    },

    setCategory(c) {
      this.category = c;
    },

    /* Counter for itemsList (if counter == 0, set .list.first style, or remove it) */
    increaseCounter() {
      this.counter++;
    },
    resetCounter() {
      this.counter = 0;
    },

    setHighlight(h) {
      this.highlight = "";
    },
  },
});
