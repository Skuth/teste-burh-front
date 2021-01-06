<template>
  <router-link v-bind:to="to" class="btn" v-bind:class="{round}">
    <p>{{ text }}</p>
  </router-link>
</template>

<script>
export default {
  name: "Button",
  props: {
    to: String,
    text: String,
    round: Boolean
  }
}
</script>

<style src="../assets/style/components/Button.scss" lang="scss" scoped />