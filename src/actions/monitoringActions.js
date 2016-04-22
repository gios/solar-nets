export const CHART_LEGEND = 'CHART_LEGEND'

export function onChartLegend(legendHtml) {
  return {
    type: CHART_LEGEND,
    legendHtml
  }
}