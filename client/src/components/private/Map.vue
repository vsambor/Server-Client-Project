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
      <gmap-cluster :gridSize="20" :styles="styles" :minimumClusterSize="4">

        <!-- All accident markers -->
        <gmap-marker icon="https://zupimages.net/up/18/07/7zai.png" :clickable="true" @mouseout="infoWinOpen=false" @mouseover="detailAccident(accident.position.coordinates[1], accident.position.coordinates[0], accident)" @click="commentDisplay(accident)" :key="index" v-for="(accident, index) in accidents" :position="{ lat:accident.position.coordinates[1], lng: accident.position.coordinates[0], }"></gmap-marker>

      </gmap-cluster>

      <!-- Detail of the accident -->
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <!-- Date -->
        <div>
          <b>{{$t('accident.date')}}:</b> {{getFormattedDate(accident.updatedAt)}}
        </div>

        <!-- Severity -->
        <div>
          <b>{{$t('accident.severity.title')}}:</b>
          <q-chip small :color="colorSeverity[accident.severity]">
            {{accident.severity}}
          </q-chip>
        </div>

        <!-- Comment -->
        <div>
          <b>{{$t('accident.details.nVote')}}:</b>
          <q-icon name="comment" color="primary" /> ({{accident.comments.length}})
        </div>

        <!-- Vote -->
        <div>
          <q-icon name="fa-thumbs-up" color="positive" /> {{accident.vote.positive}}
          <q-icon name="fa-thumbs-down" color="negative" /> {{accident.vote.negative}}
        </div>
      </gmap-info-window>

      <!-- User current position marker -->
      <gmap-marker :position="userPosition" icon="http://www.robotwoods.com/dev/misc/bluecircle.png"></gmap-marker>

      <!-- Car simulation position marker -->
      <gmap-marker :position="simulatorPosition" v-if="simulatorPosition"></gmap-marker>

      <gmap-circle v-for="(proxAccident, index) in proximityAccidents" :key="index" :center="proxAccident.center" :radius="$store.getters.currentUserSettings.avoidProximity"> </gmap-circle>
    </gmap-map>

    <!-- Total accident -->
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

    <!-- Popup for comments -->
    <q-modal @escape-key="closeModal" @close="closeModal" v-model="open" minimized :content-css="{ padding: '20px',paddingTop: '5px', minWidth: '80vw', maxWidth: '80vw',maxHeight: '80vw'}">
      <div>

        <div class="row">
          <div class="col-sm">
            <h5>{{$t('accident.title')}}</h5>
          </div>
          <!-- Vote -->
          <div class="col-sm pt-15">
            <div class="text-right">
              <!-- Positive -->
              <q-btn flat round :color="positiveVoteColor" icon="fa-thumbs-up" @click="vote('positiveVote')">
                <q-chip floating color="positive">{{accident.vote.positive}}</q-chip>
              </q-btn>

              <!-- Negative -->
              <q-btn flat round :color="negativeVoteColor" icon="fa-thumbs-down" @click="vote('negativeVote')">
                <q-chip floating color="negative">{{accident.vote.negative}}</q-chip>
              </q-btn>
            </div>
          </div>
        </div>
        <q-collapsible icon="fa-exclamation-triangle" :label="$t('accident.details.title')">
          <div v-for="(value, key) in accident.details" :key="key" class="mt-5">
            <b>{{$t('accident.details.' + key)}}:</b> {{value}}
          </div>
        </q-collapsible>
        <hr class="mb-20">
        <h5>{{$t('comment.comment_accident')}}</h5>
        <hr class="mb-20">
        <q-list v-if="comments.length !== 0">
          <!-- Comment -->
          <q-collapsible @open="closeEditMode" @close="closeEditMode" :avatar="comment.picture" :label="comment.author" :sublabel="getFormattedDate(comment.updatedAt)" v-for="comment in comments" :key="comment.id">
            <div>
              {{ comment.text }}
            </div>

            <!-- Edit/delet -->
            <div v-if="$store.getters.currentUser._id === comment.userId || $store.getters.isAdmin" class="text-right">
              <q-btn round flat small color="positive" icon="edit" @click="openEditMode(comment._id, comment.text)" />
              <q-btn round flat small color="negative" icon="delete" @click="deleteComment(comment._id)" />
            </div>
          </q-collapsible>
        </q-list>
        <p v-else>{{$t('comment.no_comment')}}</p>
        <hr class="mb-20 mt-10">

        <!-- Add comment -->
        <div v-if="edit === false">
          <q-input v-model="comment" type="textarea" :float-label="$t('comment.comment')" :color="$store.getters.currentTheme " />
          <div class="text-right">
            <q-btn icon="insert comment" :color="$store.getters.currentTheme " @click="addComment">{{$t('comment.comment')}}</q-btn>
          </div>
        </div>

        <!-- Edits comment -->
        <div v-else>
          <q-input v-model="comment" type="textarea" :float-label="$t('comment.comment')" :color="$store.getters.currentTheme " />
          <div class="text-right">
            <q-btn icon="insert comment" :color="$store.getters.currentTheme " @click="editComment(editCommentId,comment)">{{$t('comment.edit_comment')}}</q-btn>
          </div>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import AccidentService from 'services/AccidentService'
import { Dialog, Toast, Alert } from 'quasar-framework'
import moment from 'moment'
import 'quasar-extras/animate/bounceInRight.css'
import 'quasar-extras/animate/bounceOutRight.css'

export default {
  sockets: {
    /**
     * Listens for the <proximity_accident> socket message and handles the display of a circle for the new closesed accidents.
     *
     * @param {Object} serverNotification - the notification object provided from the server via socket.emit.
     */
    proximity_accident(accidentProximity) {
      // After adding the accident properties in the proximityAccidents it is automatically displayed on the map.
      this.proximityAccidents.push(accidentProximity)

      // By using this variable, the backend is abled to check if is needed a new notification,
      // without being a need to save in database.
      this.lastNotifiedAccident = accidentProximity.center
    }
  },
  data() {
    return {
      colorSeverity: { 1: 'positive', 2: 'lime', 3: 'yellow', 4: 'amber', 5: 'negative' },
      infoOptions: { pixelOffset: { width: 0, height: -40 } },
      infoWindowPos: { lat: 0, lng: 0 },
      infoWinOpen: false,
      negativeVoteColor: 'faded',
      positiveVoteColor: 'faded',
      edit: false,
      comments: {},
      comment: '',
      editCommentId: '',
      open: false,
      accidents: '',
      fabOpened: false,
      accident: { vote: { posotive: 0, negative: 0 }, comments: [] },
      showAB: false,
      showControls: true,
      avoidAccidents: false,
      totalAccidents: 0,
      userPosition: { lat: 0, lng: 0 },
      simulatorPosition: null,
      isSimulationRunning: false,
      lastNotifiedAccident: null,
      proximityAccidents: [],
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

      this.updateUserPosition(this.userPosition)

      // Gets all available accidents for admin users.
      if (this.$store.getters.isAdmin) {
        // if (this.$store.getters.isLogged) {
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
     * Returnes formatted date in date and minutes format.
     *
     * @param {Date} date - the date which needs to be formatted.
     * @return {Date} - the formatted date.
     */
    getFormattedDate(date) {
      return moment(date).format('MM/DD/YYYY hh:mm')
    },

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
      this.lastNotifiedAccident = null

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
            this.isSimulationRunning = true
            this.drivingSimulation(0, response.routes[0].overview_path)
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
     * Updates the user current position via sockets
     *
     * @param {Object} position - the new position of the user.
     */
    updateUserPosition(position) {
      this.$socket.emit('update_user_position', {
        userId: this.$store.getters.currentUser._id,
        userAvoidProximity: this.$store.getters.currentUser.settings.avoidProximity,
        position: {
          type: 'Point',
          coordinates: [position.lng, position.lat]
        },
        avoidAccidents: this.avoidAccidents,
        lastNotifiedAccident: this.lastNotifiedAccident
      })
    },

    /**
     * Simulates the movement of the user from point A to B.
     *
     * @param {Number} i - the iterator count
     * @param {Array} points - the array of [{lat, lng}] points extracted from the google directions.
     */
    drivingSimulation(i, points) {
      if (this.isSimulationRunning) {
        setTimeout(() => {
          this.simulatorPosition = { lat: points[i].lat(), lng: points[i].lng() }
          i++
          if (i < points.length) {
            this.drivingSimulation(i, points)

            // Updates user position; in the backend checks if in proximity there is an accident and user is notified if so.
            this.updateUserPosition(this.simulatorPosition)
          } else {
            Toast.create.info(this.$t('map.arrived_at_destination'))
          }
        }, 300) // Simulation speed
      }
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
      this.isSimulationRunning = false
      this.simulatorPosition = null
      this.lastNotifiedAccident = null
      this.proximityAccidents = []
      this.directionsDisplay.set('directions', null)
    },

    /**
     * Refresh the comments.
     */
    refreshComment() {
      AccidentService.getComments(this.accident._id).then(response => {
        this.comments = response.data.comments
      })
    },

    /**
     * Comment display.
     *
     * @param {Object} accident - accident.
     */
    commentDisplay(accident) {
      this.accident = accident
      this.refreshComment()
      this.open = true
    },

    /**
     * Add a comment.
     */
    addComment() {
      AccidentService.addComment(this.accident._id, {
        text: this.comment,
        picture: this.$store.getters.currentUser.profile.picture,
        userId: this.$store.getters.currentUser._id,
        author: this.$store.getters.currentUser.profile.firstName + ' ' + this.$store.getters.currentUser.profile.lastName
      }).then(() => {
        this.refreshComment()
        this.closeEditMode()
        Toast.create.positive(this.$t('general.added'))
      })
    },

    /**
     * Edit a comment.
     */
    editComment(commentId, data) {
      AccidentService.setComment(this.accident._id, commentId, { text: data }).then(() => {
        this.refreshComment()
        this.closeEditMode()
        Toast.create.positive(this.$t('general.updated'))
      })
    },

    /**
     * Delete a comment.
     *
     * @param {Number} commentId - comment id.
     */
    deleteComment(commentId) {
      AccidentService.deleteComment(this.accident._id, commentId).then(response => {
        this.refreshComment()
        this.closeEditMode()
        Toast.create.negative(this.$t('general.delete'))
      })
    },

    /**
     * Opens the comment editor.
     *
     * @param {Number} commentId - comment id.
     * @param {String} commentString - comment.
     */
    openEditMode(commentId, commentString) {
      this.edit = true
      this.editCommentId = commentId
      this.comment = commentString
    },

    /**
     * CLoses the comment editor.
     */
    closeEditMode() {
      this.edit = false
      this.comment = ''
      this.editCommentId = ''
    },

    /**
     * Vote for a accident.
     *
     * @param {String} status - status vote.
     */
    vote(status) {
      if (status === 'positiveVote') {
        if (this.positiveVoteColor === 'faded') {
          this.positiveVoteColor = 'positive'
          this.accident.vote.positive += 1
          if (this.negativeVoteColor === 'negative') {
            this.negativeVoteColor = 'faded'
            this.accident.vote.negative -= 1
          }
        } else {
          this.positiveVoteColor = 'faded'
          this.accident.vote.positive -= 1
        }
      } else {
        if (this.negativeVoteColor === 'faded') {
          this.negativeVoteColor = 'negative'
          this.accident.vote.negative += 1
          if (this.positiveVoteColor === 'positive') {
            this.positiveVoteColor = 'faded'
            this.accident.vote.positive -= 1
          }
        } else {
          this.negativeVoteColor = 'faded'
          this.accident.vote.negative -= 1
        }
      }
      AccidentService.setVote(this.accident._id, {
        positive: this.accident.vote.positive,
        negative: this.accident.vote.negative
      }).then(response => {
        Toast.create.positive(this.$t('general.updated'))
      })
    },

    /**
     * Close the modal.
     */
    closeModal() {
      this.closeEditMode()
      this.negativeVoteColor = 'faded'
      this.positiveVoteColor = 'faded'
    },

    /**
     * Detail of the accident.
     *
     * @param {Number} lat - latitude.
     * @param {Number} lng - longitude.
     * @param {Number} accident - accident.
     */
    detailAccident(lat, lng, accident) {
      this.infoWindowPos = { lat: lat, lng: lng }
      this.accident = accident
      this.infoWinOpen = true
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
