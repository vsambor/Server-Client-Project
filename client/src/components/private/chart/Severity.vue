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
    StatsService.getAccidentStatsBySeverity().then(
      response =>
        (this.mydata = {
          labels: ['Minor', 'Moderate', 'Serious', 'Extremly Serious'],
          datasets: [
            {
              label: 'Accidents Stats By Severity',
              data: [
                response.data.minor,
                response.data.moderate,
                response.data.serious,
                response.data.extremlySerious
              ],
              backgroundColor: ['#8215C8', '#DC143C', '#00008B', '#008B8B']
            }
          ]
        })
    )
  }
}
</script>