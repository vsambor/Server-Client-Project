<template>
    <div class="row">
        <div class="col-md-6">
            <severity-chart/>
            <collision-by-kind-vehicule/>
        </div>
        <div class="col-md-6">
            <collision-or-not-chart/><br/>
            <collision-vehicule-or-not-chart/>
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
<style scoped>

</style>
