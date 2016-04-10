import { V } from 'jointjs'
import { getLinkValue } from './linkConnections'
import { setBaseTransition, getBaseTransition, getTimeTransition } from './transitions'

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
    // setBaseTransition(transition, getBaseTransition(transition) + (inbound.length) ? 1 : 0)
    _.each(placesBefore, (pinnacleModel) => {
      let linked = _.find(inbound, (link) => {
        return link.get('source').id === pinnacleModel.id
      })
      paper.findViewByModel(linked).sendToken(V('circle', { r: 5, fill: '#feb662' }).node, sec * 1000)

      _.defer(() => {
        pinnacleModel.set('tokens', pinnacleModel.get('tokens') - getLinkValue(linked))
      })
    })

    _.each(placesAfter, (pinnacleModel) => {
      let linked = _.find(outbound, (link) => {
        return link.get('target').id === pinnacleModel.id
      })
      paper.findViewByModel(linked).sendToken(V('circle', { r: 5, fill: '#feb662' }).node, sec * 1000, () => {
        pinnacleModel.set('tokens', pinnacleModel.get('tokens') + getLinkValue(linked))
        callback(transition.attr('.label/text'))
      })
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