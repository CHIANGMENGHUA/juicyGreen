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
        if (this.hasResult) {
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
        // Get plants from favorite
        let storedItems = localStorage.getItem("favoritePlants") || "[]";
        const parsedItems = JSON.parse(storedItems);

        // Add plant in favorite and update localStorage
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

        // If no any plants in favorite
        if (!storedItems) {
          console.log("No favorite items to remove.");
          return;
        }

        // Remove plant from favorite
        const parsedItems = JSON.parse(storedItems);
        const updatedItems = parsedItems.filter(
          (item) => JSON.stringify(item) !== itemToRemove
        );

        // Update localStorage
        localStorage.setItem("favoritePlants", JSON.stringify(updatedItems));

        // Set condition logic if in favorite then refresh state
        if (this.inFavorite) {
          // Add counter for itemsList (remove .list.first style for first item)
          this.counter++;
          // Set condition logic if search bar in used or not
          if (this.searchInput === "") {
            this.setPlants();
          } else {
            this.setPlantsRegex(this.searchInput);
          }

          // Do not display descriptionCard
          this.plantDetail = [];
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
