import { V } from 'jointjs'
import { getLinkValue } from './linkConnections'

export default function fireTransition(graph, paper, transition, sec) {
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
      })
    })
  }
}