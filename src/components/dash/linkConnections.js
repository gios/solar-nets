import joint from 'jointjs'

// Link function for binding pinnacles and transitions

let pn = joint.shapes.pn

let defaultLinkOptions = {
  label: '',
  dotted: false
}

export default function link(connectFirst, connectSecond, options = defaultLinkOptions) {
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