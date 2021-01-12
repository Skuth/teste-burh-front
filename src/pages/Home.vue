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
  <section v-if="is_load && products" class="products__box__container animation__fadeIn">
    <div class="products__box__content mw">
      <div class="products__box__items">
        <ItemBox v-for="(product, index) in products" v-bind:key="index" v-bind:product="product" />
      </div>
    </div>
    <div class="products__see__more mw">
      <router-link to="produtos">Ver mais produtos <font-awesome-icon icon="arrow-right" /></router-link>
    </div>
  </section>
  <PreLoad v-else-if="!is_load" />
  <section v-else-if="is_load" class="not__found__container animation__fadeIn">
    <div class="not__found__content mw mh">
      <p class="title">Opaa</p>
      <span>Não encontrei nada aqui :c</span>
      <span>Que tal ter seu produto aqui??</span>
      <Button to="/anunciar" text="Anuncia ai" round />
    </div>
  </section>
</template>

<script>
import api from "@/services/api.js"

import Button from "@/components/Button"
import ItemBox from "@/components/ItemBox"
import PreLoad from "@/components/PreLoad"

export default {
  name: 'Home',
  components: {
    Button,
    ItemBox,
    PreLoad
  },
  data() {
    return {
      is_load: false,
      products: null
    }
  },
  methods: {
    getProductsData() {
      return api.get("products")
      .then(res => res.data)
      .then(res => {
        if (res.length > 0) {
          this.products = res.sort(() => .5 - Math.random()).slice(0,8)
        }
      })
      .catch(() => this.is_load = true)
    }
  },
  mounted() {
    this.getProductsData()
    .then(() => this.is_load = true)
  }
}
</script>

<style src="../assets/style/pages/Home.scss" lang="scss" scoped />