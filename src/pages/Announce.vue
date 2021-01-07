<template>
  <section class="announce__container animation__fadeIn">
    <div class="announce__content mw">
      <form @submit="submitForm" enctype="multipart/form-data">
        <FormItem @change="setName" v-bind:error="nameError" type="text" name="name" placeholder="Insira o nome do produto" label="Qual o nome?" />
        <FormItem @change="setCity" v-bind:error="cityError" type="text" name="city" placeholder="Insira o nome da cidade" label="Qual a cidade?" />
        <FormItem @change="setNumber" v-bind:error="numberError" type="text" name="number" placeholder="Insira o número para contato" label="Qual o seu número?" />
        <FormItem @change="setPrice" v-bind:error="priceError" type="number" name="price" placeholder="Insira o preçoo" label="Qual o preço?" />
        <FormItem @change="setDescription" v-bind:error="descriptionError" type="textarea" name="description" placeholder="Insira a descrição do produto" label="Qual a descrição?" />
        <FormItem @change="setImages" v-bind:error="imagesError" v-bind:imageList="images" type="image" name="images" label="Agora as fotos?" />
        <FormItem @change="checkItem('trade')" type="checkbox" name="trade" label="Aceita troca" />
        <FormItem @change="checkItem('delivery')" type="checkbox" name="delivery" label="Entrega" />
        <FormItem type="submit" v-bind:btnStatus="formSubmite" label="Salvar anuncio" />
        <span v-if="internal" class="internal__error">Houve uma falha, tente novamente mais tarde</span>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios"
import { useRouter } from "vue-router"

import FormItem from "@/components/FormItem"

export default {
  name: "Announce",
  components: {
    FormItem
  },
  data() {
    return {
      name: null,
      city: null,
      number: null,
      price: null,
      description: null,
      trade: false,
      delivery: false,
      images: [],
      nameError: false,
      cityError: false,
      numberError: false,
      priceError: false,
      descriptionError: false,
      imagesError: false,
      formSubmite: false,
      router: null,
      internal: false
    }
  },
  methods: {
    goToId(id) {
      this.router.push(`/produto/${id}`)
    },
    setName(e) {
      this.name = e.target.value
      if (this.nameError) this.nameError = false
    },
    setCity(e) {
      this.city = e.target.value
      if (this.cityError) this.cityError = false
    },
    setNumber(e) {
      this.number = e.target.value
      if (this.numberError) this.numberError = false
    },
    setPrice(e) {
      this.price = e.target.value
      if (this.priceError) this.priceError = false
    },
    setDescription(e) {
      this.description = e.target.value
      if (this.descriptionError) this.descriptionError = false
    },
    setImages(e) {
      this.images = []

      if (this.imagesError) this.imagesError = false

      const $this = this
      const files = e.target.files

      files.forEach(file => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          $this.images.push(e.target.result)
        }
      })
    },
    checkItem(target) {
      this[target] = !this[target]
    },
    uploadImg(base64) {
      base64 = base64.replace("data:image/png;base64,", "")
      base64 = base64.replace("data:image/jpeg;base64,", "")

      const apiUrl = "https://api.imgur.com/3/image"

      return axios({
        method: "POST",
        url: apiUrl,
        data: {
          image: base64
        },
        headers: {
          "Authorization": `Client-ID ${process.env.VUE_APP_IMGUR_API_KEY}`
        }
      })
      .then(res => res.data)
      .then(res => {
        return res
      })
      .catch(err => console.log(err))
    },
    uploadData(data) {
      const apiUrl = `https://crudcrud.com/api/${process.env.VUE_APP_CRUDCRUD_ENDPOINT}/products`
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"

      axios({
        method: "POST",
        url: proxyUrl+apiUrl,
        data,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(res => res.data)
      .then(res => {
        this.formSubmite = false
        this.goToId(res._id)
      })
      .catch(() => {
        this.formSubmite = false
        this.internal = true
      })
    },
    submitForm(e) {
      e.preventDefault()

      if (this.name === null) this.nameError = true
      if (this.city === null) this.cityError = true
      if (this.number === null) this.numberError = true
      if (this.price === null) this.priceError = true
      if (this.description === null) this.descriptionError = true
      if (this.images.length <= 0) this.imagesError = true

      if (!this.nameError, !this.cityError, !this.numberError, !this.priceError, !this.descriptionError, !this.imagesError) {
        this.formSubmite = true

        let registerDate = new Date().getTime()

        let images = []

        this.images.forEach(image => {
          this.uploadImg(image)
          .then(res => {
            images.push({url: res.data.link})
          })
          .catch(() => this.internal = true)
        })

        setTimeout(() => {
          if (!this.internal) {
            this.uploadData({
              title: this.name,
              city: this.city,
              price: this.price,
              contact: this.number,
              description: this.description,
              images: images,
              is_active: true,
              is_tradeble: this.trade,
              is_deliverable: this.delivery,
              register_date: registerDate.toString()
            })
          }
        }, 3000)
      }
    }
  },
  mounted() {
    this.router = useRouter()
  }
}
</script>

<style src="../assets/style/pages/Announce.scss" lang="scss" scoped />