import { defineStore } from "pinia";

export const useItemsState = defineStore("itemsState", {
  state: () => ({
    plants: [],
    plantId: 1,
    selectedPlant: [],
    plantDetail: [],
    category: "All",
    counter: 0,
    searchInput: "",
    hasResult: true,
    inFavorite: false,
    favoriteKeyState: 0,
    ifRemoveFromFavorite: false,
  }),

  actions: {
    /* Fetch data from backend and refresh plants */
    async setPlants() {
      let response = [];

      try {
        // Make condition logic if inFavorite or not
        if (!this.inFavorite) {
          // If selected all categories, get all plants
          if (this.category === "All") {
            // Get all plants from DB
            response = await fetch("http://localhost:8080/plants/");
          } else {
            // GET request from DB by category
            response = await fetch(
              `http://localhost:8080/plants/category/${this.category}`
            );
          }

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

        // Make condition logic if inFavorite or not
        if (!this.inFavorite) {
          // If selected all categories, get all plants
          if (this.category === "All") {
            // GET request from DB
            response = await fetch("http://localhost:8080/plants/");
          } else {
            // GET request from DB by category
            response = await fetch(
              `http://localhost:8080/plants/category/${this.category}`
            );
          }

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
          this.hasResult = true;
        } else {
          // or display no result
          this.hasResult = false;
        }

        // If has search result or not
        if (this.hasResult && !this.ifRemoveFromFavorite) {
          this.plantId = this.plants[0].id;
          this.setPlantDetail();
        } else {
          this.plantDetail = [];
        }

        // If in favorite, reset counter
        if (!this.inFavorite) {
          // Reset counter for itemsList (set .list.first style for first item)
          this.counter = 0;
        }

        // Set searchInput character for item list
        this.searchInput = searchInput;
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

    /* Check selected plant is in localStorage or not, return true or false */
    checkFavorite(plant) {
      try {
        const itemToCheck = JSON.stringify(plant);

        // Get plant from favorite
        const storedItems =
          JSON.parse(localStorage.getItem("favoritePlants")) || [];

        // Check
        return storedItems.some((item) => JSON.stringify(item) === itemToCheck);
      } catch (err) {
        console.log(err);
        return false;
      }
    },

    /* Add favorite plant in localStorage */
    addToFavorite(plant) {
      try {
        // Cache favorite plants
        let storedItems = localStorage.getItem("favoritePlants");
        let parsedItems = storedItems ? JSON.parse(storedItems) : [];

        // Check for duplicates
        if (
          !parsedItems.some(
            (item) => JSON.stringify(item) === JSON.stringify(plant)
          )
        ) {
          parsedItems.push(plant);
          localStorage.setItem("favoritePlants", JSON.stringify(parsedItems));
        }
      } catch (err) {
        console.error("Error adding to favorites:", err);
      }
    },

    /* Remove favorite plant in localStorage */
    removeFromFavorite(plant) {
      try {
        const itemToRemove = JSON.stringify(plant);
        const storedItems = localStorage.getItem("favoritePlants");

        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          const updatedItems = parsedItems.filter(
            (item) => JSON.stringify(item) !== itemToRemove
          );

          localStorage.setItem("favoritePlants", JSON.stringify(updatedItems));

          // Update state if needed
          if (this.inFavorite) {
            this.counter++;
            this.searchInput === ""
              ? this.setPlants()
              : this.setPlantsRegex(this.searchInput);
            this.plantDetail = [];
          }
        }
      } catch (err) {
        console.error("Error removing from favorites:", err);
      }
    },
  },
});
