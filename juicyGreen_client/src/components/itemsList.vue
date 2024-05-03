<template>
  <div class="itemsList">
    <div class="box">
      <div
        class="list"
        v-for="item in items"
        :key="item.id"
        :class="{ selected: item === selectedItem }"
        @click="selectItem(item)"
      >
        <div class="imgBox">
          <img class="listImg" :src="item.imageUrl" />
        </div>
        <div class="content">
          <h3 class="commonName">{{ item.commonName }}</h3>
          <p class="BotanicalName">{{ item.botanicalName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          commonName: "Barrel Cactus",
          imageUrl: "http://localhost:8082/items/catcus/BarrelCactus.jpeg",
          botanicalName: "Botanical Name: Ferocactus spp.",
        },
        {
          id: 2,
          commonName: "Cephalocereus",
          imageUrl: "http://localhost:8082/items/catcus/Cephalocereus.jpeg",
          botanicalName: "Botanical Name: Cephalocereus spp.",
        },
        {
          id: 3,
          commonName: "Cholla Cactus",
          imageUrl: "http://localhost:8082/items/catcus/ChollaCactus.jpeg",
          botanicalName: "Botanical Name: Cylindropuntia spp.",
        },
        {
          id: 4,
          commonName: "Barrel Cactus",
          imageUrl: "http://localhost:8082/items/catcus/BarrelCactus.jpeg",
          botanicalName: "Botanical Name: Ferocactus spp.",
        },
        {
          id: 5,
          commonName: "Cephalocereus",
          imageUrl: "http://localhost:8082/items/catcus/Cephalocereus.jpeg",
          botanicalName: "Botanical Name: Cephalocereus spp.",
        },
        {
          id: 6,
          commonName: "Cholla Cactus",
          imageUrl: "http://localhost:8082/items/catcus/ChollaCactus.jpeg",
          botanicalName: "Botanical Name: Cylindropuntia spp.",
        },
      ],
      selectedItem: null,
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
  },
};
</script>

<style>
.itemsList {
  width: 500px;
}

.commonName {
  font-size: 2em;
  color: rgb(73, 82, 0);
  margin-top: 10px;
  margin-bottom: 0;
}

.BotanicalName {
  font-size: 1.2em;
  color: rgb(65, 35, 0);
  margin-bottom: 0;
}

.list {
  position: relative;
  display: flex;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  background-color: rgb(173, 149, 117, 0.7);
  transition: transform 0.3s ease-in-out;
}

.list:hover {
  transform: translateX(10px);
  background-color: rgb(255, 196, 95);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

.list.selected {
  background-color: rgba(100, 50, 0, 0.6);
}

.imgBox {
  margin-right: 30px;
}

.listImg {
  width: 93px;
  height: 93px;
  border-radius: 10px;
}
</style>
