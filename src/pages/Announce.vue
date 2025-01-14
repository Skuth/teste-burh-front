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

          <span v-if="validation.number" class="internal__error">
            <span v-if="number.length <= 0">Esse campo é obrigatório</span>
            <span v-else-if="number.length < 10 || number.length > 11">Informe um número válido para contato</span>
          </span>
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
          <label for="images">Agora as fotos, até 5</label>
          
          <div class="form__images__content">
            <input @change="setImages" id="images" name="images" type="file" multiple accept="image/png, image/jpeg" />

            <div class="form__images__preview">
              <img width="50" v-for="(url, index) in images" v-bind:key="index" v-bind:src="url" v-bind:alt="'Preview '+index">
            </div>
          </div>

          <span v-if="validation.images" class="internal__error">Esse campo é obrigatório</span>
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
import api from "@/services/api.js"
import imgur from "@/services/imgur.js"
import sms from "@/services/sms.js"
import axios from "axios"

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
      if (val.length < 10 || val.length > 11) {
        this.validation.number = true
      } else if (val.length > 0) {
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
      this.$router.push(`/produto/${id}`)
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

      const files = e.target.files

      files.forEach((file, index) => {
        if (index < 5) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = e => {
            this.images.push(e.target.result)
          }
        }
      })
    },
    uploadImg(base64) {
      base64 = base64.replace("data:image/png;base64,", "")
      base64 = base64.replace("data:image/jpeg;base64,", "")

      return imgur.post(base64)
      .then(res => res.data)
    },
    deleteImg(id) {
      imgur.delete(id)
    },
    uploadData(data) {
      return api.post("products", data)
      .then(res => res.data)
      .then(res => {
        this.formSubmit = false
        this.goToId(res._id)
      })
      .catch(() => {
        this.formSubmit = false
        this.internal = true

        data.images.forEach(image => {
          this.deleteImg(image.id)
        })
      })
    },
    sendSms(contact) {
      if (contact.length === 10 || contact.length === 11) {
        const data = {
          from: "Trasell",
          to: `+55${contact}`,
          content: "Trasell - Seu produto foi anunciado, essa mensagem é para lembrar que o anuncio expira em 7 dias, boa sorte :)"
        }
        sms.send(data)
      }
    },
    submitForm() {
      if (this.name.length <= 0) this.validation.name = true
      if (this.city.length <= 0) this.validation.city = true
      if (this.number.length <= 0) this.validation.number = true
      if (this.price.length <= 0) this.validation.price = true
      if (this.description.length <= 0) this.validation.description = true
      if (this.images.length <= 0) this.validation.images = true

      if (!this.validation.name && !this.validation.city && !this.validation.number && !this.validation.price && !this.validation.description && !this.validation.images) {
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
              contact: parseInt(this.number).toString(),
              description: this.description,
              images: images,
              is_tradeble: this.trade,
              is_deliverable: this.delivery,
              register_date: registerDate.toString()
            })
            .then(() => {
              this.sendSms(this.number)
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
    this.getCityList()
  }
}
</script>

<style src="../assets/style/pages/Announce.scss" lang="scss" scoped />