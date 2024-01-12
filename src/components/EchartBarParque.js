// import { SvgChart, SVGRenderer } from 'wrn-echarts';
import SvgChart, { SVGRenderer } from 'wrn-echarts/svgChart'
import * as echarts from 'echarts/core'
import { useRef, useEffect } from 'react'
import { Dimensions } from 'react-native'
import _ from 'lodash'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  ToolboxComponent,
  MarkPointComponent,
  MarkLineComponent,
  AxisPointerComponent,
} from 'echarts/components'
import {
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  PRIMARY_COLOR,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
} from '../utils/constants'
// register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  ToolboxComponent,
  MarkPointComponent,
  MarkLineComponent,
  AxisPointerComponent,

  // ...
  BarChart,
  LineChart,
])

const E_HEIGHT = 200
const E_WIDTH = Dimensions.get('screen').width - 10

// initial
function SvgComponent({ option }) {
  const svgRef = useRef(null)

  useEffect(() => {
    let chart
    if (svgRef.current) {
      // @ts-ignore
      chart = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      })
      chart.setOption(option)
    }
    return () => chart?.dispose()
  }, [option])

  return <SvgChart ref={svgRef} />
}

// Component usage
export default function App({
  data,
  isDarkMode,
  color,
  colorChart,
  colorLabel,
  borderColor = PRIMARY_COLOR,
}) {
  const labels = _.map(data, function (d) {
    return d.gestion
  })
  const colors = _.map(data, function (d) {
    return d.color
  })
  const suma = _.sumBy(data, function (s) {
    return s.value
  })

  const areaStyle = {
    // opacity: 0.9,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: color,
      },
      {
        offset: 1,
        color: colorChart,
      },
    ]),
  }
  const option = {
    background: isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_LIGHT,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },

    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          show: false,
        },
        magicType: {
          type: ['line', 'bar'],
        },
        saveAsImage: {
          show: false,
        },
        dataView: {
          show: false,
        },
        tooltip: {
          // same as option.tooltip
          show: false,
        },
      },
      iconStyle: {
        borderColor: borderColor,
      },
      itemSize: 24,
    },
    grid: {
      left: '4%',
      top: '25%',
      right: '5%',
      bottom: '24%',
    },

    title: {
      show: false,
      text: '',
    },
    /* grid: {
      left: '40%',
      right: '4%',
      bottom: '3%',
      //containLabel: true,
    }, */
    //colors: PALETTE,
    xAxis: {
      show: true,
      type: 'category',
      data: labels,
      axisPointer: {
        value: '06:00',
        snap: true,
        type: 'line',
        label: {
          show: true,
          // formatter: function (params) {
          //   return echarts.format.formatTime('yyyy-MM-dd', params.value);
          // }
        },
        // handle: {
        //   show: true,
        //   //icon: 'path://M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12h12V12C24,5.383,18.617,0,12,0Zm-1.706,15.291l-1.414,1.414-3.298-3.298c-.775-.775-.775-2.037,0-2.812l3.298-3.298,1.414,1.414-3.298,3.298,3.298,3.283Zm8.124-1.884l-3.298,3.298-1.414-1.414,3.298-3.298-3.298-3.283,1.414-1.414,3.298,3.298c.775,.775,.775,2.037,0,2.812Z',
        //   margin: 40,
        //   color: '#999',
        //   size: 25,
        // },
      },
      //axisLabel: {interval: 0, rotate: 30},
    },

    animationEasing: 'quarticIn',
    animationDuration: 800,
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      data: [{ value: 'value' }],
      axisLabel: { interval: 0, rotate: 30, show: false },
    },
    tooltip: {
      backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      textStyle: {
        fontSize: 12,
      },
      padding: 3,
    },
    resposive: true,
    series: [
      {
        type: 'bar',
        //showBackground: true,
        backgroundStyle: {
          color: 'rgba(46, 37, 96, 0.2)',
        },
        //smooth: true,
        label: {
          show: true,
          //rotate: year > 0 ? '90' : '0',
          //rotate: '90',
          formatter: (value) => `${_.round(value.value / 1000, 1)}k`,
          position: 'inside',
          //color: colorLabel,
          color: colorLabel,
          fontSize: 10,
        },
        sampling: 'average',
        itemStyle: {
          color: color,
          /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#83B3F6'},
            {offset: 0.5, color: '#188FF0'},
            {offset: 1, color: PRIMARY_COLOR},
          ]), */
        },
        // emphasis: {
        //   focus: 'Pasajeros',
        // },
        areaStyle: areaStyle,
        markPoint: {
          label: {
            formatter: (value) => `${_.round(value.value / 1000, 1)}`,
          },
          data: [
            {
              type: 'max',
              name: 'Max',
            },
            // {
            //   type: "min",
            //   name: "Min"
            // }
          ],
        },
        // markLine: {
        //   data: [
        //     {
        //       type: 'average',
        //       name: 'Avg',
        //     },
        //   ],
        //   label: {
        //     formatter: (value) => `${_.round(value.value / 1000, 1)}K`,
        //     backgroundColor: '#666',
        //     //backgroundColor: color,
        //     //color: colorLabel,
        //     color: 'white',
        //     padding: 5,
        //     position: 'insideEndTop',
        //   },
        // },
        data,
      },
    ],
  }
  //return useMemo(() => SvgComponent(option), [data]);
  return <SvgComponent option={option} />
}
