<template>
  <div>
    <!-- Add vehicle -->
    <q-btn class="mb-20" round :color="$store.getters.currentTheme" icon="add" @click="addVehicle('', $t('general.add'))" />

    <!-- Data table -->
    <q-data-table :data="vehicles" :config="config" :columns="columns">

      <template slot="selection" slot-scope="selection">
        <!-- Delete -->
        <q-btn flat :color="$store.getters.currentTheme" @click="deleteVehicle(selection.rows[0].data._id)">
          <q-icon name="delete" />
        </q-btn>

        <!-- Edit -->
        <q-btn flat :color="$store.getters.currentTheme" @click="editVehicle(selection.rows[0].data)">
          <q-icon name="edit" />
        </q-btn>
      </template>

      <!-- Type -->
      <template slot="col-type" slot-scope="cell" v-if="VehicleEnum">
        <q-icon :name="VehicleEnum[cell.row.type].icon" />
        <q-tooltip>{{VehicleEnum[cell.row.type].label}}</q-tooltip>
      </template>
    </q-data-table>
  </div>
</template>

<script>
import UserService from 'services/UserService'
import EnumService from 'services/EnumService'
import { Dialog, Toast } from 'quasar-framework'

export default {
  data() {
    return {
      VehicleEnum: null,
      vehicles: [],
      config: {
        rowHeight: '50px',
        title: this.$t('side_menu.about_vehicles'),
        selection: 'single'
      },
      columns: [
        { label: 'Type', field: 'type' },
        { label: 'Model', field: 'model' },
        { label: 'Registration number', field: 'registrationNumber' },
        { label: 'Color', field: 'color' }
      ]
    }
  },
  methods: {
    /**
     * Refreshs the data table.
     */
    refresh() {
      UserService.getVehicles(this.$store.getters.currentUser._id).then(response => {
        this.vehicles = response.data.vehicles
      })
    },

    /**
     * Deletes the user vehicles.
     */
    deleteVehicle(vehicleId) {
      UserService.deleteVehicle(this.$store.getters.currentUser._id, vehicleId).then(response => {
        this.refresh()
        Toast.create.negative(this.$t('general.delete'))
      })
    },

    /**
     * Edits the user vehicles.
     */
    editVehicle(data) {
      this.addVehicle(data, this.$t('general.edit'))
    },

    /**
     * Add vehicle to the database.
     */
    addVehicle(vehicle, action) {
      let VehicleEnumArray = Object.keys(this.VehicleEnum).map(item => this.VehicleEnum[item])
      let vm = this
      Dialog.create({
        title: action + ' ' + this.$t('vehicle.vehicle'),
        form: {
          type: {
            type: 'radio',
            model: vehicle.type,
            items: VehicleEnumArray
          },
          model: {
            type: 'text',
            label: this.$t('vehicle.model'),
            model: vehicle.model
          },
          registrationNumber: {
            type: 'text',
            label: this.$t('vehicle.registrationNumber'),
            model: vehicle.registrationNumber
          },
          color: {
            type: 'text',
            label: this.$t('vehicle.color'),
            model: vehicle.color
          }
        },
        buttons: [
          this.$t('general.cancel'),
          {
            label: action,
            handler(data) {
              if (vehicle === '') {
                UserService.addVehicle(vm.$store.getters.currentUser._id, data).then(() => {
                  vm.refresh()
                  Toast.create.positive(action)
                })
              } else {
                UserService.setVehicle(vm.$store.getters.currentUser._id, vehicle._id, data).then(() => {
                  vm.refresh()
                  Toast.create.positive(vm.$t('general.updated'))
                })
              }
            }
          }
        ]
      })
    }
  },
  created() {
    EnumService.getById('vehicle').then(response => (this.VehicleEnum = response.data.enum))
    this.refresh()
  }
}
</script>
