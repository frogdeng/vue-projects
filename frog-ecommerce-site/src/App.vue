<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  
  created(){
    console.log(process.env.VUE_APP_API)
  } 
}

</script>

<style lang="scss">
  @import "./assets/all";


</style>
