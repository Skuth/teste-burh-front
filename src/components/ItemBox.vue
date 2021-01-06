<template>
  <router-link v-if="product && product.is_active" v-bind:to="'/produto/'+product._id" class="item__box">
    <div class="item__picture">
      <img v-bind:src="product.images[0].url" v-bind:alt="product.title">
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
        <p v-if="product.is_deliverable">Entrega</p>
        <p v-if="product.is_tradeble">Aceita troca</p>
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
      descriptions: String,
      images: Array({
        url: String
      }),
      contact_clicks: Number,
      is_active: Boolean,
      is_tradeble: Boolean,
      is_deliverable: Boolean,
      expire_date: String
    }
  }
}
</script>

<style src="../assets/style/components/ItemBox.scss" lang="scss" scoped />