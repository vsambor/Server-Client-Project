<template>
  <pie-handler :width="300" :height="200" v-if="mydata" :chart-data="mydata" />
</template>

<script>
import StatsService from 'services/StatsService'
import PieHandler from 'common/chart/PieHandler'

export default {
  components: { PieHandler },
  data() {
    return {
      mydata: null
    }
  },
  created() {
    StatsService.getAccidentCollisionVehiculesOrNot().then(response => {
      this.mydata = {
        labels: [this.$t('stats.accidents_vehicles_colision'), this.$t('stats.accidents_other_vehicukes')],
        datasets: [
          {
            label: this.$t('stats.accidents_vehicles_not'),
            data: [response.data.vehiculeCollision, response.data.otherCollision],
            backgroundColor: ['#6495ED', '#FFF8DC']
          }
        ]
      }
    })
  }
}
</script>