<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Welcome to Server Client Project (STP)!</h1>
      </div>
      <div style="text-color: black;">{{ $t("general.hello") }}</div>
      or
      <div style="text-color: black;">{{ $i18n.t("general.hello") }}</div>
      or
      <div style="text-color: black;">{{ $i18n.messages.fr.general.hello }}</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
