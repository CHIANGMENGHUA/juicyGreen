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
    hasResult: true,
    inFavorite: false,
    favoriteKeyState: 0,
  }),

  actions: {
    /* Fetch data from backend and refresh plants */
    async setPlants() {
      let response = [];

      try {
        // make condition logic if inFavorite or not
        if (!this.inFavorite) {
          // GET request from DB by category
          response = await fetch(
            `http://localhost:8080/plants/category/${this.category}`
          );
          // Refresh palnts list state
          this.plants = await response.json();
        } else {
          // GET request from localStorage by category
          const favoritePlants = localStorage.getItem("favoritePlants");
          response = favoritePlants ? JSON.parse(favoritePlants) : [];
          // Refresh palnts list state
          this.plants = response;
        }
      } catch (err) {
        console.log(err);
      }
    },

    /* This method for search bar use regex */
    async setPlantsRegex(searchInput) {
      let response = [];

      try {
        // Create a case-insensitive regular expression
        const regex = new RegExp(`^${searchInput}`, "i");

        // make condition logic if inFavorite or not
        if (!this.inFavorite) {
          // GET request from DB by category
          response = await fetch(
            `http://localhost:8080/plants/category/${this.category}`
          );
          // Refresh plants list state with filtered results
          this.plants = (await response.json()).filter((plant) =>
            regex.test(plant.commonName)
          );
        } else {
          // GET request from localStorage by category
          const favoritePlants = localStorage.getItem("favoritePlants");
          response = favoritePlants ? JSON.parse(favoritePlants) : [];
          // Refresh plants list state with filtered results
          this.plants = response.filter((plant) =>
            regex.test(plant.commonName)
          );
        }

        // Refresh state for plant id and plant detail if plants existing
        if (this.plants.length !== 0) {
          this.plantId = this.plants[0].id;
          this.setPlantDetail();
          this.hasResult = true;
        } else {
          // or display no result
          this.plantDetail = [];
          this.hasResult = false;
        }

        // Set highlight character for item list
        this.highlight = searchInput;
        // Reset counter for itemsList (set .list.first style for first item)
        this.counter = 0;
      } catch (err) {
        console.log(err);
      }
    },

    /* Fetch data from backend and refresh plant detail */
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

    /* Check selected plant is in favorite or not, return true or false */
    checkFavorite(plant) {
      try {
        const itemToCheck = JSON.stringify(plant);
        const storedItems =
          JSON.parse(localStorage.getItem("favoritePlants")) || [];
        return storedItems.some((item) => JSON.stringify(item) === itemToCheck);
      } catch (err) {
        console.log(err);
        return false;
      }
    },

    /* Add favorite plant in localStorage */
    addToFavorite(plant) {
      try {
        let storedItems = localStorage.getItem("favoritePlants") || "[]";
        const parsedItems = JSON.parse(storedItems);
        parsedItems.push(plant);
        localStorage.setItem("favoritePlants", JSON.stringify(parsedItems));
      } catch (err) {
        console.log(err);
      }
    },

    /* remove favorite plant in localStorage */
    removeFromFavorite(plant) {
      try {
        const itemToRemove = JSON.stringify(plant);
        const storedItems = localStorage.getItem("favoritePlants");
        if (!storedItems) {
          console.log("No favorite items to remove.");
          return;
        }
        const parsedItems = JSON.parse(storedItems);
        const updatedItems = parsedItems.filter(
          (item) => JSON.stringify(item) !== itemToRemove
        );
        localStorage.setItem("favoritePlants", JSON.stringify(updatedItems));

        // set condition logic if in favorite then refresh state
        if (this.inFavorite) {
          this.counter++;
          this.setPlants();
          this.plantDetail = [];
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
