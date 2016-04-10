import { V } from 'jointjs'
import { getLinkValue } from './linkConnections'
import { setBaseTransition, getBaseTransition, getTimeTransition } from './transitions'

const dottedLink = '2,5'

export default function fireTransition(graph, paper, transitions, callback) {
  let finishDelay = []
  let firableTransition = getFirableTransitionsCount(graph, paper, transitions)
  _.each(transitions, (transition) => {
    fireTransitionOnce(graph, paper, transition, getTimeTransition(transition), (name) => {
      if(firableTransition === finishDelay.length) {
        callback()
      }
      finishDelay.push(name)
      finishDelay = _.uniq(finishDelay)
    })
  })
}

function fireTransitionOnce(graph, paper, transition, sec, callback) {
  let inbound = graph.getConnectedLinks(transition, { inbound: true })
  let outbound = graph.getConnectedLinks(transition, { outbound: true })

  let placesBefore = _.map(inbound, (link) => {
      return graph.getCell(link.get('source').id)
  })

  let placesAfter = _.map(outbound, (link) => {
      return graph.getCell(link.get('target').id)
  })

  let isFirable = true
  _.each(placesBefore, (model) => {
    if(model.get('tokens') === 0) {
      isFirable = false
    }
  })

  if (isFirable) {
    _.each(placesBefore, (pinnacleModel) => {
      let linked = _.find(inbound, (link) => {
        return link.get('source').id === pinnacleModel.id
      })

      if(linked.attr('.connection/stroke-dasharray') !== dottedLink) {
        if(pinnacleModel.get('tokens') >= getLinkValue(linked)) {
          setBaseTransition(transition, getBaseTransition(transition) + (inbound.length) ? 1 : 0)
          paper.findViewByModel(linked).sendToken(V('circle', { r: 5, fill: '#feb662' }).node, sec * 1000)

          _.defer(() => {
            let minusValue = (getLinkValue(linked) > 100) ? getLinkValue(linked) : 1

            // This code shoud be refactored
            switch(transition.attr('.label/text')) {
              case 'T5':
              case 'T4':
                minusValue = 0
                break;
              default:
                getLinkValue(linked)
                break;
            }
            pinnacleModel.set('tokens', pinnacleModel.get('tokens') - minusValue)
          })
        }
      }
    })

    _.each(placesAfter, (pinnacleModel) => {
      let linked = _.find(outbound, (link) => {
        return link.get('target').id === pinnacleModel.id
      })

      if(getBaseTransition(transition) > 0) {
        paper.findViewByModel(linked).sendToken(V('circle', { r: 5, fill: '#feb662' }).node, sec * 1000, () => {
          pinnacleModel.set('tokens', pinnacleModel.get('tokens') + getLinkValue(linked))
          setBaseTransition(transition, (getBaseTransition(transition) === 0) ? 0 : getBaseTransition(transition) - 1)
          callback(transition.attr('.label/text'))
        })
      } else {
        callback(transition.attr('.label/text'))
      }
    })

    // This code shoud be refactored
    placesBefore.reduce((previous, current) => {
      let linked = _.find(inbound, (link) => {
        return link.get('source').id === current.id
      })
      // console.log(transition.attr('.label/text'),
      //             previous.attr('.label/text'),
      //             current.attr('.label/text'),
      //             previous.get('tokens'),
      //             current.get('tokens'),
      //             linked.attr('.connection/stroke-dasharray'))
      if(previous.get('tokens') < current.get('tokens') && linked.attr('.connection/stroke-dasharray') !== dottedLink) {
        // console.log(previous.attr('.label/text'))
        let newLinkValue = previous.get('tokens')
        previous.set('tokens', 1)
        current.set('tokens', current.get('tokens') - previous.get('tokens'))

        _.each(placesAfter, (pinnacleModel) => {
          pinnacleModel.set('tokens', pinnacleModel.get('tokens') + newLinkValue)
        })
      }
    })

  }
}

function getFirableTransitionsCount(graph, paper, transitions) {
  let firableCount = 0
  _.each(transitions, (transition) => {
    let inbound = graph.getConnectedLinks(transition, { inbound: true })

    let placesBefore = _.map(inbound, (link) => {
        return graph.getCell(link.get('source').id)
    })

    let isFirable = true
    _.each(placesBefore, (model) => {
      if(model.get('tokens') === 0) {
        isFirable = false
      }
    })

    if (isFirable) {
      firableCount += 1
    }
  })
  return firableCount
}