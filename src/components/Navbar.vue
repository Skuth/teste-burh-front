<template>
  <nav class="navbar__container">
    <div class="navbar__content mw">
      <div class="navbar__left">
        <h1 class="navbar__logo">
          <router-link to="/">
            <img src="../assets/images/logo.png" alt="Logo">
          </router-link>
        </h1>
        <div class="navbar__search">
          <form @submit="productSearch" autocomplete="off">
            <input type="text" v-model="search" name="search" placeholder="Pesquisar">
          </form>
        </div>
      </div>
      <div class="navbar__right">
        <!-- <div v-if="userOn" class="navbar__account">
          <div class="navbar__account__content" @click="dropDownToggle">
            <p>Minha conta</p>
            <img src="https://via.placeholder.com/45" alt="User image">
            <div v-if="dropDownOpen" class="navbar__dropdown">
              <ul>
                <li><router-link to="/">Meus anuncios</router-link></li>
                <li><router-link to="/">Meu perfil</router-link></li>
                <li><router-link to="/">Sair</router-link></li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="navbar__account">
          <router-link to="/entrar">Entrar</router-link>
        </div> -->
        <div class="navbar__button">
          <Button to="/anunciar" text="Anuncie agora" round />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router"

import Button from "@/components/Button"

export default {
  name: "Navbar",
  components: {
    Button
  },
  data() {
    return {
      userOn: false,
      dropDownOpen: false,
      search: null,
      router: null
    }
  },
  methods: {
    goTo(to) {
      this.router.push(to)
    },
    dropDownToggle() {
      this.dropDownOpen = !this.dropDownOpen
    },
    dropDownOutsideClick(e) {
      if (this.dropDownOpen && !this.$el.contains(e.target)) {
        this.dropDownOpen = false
      }
    },
    productSearch(e) {
      e.preventDefault()

      if (this.search === null || this.search.length === 0) {
        this.goTo(`/produtos`)
      } else {
        this.goTo(`/produtos?pesquisa=${this.search}`)

        this.search = ""
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.dropDownOutsideClick)
    this.router = useRouter()
  },
  beforeUnmount() {
    document.removeEventListener("click", this.dropDownOutsideClick)
  }
}
</script>

<style src="../assets/style/components/Navbar.scss" lang="scss" scoped />