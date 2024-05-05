<template>
  <div class="searchBar">
    <div class="search">
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
      </button>
      <input
        type="text"
        class="searchTerm"
        placeholder="Find your favorite plants!"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.searchBar {
  background: rgb(240, 240, 240);
  font-family: "Open Sans", sans-serif;
}

.search {
  width: 500px;
  position: relative;
  display: flex;
}

.searchTerm {
  font-size: 20px;
  width: 100%;
  border: 3px solid rgb(180, 140, 100);
  border-left: none;
  padding: 5px;
  height: 34px;
  border-radius: 0 10px 10px 0;
  outline: none;
  color: rgb(90, 60, 30);
}

.searchTerm:focus {
  background-color: rgb(230, 210, 200);
}

.searchButton {
  width: 60px;
  height: 50px;
  border: 1px solid rgb(180, 140, 100);
  background: rgb(180, 140, 100);
  background-image: url("http://localhost:8082/search.png");
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  color: rgb(255, 255, 255);
  border-radius: 10px 0 0 10px;
  font-size: 20px;
}
</style>
