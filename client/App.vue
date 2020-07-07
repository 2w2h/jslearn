<template>
  <div id="app">
    <div id="nav">
      <template v-for="(route, index) in $router.options.routes">
        <router-link :to="route.path" :key="route.name">
          {{ route.meta.title }}
        </router-link>
        <template v-if="index+1 < $router.options.routes.length">|</template>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    created() {
    },
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 15px;
  background-color: burlywood;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
