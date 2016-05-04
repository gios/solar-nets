import * as joint from "jointjs";

// Rendering pinnacles

const pn = joint.shapes.pn;

export let pinnacleConsumer = new pn.Place({
  position: {
    x: 200,
    y: 50
  },
  attrs: {
    ".label": {
      text: "Consumer",
      fill: "#7c68fc"
    },
    ".root" : {
      stroke: "#9586fd",
      "stroke-width": 3
    },
    ".tokens > circle": {
      fill : "#7a7e9b"
    }
  },
  tokens: 1
});

export let pinnacleNeeds = pinnacleConsumer.clone().attr({
  ".label": {
    text: "Needs"
  }
})
.position(600, 50)
.set("tokens", 0);

export let pinnacleConsumedSolarEnergy = pinnacleConsumer.clone().attr({
  ".label": {
    text: "Consumed Solar Energy SE"
  }
})
.position(950, 50)
.set("tokens", 0);

export let pinnacleSolarStation = pinnacleConsumer.clone().attr({
  ".label": {
    text: "Solar Station"
  }
})
.position(150, 150)
.set("tokens", 1);

export let pinnacleElectroStation = pinnacleConsumer.clone().attr({
  ".label": {
    text: "Electro Station"
  }
})
.position(100, 250)
.set("tokens", 1);

export let pinnacleElectroEnergy = pinnacleConsumer.clone().attr({
  ".label": {
    text: "Electro Energy"
  }
})
.position(500, 250)
.set("tokens", 0);

export let pinnacleConsumedElectroEnergy = pinnacleConsumer.clone().attr({
  ".label": {
    text: "Consumed Electro Energy EE"
  }
})
.position(900, 250)
.set("tokens", 0);

export let pinnacleSolarEnergy = pinnacleConsumer.clone().attr({
  ".label": {
    text: "Solar Energy"
  }
})
.position(550, 350)
.set("tokens", 0);

export let pinnacleSoldSolarEnergy = pinnacleConsumer.clone().attr({
  ".label": {
    text: "Sold Solar Energy SE"
  }
})
.position(500, 450)
.set("tokens", 0);

export let pinnacleP7 = pinnacleConsumer.clone().attr({
  ".label": {
    text: "P7"
  }
})
.position(450, 550)
.set("tokens", 0);

export let pinnacleP5 = pinnacleConsumer.clone().attr({
  ".label": {
    text: "P5"
  }
})
.position(250, 450)
.set("tokens", 0);

export let pinnacleSellingSolarEnergy = pinnacleConsumer.clone().attr({
  ".label": {
    text: "Selling Solar Energy SE"
  }
})
.position(60, 450)
.set("tokens", 1);