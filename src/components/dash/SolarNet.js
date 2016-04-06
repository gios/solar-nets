import React, { Component } from 'react'
import joint, { V } from 'jointjs'

class SolarNet extends Component {

  componentDidMount() {
    let graph = new joint.dia.Graph()
    let paper = new joint.dia.Paper({
      el: $('#solar-petri-net'),
      width: 1200,
      height: 650,
      gridSize: 10,
      perpendicularLinks: true,
      model: graph
    })

    let pn = joint.shapes.pn

    // Rendering pinnacles

    let pinnacleConsumer = new pn.Place({
      position: {
        x: 140,
        y: 50
      },
      attrs: {
        '.label': {
          text: 'Consumer',
          fill: '#7c68fc'
        },
        '.root' : {
          stroke: '#9586fd',
          'stroke-width': 3
        },
        '.tokens > circle': {
          fill : '#7a7e9b'
        }
      },
      tokens: 1
    })

    let pinnacleNeeds = pinnacleConsumer.clone().attr({
      '.label': { text: 'Needs' }
    })
    .position(140, 260)
    .set('tokens', 0)

    // Link function for binding pinnacles and transitions

    function linkWithLabel(connectFirst, connectSecond) {
      return new pn.Link({
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
            '.marker-source': {
              fill: '#4b4a67',
              stroke: '#4b4a67',
              d: 'M 10 0 L 0 5 L 10 10 z'
            },
            '.marker-target': {
              fill: '#4b4a67',
              stroke: '#4b4a67',
              d: 'M 10 0 L 0 5 L 10 10 z'
            }
          }
        },
        labels: [{
          position: 0.5,
          attrs: {
            text: {
              text: 'label'
            }
          }
        }]
      })
    }

    function link(connectFirst, connectSecond) {
      return new pn.Link({
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
            'stroke': '#4b4a67'
          }
        }
      })
    }

    // Rendring transitions

    let transitionT3 = new pn.Transition({
      position: {
        x: 50,
        y: 160
      },
      attrs: {
        '.label': {
          text: 'T3',
          fill: '#fe854f'
        },
        '.root' : {
          fill: '#9586fd',
          stroke: '#9586fd'
        }
      }
    })

    graph.addCell([pinnacleConsumer, pinnacleNeeds, transitionT3])
    graph.addCell([
      link(pinnacleConsumer, transitionT3),
      link(transitionT3, pinnacleNeeds)
    ])
  }

  render() {
    return (
      <div className='col-md-12'>
        <div id='solar-petri-net'></div>
      </div>
    )
  }
}

export default SolarNet