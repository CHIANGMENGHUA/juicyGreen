<template>
  <body class="AppBody">
    <div>
      <clientView />
    </div>
  </body>
</template>

<script>
import clientView from "@/src/layouts/client.vue";

export default {
  components: {
    clientView,
  },
};
</script>

<style>
body {
  all: unset;
}

.AppBody {
  padding: 0;
  margin: 0;
  background: url("http://localhost:8082/forest.png");
  background-size: cover;
}
</style>
