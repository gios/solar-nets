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