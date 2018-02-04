const es = require('event-stream')
const request = require('request')
const JSONStream = require('JSONStream')
const argUtil = require('../util/argUtil')
const LIMIT = Number(argUtil.get('POPULATE_ACCIDENTS')) || 100
const AccidentModel = require('../../components/accident/model')
const url1 = 'https://public.opendatasoft.com/explore/dataset/accidents-corporels-de-la-circulation-en-france/download/?format=json&timezone=Europe/Berlin'

exports.populate = () => {
  console.log(`### START: Accidents population (limit: ${LIMIT})`)

  let count = 0
  let req = request({ url: url1 }).pipe(JSONStream.parse('*')).pipe(es.mapSync((data) => {
    // When the number of records reached the limit, destroys the stream and stops populating db.
    if (count === LIMIT) {
      req.destroy()
      console.log('### END: Accidents population')
      return
    }

    if (data.fields.coord != null) {
      count++
      const accident = new AccidentModel({
        position: {
          lat: data.fields.coord[0],
          lng: data.fields.coord[1]
        },
        severity: data.fields.grav
      })
      accident.save(accident).then(() => { }).catch(err => console.error(err))
    }
  }))
}
