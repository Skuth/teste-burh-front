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
  }
}
</script>

<style src="./assets/style/global.scss" lang="scss" />
