<template>
  <footer class="footer__container">
    <div class="footer__content mw">
      <p>Trasell &copy; {{ year }} - Todos os direitos reservados</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => {
    return {
      year: Number
    }
  },
  mounted: function() {
    this.year = new Date().getFullYear()
  }
}
</script>

<style src="../assets/style/components/Footer.scss" lang="scss" scoped />