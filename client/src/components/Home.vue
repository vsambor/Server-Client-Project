<template>
  <div>
    <div id="bg" class="fullscreen"> </div>

    <h5 class="title">Welcome to Server Client Project (STP)!</h5>

    <blockquote>
      <p class="text-italic" v-html="$t('home.text')"></p>
      <small v-html="$t('home.signature')"></small>
    </blockquote>

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

<style>
#bg {
  background-image: url('../../static/home-bg.jpg');
  min-height: 500px;
  background-size: cover;
  -moz-background-size: cover; /* Firefox 3.6 */
  background-position: center; /* Internet Explorer 7/8 */
  opacity: 0.4;
  z-index: -1;
}
</style>

