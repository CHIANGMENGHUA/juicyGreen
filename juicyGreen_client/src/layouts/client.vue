<template>
  <body class="clientBody">
    <div class="container1">
      <webSiteLogo class="webSiteLogo" />
      <div class="container2">
        <div class="container3">
          <classification class="classification" />
          <favorite class="favorite" />
        </div>
        <div class="container4">
          <searchBar class="searchBar" />
          <itemsList class="itemsList" />
        </div>
        <div class="container5">
          <descriptionCard />
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import classification from "../components/classification.vue";
import searchBar from "../components/searchBar.vue";
import webSiteLogo from "../components/webSiteLogo.vue";
import itemsList from "../components/itemsList.vue";
import descriptionCard from "../components/descriptionCard.vue";
import favorite from "../components/favorite.vue";

export default {
  components: {
    classification,
    searchBar,
    webSiteLogo,
    itemsList,
    descriptionCard,
    favorite,
  },
};
</script>

<style>
.container1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.container2 {
  display: flex;
  margin-top: 10px;
}

.container4 {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
