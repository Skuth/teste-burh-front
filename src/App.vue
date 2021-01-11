<template>
  <Navbar />
  <router-view></router-view>
  <Footer />
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  watch: {
    $route() {
      const title = document.querySelector("title")
      title.innerHTML = " Trasell - Um jeito fácil de vender online"
    }
  }
}
</script>

<style src="./assets/style/global.scss" lang="scss" />
