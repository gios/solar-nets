export const CHART_LEGEND = 'CHART_LEGEND'
export const CHART_INTERVAL = 'CHART_INTERVAL'
export const CHART_PROPORTION = 'CHART_PROPORTION'

export function onChartLegend(legendHtml) {
  return {
    type: CHART_LEGEND,
    legendHtml
  }
}

export function onChartInterval(startInterval, endInterval) {
  return {
    type: CHART_INTERVAL,
    startInterval,
    endInterval
  }
}

export function onChartProportion(chartWidth, chartHeight) {
  return {
    type: CHART_PROPORTION,
    chartWidth,
    chartHeight
  }
}