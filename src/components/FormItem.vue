<template>
  <div v-if="type === 'textarea'" class="form__item__group">
    <label v-bind:for="name">{{ label }}</label>
    <textarea v-bind:id="name" v-bind:placeholder="placeholder" ></textarea>

    <span v-if="error" class="internal__error">Esse campo é obrigatório</span>
  </div>

  <div v-else-if="type === 'image'" class="form__item__group">
    <label v-bind:for="name">{{ label }}</label>
    <input v-bind:id="name" v-bind:name="name" type="file" multiple accept="image/png, image/jpeg">

    <span v-if="error" class="internal__error">Esse campo é obrigatório</span>

    <div class="form__images__preview">
      <img width="50" v-for="(url, index) in imageList" v-bind:key="index" v-bind:src="url" v-bind:alt="'Preview '+index">
    </div>
  </div>

  <div v-else-if="type === 'submit'" class="form__item__group submit">
    <button type="submit" :disabled="btnStatus" class="btn round">
      <p v-if="btnStatus">Enviando</p>
      <p v-else>{{ label }}</p>
    </button>
  </div>

  <div v-else-if="type === 'checkbox'" class="form__item__group checkbox">
    <label v-bind:for="name">{{ label }}</label>
    <input v-bind:id="name" v-bind:name="name" type="checkbox">
  </div>

  <div v-else class="form__item__group">
    <label v-bind:for="name">{{ label }}</label>
    <input v-bind:id="name" v-bind:name="name" v-bind:type="type" v-bind:placeholder="placeholder">
    
    <span v-if="error" class="internal__error">Esse campo é obrigatório</span>
  </div>
</template>

<script>
export default {
  name: "FormItem",
  props: {
    name: String,
    label: String,
    placeholder: String,
    type: String,
    imageList: Array,
    btnStatus: Boolean,
    error: Boolean
  }
}
</script>

<style src="../assets/style/components/FormItem.scss" lang="scss" scoped />