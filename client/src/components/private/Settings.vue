<template>
  <div>
    <h4>{{$t('settings.title_settings')}}</h4>
    <div class="row">
      <div class="col-xs-12 col-md-6 col-lg-5 col-xl-4">

        <!-- Geolocation -->
        <h5>{{$t('settings.title_geolocation')}}</h5>
        <div class="mb-50">
          <q-toggle v-model="settings.geo" unchecked-icon="gps off" checked-icon="gps fixed" :color="$store.getters.currentTheme" @change="onSettingsChanged($event, 'geo')" />
        </div>

        <!-- Theme -->
        <h5>{{$t('settings.title_theme')}}</h5>
        <div class="mb-50">
          <q-select v-model="settings.appTheme" :options="selectOptions" :color="settings.appTheme" inverted @change="onSettingsChanged($event, 'appTheme')" />
        </div>

        <h5>{{$t('settings.title_notification')}}</h5>
        <div class="mb-50">
          <!-- Notification -->
          <q-toggle v-model="settings.showNotification" :color="$store.getters.currentTheme" left-label @change="onSettingsChanged($event, 'showNotification')" />
        </div>

        <h5>{{$t('settings.title_proximity')}}</h5>
        <div class="mb-50">
          <!-- Proximity -->
          <q-slider v-model="settings.alertProximity" label-always :min="1" :max="100" :step="1" :label-value="`${settings.alertProximity} Km`" :color="$store.getters.currentTheme" @change="onSettingsChanged($event, 'alertProximity')" />
        </div>

        <h5>{{$t('settings.title_zoom')}}</h5>
        <div class="mb-50">
          <!-- Zoom -->
          <q-slider v-model="settings.zoomMap" label-always :min="2" :max="21" :step="1" :label-value="`${settings.zoomMap} zoom`" :color="$store.getters.currentTheme" @change="onSettingsChanged($event, 'zoomMap')" />
        </div>
        <gmap-map :center="{lat:43.6156571, lng:7.072127}" :zoom="settings.zoomMap" map-type-id="terrain" style="height: 300px">

          <!-- All accident markers -->
          <gmap-marker :key="index" v-for="(accident, index) in accidents" :position="accident.position"></gmap-marker>

          <!-- User current position marker -->
          <gmap-marker :position="userPosition" icon="http://www.robotwoods.com/dev/misc/bluecircle.png"></gmap-marker>

        </gmap-map>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import UserService from 'services/UserService'
import { Toast } from 'quasar-framework'
import { Validator } from 'vee-validate'

export default {
  data() {
    return {
      settings: {
        showNotification: false,
        appTheme: null,
        geo: false,
        alertProximity: 0
      },
      selectOptions: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Tertiary', value: 'tertiary' },
        { label: 'Positive', value: 'positive' },
        { label: 'Negative', value: 'negative' },
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Dark', value: 'dark' },
        { label: 'Faded', value: 'faded' }
      ]
    }
  },
  created() {
    UserService.getSettings(this.$store.getters.currentUser._id).then(
      response => {
        this.settings = response.data.settings
      }
    )
  },
  methods: {
    onSettingsChanged(newValue, field) {
      if (field === 'appTheme') {
        this.$store.commit('setCurrentTheme', newValue)
      }
      this.settings[field] = newValue
      UserService.setSettings(
        this.$store.getters.currentUser._id,
        this.settings
      )
      Toast.create.positive('saved')
    }
  }
}
</script>

<style scoped>

</style>
