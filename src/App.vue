<template>
  <div id="app" class="fx-row-center">
    <div class="app-contain">
      <router-view />
    </div>
  </div>
</template>

<script >
export default {
  name: 'app',
}
</script>

<style scoped src="./assets/main.css">
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
