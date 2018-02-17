<template>
	<div>
		<div id="bg" class="fullscreen"> </div>
		<div class="fixed-bottom row full-width justify-center mt-10" style="margin-bottom: 80px">
			<q-btn flat color="primary" @click="$router.go(-1)">{{$t('general.back')}}</q-btn>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style >
#bg {
  background-image: url('../../../static/404.png');
  min-height: 500px;
  background-size: cover;
  -moz-background-size: cover; /* Firefox 3.6 */
  background-position: center; /* Internet Explorer 7/8 */
  opacity: 0.4;
  z-index: -1;
}
</style>
