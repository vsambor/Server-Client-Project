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
    StatsService.getAccidentStatsBySeverity().then(response => {
      let resData = response.data
      this.mydata = {
        labels: [
          this.$t('accident.severity.minor'),
          this.$t('accident.severity.moderate'),
          this.$t('accident.severity.serious'),
          this.$t('accident.severity.xserious')
        ],
        datasets: [
          {
            data: [resData.minor, resData.moderate, resData.serious, resData.extremlySerious],
            backgroundColor: ['#8215C8', '#DC143C', '#00008B', '#008B8B']
          }
        ]
      }
    })
  }
}
</script>