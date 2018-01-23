<template>
  <q-btn flat ref="target">
    <q-icon name="language" />
    <q-popover ref="popover">
      <q-list class="q-list-link" style="min-width: 100px;">

        <!-- Loops through all defined languages. -->
        <q-item v-for="language in languages" :key="language" @click="onLanguageIconClick(language)">
          <q-item-main>
            <b v-if="$i18n.locale === language">{{language | uppercase}}</b>
            <span v-else>{{language | uppercase}}</span>
          </q-item-main>
        </q-item>
      </q-list>
    </q-popover>
  </q-btn>
</template>

<script>
import { Toast } from 'quasar-framework'
import { Validator } from 'vee-validate'

export default {
  data() {
    return {
      languages: Object.keys(this.$i18n.messages)
    }
  },
  /**
   * Filter is a vue component option(hook), used to change on the fly interpolated values.
   */
  filters: {
    uppercase: value => value.toUpperCase()
  },
  methods: {
    /**
     * Handles the action for language click.
     *
     * Changes the new language in the vue-i18n locale and closes the popup.
     */
    onLanguageIconClick(selectedLanguage) {
      const vm = this
      if (this.$i18n.locale !== selectedLanguage) {
        Toast.create({
          html:
            vm.$t('general.language_changed') +
            vm.$t('general.' + selectedLanguage),
          icon: 'language'
        })
        this.$i18n.locale = selectedLanguage
        Validator.localize(selectedLanguage)
      }

      this.$refs.popover.close()
    }
  }
}
</script>

