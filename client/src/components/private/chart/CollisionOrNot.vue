<template>
  <pie-handler :width="300" :height="200" v-if="mydata" :chart-data="mydata" />
</template>

<script>
import StatsService from '../../../services/StatsService'
import PieHandler from '../../common/chart/PieHandler'

export default {
  components: { PieHandler },
  data() {
    return {
      mydata: null
    }
  },
  created() {
    StatsService.getAccidentStatsByCollisionOrNot().then(response => {
      this.mydata = {
        labels: [this.$t('stats.accidents_collision'), this.$t('stats.accidents_no_collision')],
        datasets: [
          {
            data: [response.data.withCollision, response.data.withoutCollision],
            backgroundColor: ['#DEB887', '#A52A2A']
          }
        ]
      }
    })
  }
}
</script>