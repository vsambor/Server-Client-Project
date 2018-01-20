<template>
  <div>
    <h4 class="title">Welcome to Server Client Project (STP)!</h4>
    <div style="text-color: black;">{{ $t("general.hello") }}</div>
    or
    <div style="text-color: black;">{{ $i18n.t("general.hello") }}</div>
    or
    <div style="text-color: black;">{{ $i18n.messages.fr.general.hello }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
