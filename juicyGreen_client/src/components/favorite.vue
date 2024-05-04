<template>
  <div class="favorite">
    <header class="favorite-title">Favorite</header>
  </div>
</template>

<script>
export default {};
</script>

<style>
.favorite {
  margin-top: 330px;
  background-image: url("http://localhost:8082/favorite.jpeg");
  background-size: cover;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.5);
  color: rgb(255, 85, 0);
  text-align: center;
  text-shadow: 5px 5px rgb(250, 190, 0);
  width: 250px;
  height: 250px;
  line-height: 250px;
  border-radius: 10px;
  font-size: 50px;
  font-weight: 1000;
}

.favorite :hover {
  box-shadow: 0px 8px 16px 0px rgb(0, 150, 0);
}
</style>
