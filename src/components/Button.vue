<template>
  <router-link v-if="!external" v-bind:to="to" class="btn" v-bind:class="{round}">
    <p>{{ text }}</p>
  </router-link>
  <a v-else v-bind:href="to" target="_blank" class="btn" v-bind:class="{round}">
    <p>{{ text }}</p>
  </a>
</template>

<script>
export default {
  name: "Button",
  props: {
    to: String,
    text: String,
    round: Boolean,
    external: Boolean
  }
}
</script>

<style src="../assets/style/components/Button.scss" lang="scss" scoped />