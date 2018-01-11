/**
 * @module Bus
 */
import Vue from 'vue'

/**
 * Vue instance which emits and listen to events.
 */
const Bus = new Vue()

/**
 * Holder for all the application events.
 */
const BusEvent = {

}

export {
  Bus,
  BusEvent
}
