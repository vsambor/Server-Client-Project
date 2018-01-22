<template>
	<div align="center">
		<img src="../../../static/404.png" width="700" />
		<div class="row full-width justify-center mt-10">
			<q-btn flat color="primary" @click="$router.go(-1)">{{$t('general.back')}}</q-btn>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
