<template>
  <section class="not__found__container animation__fadeIn">
    <div class="not__found__content mw mh">
      <p class="title">Opaa, erro 404</p>
      <span>Não encontrei essa página :c</span>
      <span>Mas você pode criar uma página apertando no botão abaixo</span>
      <Button to="/anunciar" text="Bem aqui" round />
    </div>
  </section>
</template>

<script>
import Button from "@/components/Button"

export default {
  name: "NotFound",
  components: {
    Button
  }
}
</script>