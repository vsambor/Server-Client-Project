<template>
  <div>
    <gmap-map :center="userPosition" :zoom="16" map-type-id="terrain" style="width: 100%; height: 500px">

      <!-- All accident markers -->
      <gmap-marker :key="index" v-for="(accident, index) in accidents" :position="{ lat:accident.position.coordinates[1], lng: accident.position.coordinates[0], }"></gmap-marker>

      <!-- User current position marker -->
      <gmap-marker :position="userPosition" icon="http://www.robotwoods.com/dev/misc/bluecircle.png"></gmap-marker>

    </gmap-map>

    <h6>{{$t('accident.total', {total: totalAccidents})}}</h6>
  </div>
</template>

<script>
import AccidentService from 'services/AccidentService'

export default {
  data() {
    return {
      accidents: '',
      totalAccidents: 0,
      userPosition: { lat: 0, lng: 0 }
    }
  },
  created() {
    // Returns browser current location. (user should allow).
    navigator.geolocation.getCurrentPosition(position => {
      this.userPosition.lat = position.coords.latitude
      this.userPosition.lng = position.coords.longitude

      // Gets all available accidents for admin users.
      if (this.$store.getters.isAdmin) {
        AccidentService.getAll()
          .then(response => {
            this.accidents = response.data.accidents
            this.totalAccidents = response.data.count
          })
          .catch(() => {})
      } else {
        // Gets only proximity accidents for role user.
        AccidentService.getAllInProximity(this.userPosition)
          .then(response => {
            this.accidents = response.data.accidents
            this.totalAccidents = response.data.count
          })
          .catch(() => {})
      }
    })
  }
}
</script>

<style scoped>

</style>
