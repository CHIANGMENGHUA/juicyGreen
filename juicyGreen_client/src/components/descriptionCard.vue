<template>
  <div class="descriptionCard">
    <div class="plantName">
      <h1>Barrel Cactus</h1>
    </div>

    <div class="card">
      <img
        class="bigImage"
        src="http://localhost:8082/items/catcus/BarrelCactus.jpeg"
        alt="Avatar"
        style="width: 100%"
      />
      <div class="description">
        <h4 class="cardH4"><b>Botanical Name: Echinocactus</b></h4>
        <p>
          Some species of barrel cactus reach over 1 metre (3.3 ft) in height at
          maturity, and have been known to reach 3 metres (9.8 ft) in some
          regions. The ribs are numerous and pronounced, and the spines are long
          and can range in color from yellow to tan to red, depending on the age
          of the plant and the species. Flowers appear at the top of the plant
          only after many years. The barrel cactus can live to be over 100 years
          old.
        </p>
        <div class="link">
          <a
            class="wiki"
            target="_blank"
            href="https://en.wikipedia.org/wiki/Barrel_cactus"
          >
            <img src="http://localhost:8082/wikipedia.jpeg"
          /></a>
          <a
            class="moreImages"
            target="_blank"
            href="https://www.google.com/search?sca_esv=f9f535e90c1b9ce5&sca_upv=1&sxsrf=ACQVn0-HpCqS7__EzEXO1ZWa2RWkcNk5gQ:1714560057412&q=Barrel+Cactus&uds=AMwkrPuyqEkls4Ckdf3Xn72nW7ALslgxDkho5AvofMKHlm82DsqSI00DDs_FFF6oK3dfiisIcZ8iSSCYGByqlGp8GCccesGM3kH3QX9BV9AxWW84V2ez2JDtMoctb5jKEAP7EniIRX7GEq08ABeWMjWwHWYcrU6yJVGvZqKvvZNBZ1mi2LvmMiQ83MQzXxhs-qwZ-57dVmNP1-yp9s-eIQM4Dl7-emQRqaqGgQiMWzhx90Pk3WrVeqHIAiNN3SsPDOm0P7ntgc8dXFH1UtSQEXjI6acfHi5o3EzQPU9SqjJ_KwoBhUo0P2uQ4SaOPdi9eG-XLDoJlWG6&udm=2&prmd=isvnmbtz&sa=X&ved=2ahUKEwjZ16v5oeyFAxXOma8BHTmOAMgQtKgLegQIExAB&biw=1920&bih=966&dpr=1"
            ><img src="http://localhost:8082/images.jpeg"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.plantName {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 170, 70);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  margin-top: 0;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 500px;
  height: 50px;
  font-size: 20px;
}

.card {
  background-color: rgba(255, 255, 255, 0);
  width: 500px;
}

.bigImage {
  margin-bottom: 10px;
  border-radius: 10px;
  height: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
}

.description {
  height: 360px;
  font-size: 20px;
  margin-bottom: 10px;
  padding: 2px 10px;
  border-radius: 10px;
  background-color: rgb(255, 170, 70);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
}

.cardH4 {
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 0;
}

.wiki {
  margin-right: 10px;
}
</style>
