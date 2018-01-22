/**
 * Mixin utility for form components.
 *
 * This component does 2 things:
 *  1. on submit it validate before so the form it self does not have to care about validation.
 *  2. on reset it clears the erros and then calls the reset function from the component.
 */
export default {
  methods: {
    /**
     * Validates the form and calls submit if there is no error.
     */
    validateAndSubmit() {
      this.$validator.validateAll().then(isValid => {
        if (isValid && !this.errors.any()) {
          this.submitForm()
        }
      })
    },

    /**
     * Resets the form data from within the component and after clears the errors on next tick.
     */
    resetAndClearErrors() {
      if (this.resetForm) {
        this.resetForm()
      } else {
        this.defaultResetForm()
      }

      setTimeout(() => this.errors.clear(), 50)
    },

    /**
     * Applies a red star at the end of a label for the required fields.
     *
     * @param label {String} - a text to whom the star is attached.
     * @return {String} - the provided label + red star.
     */
    star(label) {
      return `${label} <span style="color:red; vertical-align: sub; font-size: 18px;">*</span>`
    },

    /**
     * Resets components data to initial state.
     *
     * When there is no <resetForm> method on attached to the component (exactly with this name), then this default reset is applied.
     * The component data object is initialized with the initial component data which is stored in $options.data.
     * The apply(this) is used to keep the context of data (usefull when data uses <this> keyword).
     */
    defaultResetForm() {
      Object.assign(this.$data, this.$options.data.apply(this))
    }
  }
}
