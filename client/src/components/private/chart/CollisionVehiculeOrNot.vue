<template>
  <pie-handler :width="300" :height="200" v-if="mydata" :chart-data="mydata" />
</template>

<script>
import StatsService from 'services/StatsService'
import PieHandler from 'common/chart/PieHandler'
export default {
  components: { PieHandler },
  data: () => ({
    mydata: null
  }),
  async created() {
    StatsService.getAccidentCollisionVehiculesOrNot().then(
      response =>
        (this.mydata = {
          labels: [
            'Accidents with collision with vehicules',
            'Accidents with other vehicules'
          ],
          datasets: [
            {
              label: 'Accidents with vehicles or not',
              data: [
                response.data.vehiculeCollision,
                response.data.otherCollision
              ],
              backgroundColor: ['#6495ED', '#FFF8DC']
            }
          ]
        })
    )
  }
}
</script>