<template>
  <section v-if="product" class="product__container animation__fadeIn">
    <div class="product__content mw">
      <div class="product__content__info">
        <div class="product__images">
          <img v-bind:src="product.images[activeImage].url" v-bind:alt="product.title" class="center">
          <div class="thumbnails">
            <img v-for="(image, index) in product.images" v-bind:src="image.url" v-bind:key="index" v-bind:alt="product.title+' imagem '+index" @click="activeImage = index">
          </div>
        </div>
        <div class="product__info">
          <div class="product__info__header">
            <h2 class="title">{{ product.title }}</h2>
            <span class="city">{{ product.city }}</span>
          </div>
          <div class="product__info__price">
            <span>R$ <span class="price">{{ product.price }}</span></span>
          </div>
          <Button to="/" text="Opa, eu quero" round />
          <div class="product__info__extra">
            <p v-if="product.is_deliverable">Entrega</p>
            <p v-if="product.is_tradeble">Aceita troca</p>
          </div>
          <div class="product__info__description">
            <h3>Descrição</h3>
            <p>{{ product.descriptions }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-if="products" class="products__suggestions__container animation__fadeIn">
    <div class="products__suggestions__content mw">
      <h4>Olha mais alguns produtinhos aqui</h4>
      <div class="products__suggestions__items">
        <ItemBox v-for="(product, index) in products" v-bind:key="index" v-bind:product="product" />
      </div>
    </div>
  </section>
</template>

<script>
import Button from "../components/Button"
import ItemBox from "../components/ItemBox"

import axios from "axios"
import { useRoute } from "vue-router"

export default {
  name: "Produto",
  components: {
    Button,
    ItemBox
  },
  data() {
    return {
      product: null,
      products: null,
      activeImage: 0
    }
  },
  mounted() {
    const { productId } = useRoute().params
    
    axios.get(`https://crudcrud.com/api/${process.env.VUE_APP_CRUDCRUD_ENDPOINT}/products/${productId}`)
    .then(res => res.data)
    .then(res => this.product = res)
    .catch(err => console.log(err))

    axios.get(`https://crudcrud.com/api/${process.env.VUE_APP_CRUDCRUD_ENDPOINT}/products`)
    .then(res => res.data)
    .then(res => this.products = res.slice(0,4))
    .catch(err => console.log(err))
  }
}
</script>

<style src="../assets/style/pages/Product.scss" lang="scss" scoped />