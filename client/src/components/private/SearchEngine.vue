<template>
  <div>
    <h4>{{$t('general.search_engine')}}</h4>
    <div class="row">
      <div class="col-6">

        <!-- Search Subject -->
        <q-field icon="search">
          <q-input type="text" v-model="subject" name="subject" :placeholder="$t('search_engine.subject_placeholder')" @keyup.enter="onSearch" />
        </q-field>

        <!-- Search Property -->
        <q-field icon="search">
          <q-input type="text" v-model="property" name="property" :placeholder="$t('search_engine.property_placeholder')" @keyup.enter="onSearch" />
        </q-field>

        <!-- Property Value -->
        <q-field icon="search">
          <q-input type="text" v-model="propertyValue" name="property_value" :placeholder="$t('search_engine.property_value_placeholder')" @keyup.enter="onSearch" />
        </q-field>

        <!-- Search Conditions -->
        <q-field icon="fa-question">
          <q-input type="text" v-model="conditions" name="conditions" :placeholder="$t('search_engine.condition_placeholder')" @keyup.enter="onSearch" />
        </q-field>
      </div>

    </div>

    <!-- Search Button -->
    <div class="row mt-20">
      <div class="col-3">
        <q-btn @click="onSearch" icon-right="search" :color="$store.getters.currentTheme" class="full-width">{{$t('general.search')}}</q-btn>
      </div>
    </div>

    <!-- Engine Response -->
    <div class="floating-label mt-40">
      <textarea id="response-area" required class="full-width" v-model="engineResponse"></textarea>
      <label>{{$t('general.result')}}</label>
    </div>
  </div>
</template>

<script>
import EngineService from 'services/EngineService'

export default {
  data() {
    return {
      subject: '',
      property: '',
      propertyValue: '',
      conditions: '',
      engineResponse: ''
    }
  },
  methods: {
    /**
     * Handles the search button.
     * Triggers the semantic search engine and retrieve the response.
     */
    onSearch() {
      EngineService.search(this.generateQuery()).then(
        response =>
          (this.engineResponse = JSON.stringify(response.data, null, 2))
      )
    },

    /**
     * Generates the query string starting from raw conditions.
     * Ex: condition= >10; <5;  => query=?y > 10 && ?y < 5
     *
     * @return {String} - the query which contains the subject and conditions.
     */
    generateQuery() {
      let query = {
        subject: this.subject,
        property: this.property,
        propertyValue: this.propertyValue,
        conditions: ''
      }
      let queryConditions = this.conditions
        .split(';')
        .map(el => '?' + this.propertyValue + el.replace(/\s/g, ''))
        .join(' && ')

      query.conditions = queryConditions
      return query
    }
  }
}
</script>

<style>
#response-area {
  height: 400px;
}
</style>
