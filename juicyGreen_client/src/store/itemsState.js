import { defineStore } from "pinia";

export const useItemsState = defineStore("itemsState", {
  state: () => ({
    plants: [
      {
        id: 1,
        category: "Cactus",
        commonName: "Saguaro Cactus",
        botanicalName: "Carnegiea gigantea",
        description:
          "The saguaro (Carnegiea gigantea) is an iconic symbol of the American Southwest. It is a tall, tree-like cactus that can grow up to 60 feet (18 meters) tall and live for over 200 years. The saguaro has a thick, cylindrical stem with numerous vertically aligned ribs and clusters of sharp spines. In late spring, it produces large, white, waxy flowers that bloom at night and wilt the following day. Its red, oval fruits are an important food source for desert wildlife.",
        image: "http://localhost:8082/items/catcus/SaguaroCactus.jpeg",
        externalImagesLink:
          "https://www.google.com/search?sca_esv=f977441fd745688c&sca_upv=1&sxsrf=ACQVn0-y3Buie_bETbHt8MnBRBKm3boCaw:1714664959276&q=Saguaro+Cactus&uds=AMwkrPt2v0fA1LFFf7PCydq7oNegeHYp_QW6uKfj8iv7K5e-8LrVBrv8CA5wyBCzvRlJJRYEVTpJvuwN5jzyogbqds99LujNJx-KH_CqCjcibsxA7ppwdawmoIU5tgy9chQBC-mHYt0B0vXGgErlhokhL7Ee_Rdu8mjADijDBhsvSkhOuhThGf5WF4draV8qWXKkDOWbqQLMmH5juLQqvGKAGQ0ku3UiWJyYABqEaTvLZzkyHtXdzTJe-X8pzyb7zxsvzdgPgQ4AkkySMEIoIzT0e5QQqIPaIN5tJytUZgp2HenW_ZzCzQPXiUBnIxXzoxAkDJFHabXM&udm=2&prmd=isvnmbtz&sa=X&ved=2ahUKEwjMtLneqO-FAxUom68BHZLmAt4QtKgLegQIDxAB&biw=1920&bih=966&dpr=1",
        wikiLink: "https://en.wikipedia.org/wiki/Saguaro",
      },
    ],
    plantId: 1,
    selectedPlant: [],
    plantDetail: [],
    category: "Cactus",
    counter: 0,
    highlight: "",
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
        } else {
          this.setPlantDetailNull();
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
