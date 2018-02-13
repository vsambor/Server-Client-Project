/**
 * Keeps all the entity structures as they are in the database.
 *
 * When linking an entity model to the vue template, it needs the structure, otherwise it crashes.
 * So, those entities are used in order to avoid defining the needed structure in each component.
 */

exports.UserEntity = {
  _id: '',
  title: '',
  body: '',
  date: '',
  isRead: ''
}

exports.NotificationEntity = {

}
