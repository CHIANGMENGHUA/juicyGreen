<template>
  <div class="classification">
    <div class="selection">
      <header class="billboard">Classification</header>
      <button class="selected-item">
        {{ selectedOption.label }}
      </button>
      <div class="selection-content">
        <div
          v-for="option in options"
          :key="option.id"
          :class="{ selected: option === selectedOption }"
          @click="selectOption(option)"
          class="selection-items"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          id: 1,
          label: "Cactus",
          image: "http://localhost:8082/classification/catcus.jpeg",
        },
        {
          id: 2,
          label: "Succulents",
          image: "http://localhost:8082/classification/succulents.jpeg",
        },
        {
          id: 3,
          label: "Flower",
          image: "http://localhost:8082/classification/flower.jpeg",
        },
        {
          id: 4,
          label: "Tree",
          image: "http://localhost:8082/classification/tree.jpeg",
        },
        {
          id: 5,
          label: "Herbs",
          image: "http://localhost:8082/classification/herbs.jpeg",
        },
        {
          id: 6,
          label: "Shrubs",
          image: "http://localhost:8082/classification/shrubs.jpeg",
        },
        {
          id: 7,
          label: "Creepers",
          image: "http://localhost:8082/classification/creepers.jpeg",
        },
        {
          id: 8,
          label: "Climbers",
          image: "http://localhost:8082/classification/climbers.jpeg",
        },
        {
          id: 9,
          label: "Bamboo",
          image: "http://localhost:8082/classification/bamboo.jpeg",
        },
        {
          id: 10,
          label: "Ferns",
          image: "http://localhost:8082/classification/ferns.jpeg",
        },
        {
          id: 11,
          label: "Moss",
          image: "http://localhost:8082/classification/moss.jpeg",
        },
        {
          id: 12,
          label: "Mushroom",
          image: "http://localhost:8082/classification/mushroom.jpeg",
        },
      ],
      selectedOption: {
        id: 1,
        label: "Cactus",
        image: "http://localhost:8082/classification/catcus.jpeg",
      },
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      document.querySelector(".selected-item").style.backgroundImage =
        "url(" + option.image + ")";
    },
  },
};
</script>

<style>
.billboard {
  background-color: rgba(60, 60, 0, 0.7);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  color: rgb(255, 255, 255);
  text-align: center;
  margin-bottom: 10px;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  font-size: 25px;
  font-style: italic;
  font-weight: 800;
  line-height: 50px;
}

.selection {
  position: relative;
  display: inline-block;
  font-size: 20px;
  border-radius: 10px;
}

.selected-item {
  background: url("http://localhost:8082/classification/catcus.jpeg");
  background-size: cover;
  color: rgb(255, 255, 255);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  width: 250px;
  height: 170px;
  padding: 16px 24px;
  font-size: 40px;
  font-weight: 600;
  text-shadow: 5px 5px rgb(0, 0, 0);
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

.selection-content {
  margin-top: 20px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0);
  z-index: 1;
  min-width: 250px;
  max-height: 270px;
  overflow-y: auto;
  border-radius: 10px;
}

.selection-items {
  margin: 10px;
  border-radius: 10px;
  background-color: rgba(255, 225, 130, 0.7);
  color: rgb(65, 35, 0);
  padding: 16px 24px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  font-size: 20px;
  text-align: center;
}

.selection-items:hover {
  background-color: rgb(255, 200, 95);
}

.selection-items.selected {
  background-color: rgba(100, 50, 0, 0.5);
}
</style>
