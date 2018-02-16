<template>
  <pie-handler :width="300" :height="200" v-if="mydata" :chart-data="mydata" />
</template>

<script>
import StatsService from '../../../services/StatsService'
import PieHandler from '../../common/chart/PieHandler'
export default {
  components: { PieHandler },
  data: () => ({
    mydata: null
  }),
  async created() {
    StatsService.getAccidentStatsByCollisionOrNot().then(
      response =>
        (this.mydata = {
          labels: ['Accidents with collision', 'Accidents without collision'],
          datasets: [
            {
              label: 'Accidents Stats By Collision or not',
              data: [
                response.data.withCollision,
                response.data.withoutCollision
              ],
              backgroundColor: ['#DEB887', '#A52A2A']
            }
          ]
        })
    )
  }
}
</script>