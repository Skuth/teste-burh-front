<template>
  <section v-if="is_load && products.length" class="products__box__container animation__fadeIn">
    <div class="products__box__content mw mh">
      <div class="products__box__items">
        <ItemBox v-for="(product, index) in products" v-bind:key="index" v-bind:product="product" />
      </div>
      <div v-if="btnShow" class="button__container">
        <button @click="btnHandleClick" class="btn round">Carregar mais</button>
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
</template>

<script>
import axios from "axios"
import { useRoute } from "vue-router"

import ItemBox from "@/components/ItemBox.vue"
import Button from "@/components/Button.vue"
import PreLoad from "@/components/PreLoad.vue"

export default {
  name: "Products",
  components: {
    ItemBox,
    Button,
    PreLoad
  },
  data() {
    return {
      is_load: false,
      pagina: 1,
      products: [],
      btnShow: true,
      router: null,
      search: null
    }
  },
  watch: {
    $route() {
      this.getParam()
      this.products = []
      this.is_load = false
      this.getData()
    }
  },
  methods: {
    btnHandleClick() {
      this.pagina ++

      this.getData()
    },
    getData() {
      axios.get(`https://crudcrud.com/api/${process.env.VUE_APP_CRUDCRUD_ENDPOINT}/products`)
        .then(res => res.data)
        .then(res => {
          let start = (this.pagina - 1)

          if (this.search) res = res.filter(item => item.title.toLowerCase().includes(this.search))

          res.slice((8 * start),(8 * this.pagina)).map((item) => this.products.push(item))

          if ((8 * this.pagina) > res.length) this.btnShow = false
        })
        .catch(err => console.log(err))
    },
    getParam() {
      const { pesquisa } = this.router.query
      if (typeof pesquisa !== "undefined") {
        this.search = pesquisa.toLowerCase()
      } else {
        this.search = null
      }
    }
  },
  mounted() {
    this.getData()

    this.router = useRoute()
    this.getParam()

    setTimeout(() => this.is_load = true, 2000)
  }
}
</script>

<style src="../assets/style/pages/Products.scss" lang="scss" scoped />