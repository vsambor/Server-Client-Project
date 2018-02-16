<template>
  <bar-handler :options="{legend: false}" :width="300" :height="200" v-if="mydata" :chart-data="mydata" />
</template>

<script>
import StatsService from 'services/StatsService'
import BarHandler from 'common/chart/BarHandler'

export default {
  components: { BarHandler },
  data() {
    return {
      mydata: null
    }
  },
  created() {
    StatsService.getAccidentCollisionVehiculesKind().then(response => {
      let resData = response.data
      this.mydata = {
        labels: [
          this.$t('accident.number.three_more'),
          this.$t('accident.number.two_side'),
          this.$t('accident.number.two_back'),
          this.$t('accident.number.two_front')
        ],
        datasets: [
          {
            data: [resData.threeOrMore, resData.twoVehiculesByTheSide, resData.twoVehiculesByTheBack, resData.twoVehiculesFrontal],
            backgroundColor: ['#006400', '#E9967A', '#B22222', '#483D8B']
          }
        ]
      }
    })
  }
}
</script>
