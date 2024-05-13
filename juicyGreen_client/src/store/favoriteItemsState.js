import { defineStore } from "pinia";

export const useFavoriteItemsState = defineStore("itemsState", {
  state: () => ({
    favoritePlants: [],
    favoritePlantId: 1,
    favoriteSelectedPlant: [],
    favoritePlantDetail: [],
    favoriteHighlight: "",
    favoriteHasResult: true,
    favoriteCounter: 0,
  }),

  getters: {
    getFavoritePlants() {
      return this.favoritePlants;
    },
    getFavoriteFirstPlant() {
      return this.favoritePlants[0];
    },
    getFavoritePlantDetail() {
      return this.favoritePlantDetail;
    },
    getFavoriteCounter() {
      return this.favoriteCounter;
    },
  },

  actions: {
    setFavoritePlants() {
      try {
        const favPlants = JSON.parse(localStorage.getItem("favoritePlants"));
        this.favoritePlants = favPlants;
      } catch (err) {
        console.log(err);
      }
    },

    setFavoritePlantsRegex(searchInput) {
      try {
        // Create a case-insensitive regular expression
        const regex = new RegExp(`^${searchInput}`, "i");
        // GET request from localStorage by category
        const response = JSON.parse(localStorage.getItem("favoritePlants"));
        // Refresh plants list state with filtered results
        this.plants = response
          .json()
          .filter((plant) => regex.test(plant.commonName));
        // refresh state for plant id and plant detail if plants existing
        if (this.favoritePlants.length !== 0) {
          const firstPlant = this.plants[0];
          this.setFavoritePlantId(firstPlant.id);
          this.setFavoritePlantDetail();
          this.favoriteHasResult = true;
        } else {
          this.setFavoritePlantDetailNull();
          this.favoriteHasResult = false;
        }
        // Set highlight character for item list
        this.favoriteHighlight = searchInput;
        // Reset counter for itemsList (set .list.first style for first item)
        this.resetCounter();
      } catch (err) {
        console.log(err);
      }
    },

    setFavoritePlantDetail() {
      let response = [];
      try {
        // GET request from localStorage by ID
        for (let i of this.favoritePlants) {
          if (i.id === this.favoritePlantId) {
            response = i;
          }
        }
        // Refresh plant detail state
        this.favoritePlantDetail.splice(0, 1, response);
      } catch (err) {
        console.log(err);
      }
    },

    setFavoritePlantDetailNull() {
      this.favoritePlantDetail = [];
    },

    setFavoritePlantId(id) {
      this.favoritePlantId = id;
    },

    /* Counter for itemsList (if counter == 0, set .list.first style, or remove it) */
    favoriteIncreaseCounter() {
      this.favoriteCounter++;
    },
    favoriteResetCounter() {
      this.favoriteCounter = 0;
    },

    setFavoriteHighlight(h) {
      this.favoriteHighlight = "";
    },
  },
});
