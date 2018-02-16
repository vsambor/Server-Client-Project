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
    let severity = 0
    if (data.fields.grav > 0.3 && data.fields.grav <= 10) {
      severity = 1
    } else if (data.fields.grav > 10 && data.fields.grav <= 23) {
      severity = 2
    } else if (data.fields.grav > 23 && data.fields.grav < 100) {
      severity = 3
    } else if (data.fields.grav >= 100 && data.fields.grav < 200) {
      severity = 4
    } else if (data.fields.grav >= 200) {
      severity = 5
    }
    let light = ['', 'Full day', 'Twilight or dawn', 'Night without public lighting', 'Night with public lighting not lit', 'Night with public lighting on']
    let organism = ['', 'Gendarmerie', 'Paris Police Prefecture', 'C.R.S', 'P.A.F', 'Public safety']
    let intersection = ['', 'Out of intersection', 'Intersection in X', 'Intersection in T', 'Intersection in Y', 'Intersection with more than 4 branches', 'Giratory', 'Place', 'Level crossing', 'Other intersection']
    let weather = ['', 'Normal', 'Light rain', 'Snow - hail', 'Fog - smoke', 'Strong wind - storm', 'Dazzling time', 'Overcast', 'Other']
    let crash = ['', 'Two vehicles - frontal', 'Two vehicles - from the rear', 'Two vehicles - by the side', 'Three vehicles and more - in chain', 'Three or more vehicles - multiple collisions 6 - Other collision', 'Without collision']
    let road = ['', 'Highway', 'National Road', 'Departmental Road', 'Communal Road', 'Off public network', 'Parking lot open to public traffic', 'other']
    let infrastructure = ['', 'Underground - tunnel', 'Bridge - autopont', 'Exchanger or connection strap', 'Railway', 'Carrefour arranged', 'Pedestrian area', 'Pay zone']
    let circulation = ['', 'One way', 'Bidirectional', 'Separate pavements', 'With variable assignment channels']
    let heightDifference = ['', 'Dish', 'Slope', 'Dimensional Summit', 'Bottom of coast']
    let shapeRoad = ['', 'Straight part', 'Curved on the left', 'Curved right', 'In S']
    let situationAccident = ['', 'On the road', 'On emergency tape', 'On the verge', 'On the sidewalk', 'On bike path']
    let specialWay = ['', 'Bike path', 'Bike lane', 'Reserved lane']

    if (data.fields.coord != null) {
      count++

      const accident = new AccidentModel({
        position: {
          type: 'Point',

          // Note: the order is Longitude, Latitude (Mongo requirements for geo queries).
          coordinates: [data.fields.coord[1], data.fields.coord[0]]
        },
        severity: severity,
        details: {
          dead: data.fields.ttue,
          seriouslyInjure: data.fields.tbg,
          lightlyInjurie: data.fields.tbl,
          unhurt: data.fields.tindm,
          light: light[data.fields.lum],
          organism: organism[data.fields.org],
          intersection: intersection[data.fields.int],
          weather: weather[data.fields.atm],
          crash: crash[data.fields.col],
          road: road[data.fields.catr],
          infrastructure: infrastructure[data.fields.infra],
          circulation: circulation[data.fields.circ],
          nWay: data.fields.nbv,
          specialWay: specialWay[data.fields.vosp],
          heightDifference: heightDifference[data.fields.prof],
          shapeRoad: shapeRoad[data.fields.plan],
          situationAccident: situationAccident[data.fields.situ]
        }
      })
      accident.save(accident).then(() => { }).catch(err => console.error(err))
    }
  }))
}
