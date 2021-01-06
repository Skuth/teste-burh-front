<template>
  <header class="header__container animation__fadeIn">
    <div class="header__content mw">
      <div class="header__left">
        <h2>Não usa mais?</h2>
        <p>Que tal vender rapidinho e com poucos cliques?</p>
        <p>Anuncia ai, é grátis.</p>
        
        <Button to="anunciar" text="Criar anuncio" round />
      </div>
      <div class="header__right">
        <div class="header__image__container">
          <img src="../assets/images/header-image.svg" alt="Header image">
        </div>
      </div>
    </div>
  </header>
  <section v-if="products" class="products__container animation__fadeIn">
    <div class="products__content mw">
      <ItemBox v-for="(product, index) in products" v-bind:key="index" v-bind:product="product" />
    </div>
    <div class="products__see__more mw">
      <router-link to="produtos">Ver mais produtos</router-link>
    </div>
  </section>
</template>

<script>
import Button from "@/components/Button"
import ItemBox from "@/components/ItemBox"

import axios from "axios"

export default {
  name: 'Home',
  components: {
    Button,
    ItemBox
  },
  data() {
    return {
      products: null
    }
  },
  mounted() {
    axios.get(`https://crudcrud.com/api/${process.env.VUE_APP_CRUDCRUD_ENDPOINT}/products`)
    .then(res => res.data)
    .then(res => this.products = res.slice(0,8))
    .catch(err => console.log(err))
  }
}
</script>

<style src="../assets/style/pages/Home.scss" lang="scss" scoped />