<template>
  <router-link v-if="product" v-bind:to="'/produto/'+product._id" class="item__box animation__fadeIn">
    <div class="item__picture">
      <img v-if="product.images[0]" v-bind:src="product.images[0].url" v-bind:alt="product.title">
      <img v-else src="https://bit.ly/3hQQLQ5" v-bind:alt="product.title">
    </div>
    <div class="item__info">
      <div class="item__info__header">
        <p class="title">{{ product.title }}</p>
        <span class="city">{{ product.city }}</span>
      </div>
      <div class="item__info__price">
        <span>R$ <span class="price">{{ product.price }}</span></span>
      </div>
      <div class="item__info__footer">
        <p v-if="product.is_deliverable">
          <font-awesome-icon icon="truck" />
          <span>Entrega</span>
        </p>
        <p v-if="product.is_tradeble">
          <font-awesome-icon icon="handshake" />
          <span>Aceita troca</span>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>

export default {
  name: "ItemBox",
  props: {
    product: {
      _id: Number,
      title: String,
      city: String,
      price: Number,
      contact: String,
      description: String,
      images: Array({
        url: String
      }),
      is_tradeble: Boolean,
      is_deliverable: Boolean,
      register_date: String
    }
  }
}
</script>

<style src="../assets/style/components/ItemBox.scss" lang="scss" scoped />