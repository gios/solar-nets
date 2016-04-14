import joint from 'jointjs'

// Link function for binding pinnacles and transitions

const pn = joint.shapes.pn

const defaultLinkOptions = {
  label: '',
  dotted: false
}

export function link(connectFirst, connectSecond, options = defaultLinkOptions) {
  options = Object.assign({}, defaultLinkOptions, options)
  let { label, dotted } = options
  let configLinkOptions = {
    source: {
      id: connectFirst.id,
      selector: '.root'
    },
    target: {
      id: connectSecond.id,
      selector: '.root'
    },
    attrs: {
      '.connection': {
        'fill': 'none',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        'stroke': '#4b4a67',
        'stroke-dasharray': (dotted) ? '2,5' : '0'
      }
    },
    labels: [{
      position: 0.5,
      attrs: {
        text: {
          text: `${label}`
        }
      }
    }]
  }

  return new pn.Link(configLinkOptions)
}

export function getLinkValue(link) {
  let linkValue = link.get('labels')[0].attrs.text.text
  return parseInt((linkValue) ? linkValue : 1)
}

function setLinkValue(link, value) {
  link.label(0, { attrs: { text: { text: value} } })
}

function getLinkByTransition(graph, transition) {
  let outbound = graph.getConnectedLinks(transition, { outbound: true })

  return _.map(outbound, (link) => {
    return getLinkValue(link)
  })
}

export function getConsumerValue(graph, customerTransition) {
  return _.last(getLinkByTransition(graph, customerTransition))
}

export function setConsumerValue(graph, customerTransition, value) {
  let outbound = graph.getConnectedLinks(customerTransition, { outbound: true })
  setLinkValue(_.last(outbound), value)
}

export function getSolarStationValue(graph, solarStationTransition) {
  return _.last(getLinkByTransition(graph, solarStationTransition))
}

export function setSolarStationValue(graph, solarStationTransition, value) {
  let outbound = graph.getConnectedLinks(solarStationTransition, { outbound: true })
  setLinkValue(_.last(outbound), value)
}

export function getElectroStationValue(graph, electroStationTransition) {
  return _.last(getLinkByTransition(graph, electroStationTransition))
}

export function setElectroStationValue(graph, electroStationTransition, value) {
  let outbound = graph.getConnectedLinks(electroStationTransition, { outbound: true })
  setLinkValue(_.last(outbound), value)
}