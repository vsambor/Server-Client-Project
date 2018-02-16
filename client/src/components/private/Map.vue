<template>
  <div>
    <div id="floating-panel" v-if="showAB">
      <div class="row p-10">
        <!-- Inputs A and B -->
        <gmap-autocomplete id="pointA" @place_changed="onPlaceAChanged" :placeholder="$t('map.start')" class="mr-20"></gmap-autocomplete>
        <gmap-autocomplete id="pointB" @place_changed="onPlaceBChanged" :placeholder="$t('map.end')" class="mr-20"></gmap-autocomplete>

        <!-- Avoid Accidents -->
        <q-checkbox v-model="avoidAccidents" :label="$t('map.avoid_accidents')" />

        <!-- Start and Clear Directions -->
        <q-btn icon="navigation" class="ml-20" :color="$store.getters.currentTheme" @click="onDirectionGo">{{$t('general.start')}}</q-btn>
        <q-btn outline class="ml-20" color="negative" @click="onClearDirection">{{$t('general.clear')}}</q-btn>
      </div>
    </div>

    <gmap-map ref="map" :center="userPosition" :zoom="$store.getters.currentUserSettings.mapZoom" map-type-id="terrain" style="width: 100%; height: 500px">

      <!-- Adds accidents clustering (grouping) -->
      <gmap-cluster :gridSize="20" :styles="styles">
        <!-- All accident markers -->
        <gmap-marker :key="index" v-for="(accident, index) in accidents" :position="{ lat:accident.position.coordinates[1], lng: accident.position.coordinates[0], }"></gmap-marker>

      </gmap-cluster>

      <!-- User current position marker -->
      <gmap-marker :position="userPosition" icon="http://www.robotwoods.com/dev/misc/bluecircle.png"></gmap-marker>

    </gmap-map>

    <h6>{{$t('accident.total', {total: totalAccidents})}}</h6>

    <!-- Expandable Floating Action Button -->
    <q-fab v-model="fabOpened" :color="$store.getters.currentTheme" icon="keyboard_arrow_right" direction="right" :class="'fixed ' + isSiderOpened ? 'opened_fbtn' : 'closed_fbtn' ">

      <!-- Add accident button -->
      <q-btn :color="$store.getters.currentTheme" @click="onCreateAccident">{{$t('accident.add')}}</q-btn>

      <!-- Separator -->
      <div class="ml-30"></div>

      <!-- Toggle directions -->
      <q-toggle v-model="showAB" :color="$store.getters.currentTheme" @change="fabOpened=false" :label="$t('map.direction_toggle')" />

      <!-- Separator -->
      <div class="ml-30"></div>

      <!-- Toggle directions -->
      <q-toggle v-model="showControls" :color="$store.getters.currentTheme" @change="onShowControls" :label="$t('map.controls_toggle')" />
    </q-fab>

  </div>
</template>

<script>
import AccidentService from 'services/AccidentService'
import { Dialog, Toast, Alert } from 'quasar-framework'
import 'quasar-extras/animate/bounceInRight.css'
import 'quasar-extras/animate/bounceOutRight.css'

export default {
  data() {
    return {
      accidents: '',
      fabOpened: false,
      showAB: false,
      showControls: true,
      avoidAccidents: false,
      totalAccidents: 0,
      userPosition: { lat: 0, lng: 0 },
      pointA: {},
      pointB: {},
      directionsService: null,
      directionsDisplay: null,
      styles: [
        {
          url: '../../../../node_modules/marker-clusterer-plus/images/m1.png',
          width: 70,
          height: 70,
          textColor: 'white',
          textSize: 13,
          anchorText: [-8, -8]
        },
        {
          url: '../../../../node_modules/marker-clusterer-plus/images/m2.png',
          width: 60,
          height: 60,
          textColor: 'white',
          textSize: 13,
          anchorText: [-1, -2]
        },
        {
          url: '../../../../node_modules/marker-clusterer-plus/images/m3.png',
          width: 80,
          height: 80,
          textColor: 'white',
          textSize: 13,
          anchorText: [-5, -7]
        },
        {
          url: '../../../../node_modules/marker-clusterer-plus/images/m4.png',
          width: 100,
          height: 100,
          textColor: 'white',
          textSize: 13,
          anchorText: [-9, -11]
        },
        {
          url: '../../../../node_modules/marker-clusterer-plus/images/m5.png',
          width: 100,
          height: 100,
          textColor: 'white',
          textSize: 13
        }
      ]
    }
  },
  computed: {
    isSiderOpened() {
      return this.$parent.$parent.$refs.layout.leftState.openedBig
    }
  },
  mounted() {
    // Returns browser current location. (user should allow).
    navigator.geolocation.getCurrentPosition(position => {
      this.userPosition.lat = position.coords.latitude
      this.userPosition.lng = position.coords.longitude

      // Updates the current position in the database via sockets.
      this.$socket.emit('update_user_position', {
        userId: this.$store.getters.currentUser._id,
        position: {
          type: 'Point',
          coordinates: [position.coords.longitude, position.coords.latitude]
        }
      })

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
      /* eslint-disable no-undef */
      this.directionsService = new google.maps.DirectionsService()
      this.directionsDisplay = new google.maps.DirectionsRenderer({ map: this.$refs.map.$mapObject })

      // Note: the name is <disable...>, so we use the inverse of showControles.
      this.$refs.map.$mapObject.set('disableDefaultUI', !this.showControls)
    })
  },
  methods: {
    /**
     * Handles add new accident button.
     */
    onCreateAccident() {
      const vm = this
      this.fabOpened = false
      let severityModel = 1
      Dialog.create({
        title: vm.$t('accident.add_title'),
        message: vm.$t('accident.add_message', {
          location: `<b>${vm.userPosition.lat}, ${vm.userPosition.lng}</b>`
        }),
        form: {
          step: {
            type: 'slider',
            label: `<b>${vm.$t('accident.severity.title')}</b>`,
            model: severityModel,
            min: 1,
            max: 5,
            step: 1,
            snap: true,
            markers: true,
            withLabel: true,
            labelAlways: true
          }
        },
        buttons: [
          vm.$t('general.cancel'),
          {
            label: vm.$t('general.add'),
            handler(data) {
              // For the moment it adds an accident at the user current position (After maybe a dragable marker).
              AccidentService.add({
                position: {
                  type: 'Point',
                  coordinates: [vm.userPosition.lng, vm.userPosition.lat]
                },
                severity: severityModel
              }).then(() => {
                Toast.create.positive(vm.$t('general.added'))
              })
            }
          }
        ]
      })
    },

    /**
     * Handles the first autocomplete input selection.
     * Saves the latitude and longitude into pointA.
     */
    onPlaceAChanged(place) {
      this.pointA.lat = place.geometry.location.lat()
      this.pointA.lng = place.geometry.location.lng()
    },

    /**
     * Handles the second autocomplete input selection.
     * Saves the latitude and longitude into pointB.
     */
    onPlaceBChanged(place) {
      this.pointB.lat = place.geometry.location.lat()
      this.pointB.lng = place.geometry.location.lng()
    },

    /**
     * Handles the start navigation button.
     * It displays on the map the directions between 2 points, by using google services.
     */
    onDirectionGo() {
      this.directionsService.route(
        {
          origin: this.pointA,
          destination: this.pointB,
          avoidTolls: true,
          avoidHighways: false,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response)
          } else {
            Alert.create({
              enter: 'bounceInRight',
              leave: 'bounceOutRight',
              color: 'negative',
              icon: 'error',
              html: this.$t('map.directions_failed') + status,
              position: 'top-center'
            })
          }
        }
      )
    },

    /**
     * Handles the map controls toggle button change event.
     */
    onShowControls() {
      this.fabOpened = false
      this.$refs.map.$mapObject.set('disableDefaultUI', !this.showControls)
    },

    /**
     * Handles the map clean up from directoins.
     */
    onClearDirection() {
      this.$el.querySelector('#pointA').value = ''
      this.$el.querySelector('#pointB').value = ''
      this.pointA = {}
      this.pointB = {}
      this.directionsDisplay.set('directions', null)
    }
  }
}
</script>

<style scoped>
#floating-panel {
  position: absolute;
  top: 10px;
  left: 25%;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: 'Roboto', 'sans-serif';
  line-height: 30px;
  padding-left: 10px;
}

.closed_fbtn {
  left: 10px;
  bottom: 100px;
}

.opened_fbtn {
  left: 10px;
  bottom: 100px;
}
</style>
