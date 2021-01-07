<template>
  <section class="announce__container animation__fadeIn">
    <div class="announce__content mw">
      <form @submit="submitForm" enctype="multipart/form-data">
        <FormItem
          @change="setName"
          v-bind:error="validation.name"
          type="text"
          name="name"
          placeholder="Insira o nome do produto"
          label="Qual o nome?"
        />

        <FormItem
          @change="setCity"
          v-bind:error="validation.city"
          type="text"
          name="city"
          placeholder="Insira o nome da cidade"
          label="Qual a cidade?"
        />

        <FormItem
          @change="setNumber"
          v-bind:error="validation.number"
          type="text"
          name="number"
          placeholder="Insira o número para contato"
          label="Qual o seu número?"
        />

        <FormItem
          @change="setPrice"
          v-bind:error="validation.price"
          type="number"
          name="price"
          placeholder="Insira o preçoo"
          label="Qual o preço?"
        />
        
        <FormItem
          @change="setDescription"
          v-bind:error="validation.description"
          type="textarea"
          name="description"
          placeholder="Insira a descrição do produto"
          label="Qual a descrição?"
        />

        <FormItem
          @change="setImages"
          v-bind:error="validation.images"
          v-bind:imageList="images"
          type="image"
          name="images"
          label="Agora as fotos?"
        />

        <FormItem
          @change="checkItem('trade')"
          type="checkbox"
          name="trade"
          label="Aceita troca"
        />

        <FormItem
          @change="checkItem('delivery')"
          type="checkbox"
          name="delivery"
          label="Entrega"
        />

        <FormItem type="submit" v-bind:btnStatus="formSubmit" label="Salvar anuncio" />
        
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
      form: "",
      name: "",
      city: "",
      number: "",
      price: "",
      description: "",
      trade: false,
      delivery: false,
      images: [],
      validation: {
        name: false,
        city: false,
        number: false,
        price: false,
        description: false,
        images: false,
      },
      formSubmit: false,
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
      if (this.validation.name) this.validation.name = false
    },
    setCity(e) {
      this.city = e.target.value
      if (this.validation.city) this.validation.city = false
    },
    setNumber(e) {
      this.number = e.target.value
      if (this.validation.number) this.validation.number = false
    },
    setPrice(e) {
      this.price = e.target.value
      if (this.validation.price) this.validation.price = false
    },
    setDescription(e) {
      this.description = e.target.value
      if (this.validation.description) this.validation.description = false
    },
    setImages(e) {
      this.images = []

      if (this.validation.images) this.validation.images = false

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
    deleteImg(id) {
      const apiUrl = `https://api.imgur.com/3/image/${id}`

      return axios({
        method: "DELETE",
        url: apiUrl,
        headers: {
          "Authorization": `Client-ID ${process.env.VUE_APP_IMGUR_API_KEY}`
        }
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
        this.formSubmit = false
        this.goToId(res._id)
      })
      .catch(() => {
        this.formSubmit = false
        this.internal = true

        data.images.forEach(image => {
          console.log(image)
          this.deleteImg(image.id)
        })
      })
    },
    submitForm(e) {
      e.preventDefault()

      if (this.name === "") this.validation.name = true
      if (this.city === "") this.validation.city = true
      if (this.number === "") this.validation.number = true
      if (this.price === "") this.validation.price = true
      if (this.description === "") this.validation.description = true
      if (this.images.length <= 0) this.validation.images = true

      if (!this.validation.name, !this.validation.city, !this.validation.number, !this.validation.price, !this.validation.description, !this.validation.images) {
        this.formSubmit = true

        let registerDate = new Date().getTime()

        let images = []

        this.images.forEach(image => {
          this.uploadImg(image)
          .then(res => {
            images.push({id: res.data.deletehash, url: res.data.link})
          })
        })

        setTimeout(() => {
          if (images.length > 0) {
            this.uploadData({
              title: this.name,
              city: this.city,
              price: parseInt(this.price).toString(),
              contact: this.number,
              description: this.description,
              images: images,
              is_active: true,
              is_tradeble: this.trade,
              is_deliverable: this.delivery,
              register_date: registerDate.toString()
            })
          } else {
            this.internal = true
            this.formSubmit = false
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