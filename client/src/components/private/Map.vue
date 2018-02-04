<template>
  <div>
    <gmap-map :center="{lat:43.6156571, lng:7.072127}" :zoom="16" map-type-id="terrain" style="width: 100%; height: 500px">

      <!-- All accident markers -->
      <gmap-marker :key="index" v-for="(accident, index) in accidents" :position="accident.position"></gmap-marker>

      <!-- User current position marker -->
      <gmap-marker :position="userPosition" icon="http://www.robotwoods.com/dev/misc/bluecircle.png"></gmap-marker>

    </gmap-map>
  </div>
</template>

<script>
import AccidentService from 'services/AccidentService'

export default {
  data() {
    return {
      accidents: '',
      userPosition: { lat: 0, lng: 0 }
    }
  },
  created() {
    // Returns browser current location. (user should allow)
    navigator.geolocation.getCurrentPosition(position => {
      this.userPosition.lat = position.coords.latitude
      this.userPosition.lng = position.coords.longitude
    })

    AccidentService.getAll()
      .then(response => {
        this.accidents = response.data.accidents
      })
      .catch(() => {})
  }
}
</script>

<style scoped>

</style>
