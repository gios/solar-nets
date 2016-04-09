import joint from 'jointjs'

let pn = joint.shapes.pn

// Rendring transitions

export let transitionT3 = new pn.Transition({
  position: {
    x: 400,
    y: 50
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

export let transitionT5 = transitionT3.clone().attr({
  '.label': {
    text: 'T5'
  }
}).position(800, 50)

export let transitionT1 = transitionT3.clone().attr({
  '.label': {
    text: 'T1'
  }
}).position(350, 150)

export let transitionT2 = transitionT3.clone().attr({
  '.label': {
    text: 'T2'
  }
}).position(300, 250)

export let transitionT4 = transitionT3.clone().attr({
  '.label': {
    text: 'T4'
  }
}).position(700, 250)

export let transitionT7 = transitionT3.clone().attr({
  '.label': {
    text: 'T7'
  }
}).position(350, 350)

export let transitionT8 = transitionT3.clone().attr({
  '.label': {
    text: 'T8'
  }
}).position(350, 550)

export let transitionT6 = transitionT3.clone().attr({
  '.label': {
    text: 'T6'
  }
}).position(180, 450)