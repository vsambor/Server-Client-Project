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
    validateBeforeSubmit() {
      // this.$validator.validateAll().then(isValid => {
      //   if (isValid && !this.errors.any()) {
      //     this.submitForm();
      //   }
      // });
    },

    /**
     * Resets the form data from within the component and after clears the errors on next tick.
     */
    resetAndClearErrors() {
      // if (this.resetForm) {
      //   this.resetForm();
      // }
      // this.$nextTick(() => this.errors.clear());
    }
  }
}
