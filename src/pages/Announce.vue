<template>
  <section class="announce__container animation__fadeIn">
    <div class="announce__content mw">
      <form @submit.prevent="submitForm" class="announce__form__content" enctype="multipart/form-data">
        <div class="form__item__group">
          <label for="name">Qual o nome?</label>
          <input v-model="name" id="name" name="name" type="text" placeholder="Insira o nome do produto">
          
          <span v-if="validation.name" class="internal__error">Esse campo é obrigatório</span>
        </div>

        <div class="form__item__group">
          <label for="city">Qual a cidade?</label>
          <input v-model="city" id="city" name="city" type="text" autocomplete="random" placeholder="Insira o nome da cidade">
          
          <div v-if="citySuggestion && citySuggestion.length" class="form__item__suggestion">
            <ul>
              <li
                v-for="(suggestion, index) in citySuggestion"
                v-bind:key="index"
                @click="updateCity(suggestion)"
              >
                <span>{{ suggestion.Nome }} - {{ suggestion.Estado }}</span>
              </li>
            </ul>
          </div>
          
          <span v-if="validation.city" class="internal__error">Esse campo é obrigatório</span>
        </div>

        <div class="form__item__group">
          <label for="number">Qual o seu número?</label>
          <input v-model="number" id="number" name="number" type="number" placeholder="Insira o número para contato">
          
          <span v-if="validation.number" class="internal__error">Esse campo é obrigatório</span>
        </div>

        <div class="form__item__group">
          <label for="number">Qual o preço?</label>
          <input v-model="price" id="price" name="price" type="number" placeholder="Insira o preço">
          
          <span v-if="validation.price" class="internal__error">Esse campo é obrigatório</span>
        </div>
        
        <div class="form__item__group">
          <label for="description">Qual a descrição?</label>
          <textarea v-model="description" id="description" name="description" placeholder="Insira a descrição do produto"></textarea>

          <span v-if="validation.description" class="internal__error">Esse campo é obrigatório</span>
        </div>

        <div class="form__item__group">
          <label for="images">Agora as fotos</label>
          <input @change="setImages" id="images" name="images" type="file" multiple accept="image/png, image/jpeg" />

          <span v-if="validation.images" class="internal__error">Esse campo é obrigatório</span>

          <div class="form__images__preview">
            <img width="50" v-for="(url, index) in images" v-bind:key="index" v-bind:src="url" v-bind:alt="'Preview '+index">
          </div>
        </div>

        <div class="form__item__group checkbox">
          <label for="trade">Aceita troca</label>
          <input v-model="trade" id="trade" name="trade" type="checkbox" />
        </div>

        <div class="form__item__group checkbox">
          <label for="delivery">Entrega</label>
          <input v-model="delivery" id="delivery" name="delivery" type="checkbox" />
        </div>

        <div class="form__item__group submit">
          <button type="submit" :disabled="formSubmit" class="btn round" :class={formSubmit}>
            <p v-if="formSubmit">Enviando</p>
            <p v-else>Salvar anuncio</p>
          </button>
        </div>
        
        <span v-if="internal" class="internal__error">Houve uma falha, tente novamente mais tarde</span>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios"
import { useRouter } from "vue-router"

export default {
  name: "Announce",
  data() {
    return {
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
      internal: false,
      stateList: null,
      cityList: null,
      citySuggestion: null
    }
  },
  watch: {
    name(val) {
      if (val.length > 0) {
        if (this.validation.name) {
          this.validation.name = false
        }
      } else {
        this.validation.name = true
      }
    },
    city(val) {
      if (val.length > 0) {
        if (this.validation.city) {
          this.validation.city = false
        }

        if (val.length >= 5) {
          let city = this.cityList.filter(data => data.Nome.toLowerCase().includes(val.toLowerCase()))
          city.map(city => {
            const state = this.stateList.find(data => data.ID === city.Estado)
            if (state) city.Estado = state.Sigla
          })
          
          this.citySuggestion = city
        } else {
          this.citySuggestion = null
        }
      } else {
        this.validation.city = true
      }
    },
    number(val) {
      if (val.length > 0) {
        if (this.validation.number) {
          this.validation.number = false
        }
      } else {
        this.validation.number = true
      }
    },
    price(val) {
      if (val.length > 0) {
        if (this.validation.price) {
          this.validation.price = false
        }
      } else {
        this.validation.price = true
      }
    },
    description(val) {
      if (val.length > 0) {
        if (this.validation.description) {
          this.validation.description = false
        }
      } else {
        this.validation.description = true
      }
    },
    images(val) {
      if (val.length >= 0) {
        if (this.validation.images) {
          this.validation.images = false
        }
      } else {
        this.validation.images = true
      }
    }
  },
  methods: {
    goToId(id) {
      this.router.push(`/produto/${id}`)
    },
    getCityList() {
      axios.get("https://raw.githubusercontent.com/felipefdl/cidades-estados-brasil-json/master/Estados.json")
        .then(res => res.data)
        .then(res => this.stateList = res)

      axios.get("https://raw.githubusercontent.com/felipefdl/cidades-estados-brasil-json/master/Cidades.json")
        .then(res => res.data)
        .then(res => this.cityList = res)
    },
    updateCity(city) {
      this.city = `${city.Nome} - ${city.Estado}`
    },
    setImages(e) {
      this.images = []

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
    submitForm() {

      if (this.name.length <= 0) this.validation.name = true
      if (this.city.length <= 0) this.validation.city = true
      if (this.number.length <= 0) this.validation.number = true
      if (this.price.length <= 0) this.validation.price = true
      if (this.description.length <= 0) this.validation.description = true
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
    this.getCityList()
  }
}
</script>

<style src="../assets/style/pages/Announce.scss" lang="scss" scoped />