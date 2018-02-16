<template>
  <bar-handler :width="300" :height="200" v-if="mydata" :chart-data="mydata" />
</template>

<script>
import StatsService from 'services/StatsService'
import BarHandler from 'common/chart/BarHandler'
export default {
  components: { BarHandler },
  data: () => ({
    mydata: null
  }),
  async created() {
    StatsService.getAccidentCollisionVehiculesKind().then(
      response =>
        (this.mydata = {
          labels: [
            'Three or more',
            'Two by side',
            'Two by back',
            'Two frontal'
          ],
          datasets: [
            {
              label: 'Accidents Stats By kind of vehicules collision',
              data: [
                response.data.threeOrMore,
                response.data.twoVehiculesByTheSide,
                response.data.twoVehiculesByTheBack,
                response.data.twoVehiculesFrontal
              ],
              backgroundColor: ['#006400', '#E9967A', '#B22222', '#483D8B']
            }
          ]
        })
    )
  }
}
</script>
