<template>
  <div>
    <h5>{{$t('about.title')}}</h5>
    <p v-html="$t('about.text')"></p>
    <br>
    <h5>{{$t('about.contact_title')}}</h5>
    <p v-html="$t('about.contact_text')"></p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
