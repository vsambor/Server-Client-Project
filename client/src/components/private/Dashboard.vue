<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h5 class="text-center">{{$t('stats.title1')}}</h5>
        <severity-chart/>
      </div>
      <div class="col-md-6">
        <h5 class="text-center">{{$t('stats.title2')}}</h5>
        <collision-by-kind-vehicule/>
      </div>
    </div>

    <div class="row mt-40">
      <div class="col-md-6">
        <h5 class="text-center">{{$t('stats.title3')}}</h5>
        <collision-or-not-chart/><br/>
      </div>
      <div class="col-md-6">
        <h5 class="text-center">{{$t( 'stats.title4')}}</h5>
        <collision-vehicule-or-not-chart/>
      </div>
    </div>
  </div>
</template>

<script>
import SeverityChart from './chart/Severity'
import CollisionOrNotChart from './chart/CollisionOrNot'
import CollisionVehiculeOrNotChart from './chart/CollisionVehiculeOrNot'
import CollisionByKindVehicule from './chart/CollisionByKindVehicule'

export default {
  components: {
    SeverityChart,
    CollisionOrNotChart,
    CollisionVehiculeOrNotChart,
    CollisionByKindVehicule
  }
}
</script>
