<template>
  <div>
    <h4>{{$t('settings.title')}}</h4>
    <div class="row">
      <div class="col-xs-12 col-md-6 col-lg-5 col-xl-4">

        <!-- Geolocation -->
        <h5>{{$t('settings.geolocation')}}</h5>
        <div class="mb-50">
          <q-toggle v-model="settings.geo" unchecked-icon="gps off" checked-icon="gps fixed" :color="$store.getters.currentTheme" @change="onSettingsChanged($event, 'geo')" />
        </div>

        <!-- Notification -->
        <h5>{{$t('settings.notification')}}</h5>
        <div class="mb-50">
          <q-toggle v-model="settings.showNotification" :color="$store.getters.currentTheme" left-label @change="onSettingsChanged($event, 'showNotification')" />
        </div>

        <!-- Theme -->
        <h5>{{$t('settings.theme')}}</h5>
        <div class="mb-50">
          <q-select v-model="settings.appTheme" :options="selectOptions" :color="settings.appTheme" inverted @change="onSettingsChanged($event, 'appTheme')" />
        </div>

        <!-- Proximity -->
        <h5>{{$t('settings.proximity')}}</h5>
        <div class="mb-50">
          <q-slider v-model="settings.alertProximity" label-always :min="1" :max="100" :step="1" :label-value="`${settings.alertProximity} Km`" :color="$store.getters.currentTheme" @change="onSettingsChanged($event, 'alertProximity')" />
        </div>

        <!-- Zoom -->
        <h5>{{$t('settings.zoom')}}</h5>
        <div class="mb-50">
          <q-slider v-model="settings.mapZoom" label-always :min="2" :max="21" :step="1" :label-value="`${settings.mapZoom} zoom`" :color="$store.getters.currentTheme" @change="onSettingsChanged($event, 'mapZoom')" />
        </div>
        <gmap-map :center="{lat:43.6156571, lng:7.072127}" :zoom="settings.mapZoom" map-type-id="terrain" style="height: 300px"></gmap-map>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from 'services/UserService'
import { Toast } from 'quasar-framework'

export default {
  data() {
    return {
      settings: {
        showNotification: false,
        appTheme: null,
        geo: false,
        alertProximity: 0,
        mapZoom: 0
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
    /**
     * Action that saves the parameters in the database and send a notification.
     *
     * @param {Object} newValue - new setting value.
     * @param {String} field - setting object property.
     */
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
