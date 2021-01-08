<template>
  <section v-if="is_load && product" class="product__container animation__fadeIn mh">
    <div class="product__content mw">
      <div class="product__content__info">
        <div class="product__images">
          <img v-if="product.images[activeImage]" v-bind:src="product.images[activeImage].url" v-bind:alt="product.title" class="center">
          <img v-else src="https://bit.ly/3hQQLQ5" v-bind:alt="product.title" class="center">
          <div class="thumbnails">
            <img v-for="(image, index) in product.images" v-bind:src="image.url" v-bind:key="index" v-bind:alt="product.title+' imagem '+index" @click="activeImage = index">
          </div>
        </div>
        <div class="product__info">
          <div class="product__info__header">
            <h2 class="title">{{ product.title }}</h2>
            <span class="city">{{ product.city }}</span>
            <span v-if="product.register_date === 0" class="date">Hoje</span>
            <span v-else-if="product.register_date === 1" class="date">{{product.register_date}} dia atras</span>
            <span v-else class="date">{{product.register_date}} dias atras</span>
          </div>
          <div class="product__info__price">
            <span>R$ <span class="price">{{ product.price }}</span></span>
          </div>
          <Button external v-bind:to="'https://api.whatsapp.com/send/?phone=55'+product.contact+'&text=Opa, estava dando uma olhada no *Trasell* e vi que está vendendo *'+product.title+'*, tenho interesse em comprar!'" text="Opa, eu quero" round />
          <div class="product__info__extra">
            <p v-if="product.is_deliverable">Entrega</p>
            <p v-if="product.is_tradeble">Aceita troca</p>
          </div>
          <div class="product__info__description">
            <h3>Descrição</h3>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else-if="is_load" class="not__found__container animation__fadeIn">
    <div class="not__found__content mw mh">
      <p class="title">Opaa</p>
      <span>Não encontrei nada aqui :c</span>
      <span>Que tal ter seu produto aqui??</span>
      <Button to="/anunciar" text="Anuncia ai" round />
    </div>
  </section>
  <PreLoad v-else />
  <section v-if="is_load && product && products" class="products__box__container animation__fadeIn">
    <div class="products__box__content mw">
      <h4>Olha mais alguns produtinhos aqui</h4>
      <div class="products__box__items">
        <ItemBox v-for="(product, index) in products" v-bind:key="index" v-bind:product="product" />
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/services/api.js"
import { useRoute } from "vue-router"

import Button from "@/components/Button"
import ItemBox from "@/components/ItemBox"
import PreLoad from "@/components/PreLoad"

export default {
  name: "Produto",
  components: {
    Button,
    ItemBox,
    PreLoad
  },
  data() {
    return {
      is_load: false,
      product: null,
      products: null,
      activeImage: 0,
      router: null
    }
  },
  watch: {
    $route() {
      this.is_load = false
      this.product = null
      this.products = null
      this.activeImage = 0

      this.getProductData()
      this.getProductsData()

      setTimeout(() => this.is_load = true, 2000)
    }
  },
  methods: {
    getProductData() {
      const { productId } = this.router.params

      api.get(`products/${productId}`)
      .then(res => res.data)
      .then(res => this.product = res)
      .then(() => this.product.register_date = this.parseDate())
      .catch(err => console.log(err))
    },
    getProductsData() {
      api.get("products")
      .then(res => res.data)
      .then(res => {
        if (res.length > 0) this.products = res.filter(item => item._id !== this.product._id).sort(() => .5 - Math.random()).slice(0,4)
      })
      .catch(err => console.log(err))
    },
    parseDate() {
      const date = new Date()
      let days =  date.getTime() - parseInt(this.product.register_date)
      days = Math.floor(days / (1000 * 3600 * 24))

      return days
    }
  },
  mounted() {
    this.router = useRoute()
    
    this.getProductData()
    this.getProductsData()

    setTimeout(() => this.is_load = true, 2000)
  }
}
</script>

<style src="../assets/style/pages/Product.scss" lang="scss" scoped />