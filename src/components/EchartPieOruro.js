// import { SvgChart, SVGRenderer } from 'wrn-echarts';
import SvgChart, { SVGRenderer } from 'wrn-echarts/svgChart'
import * as echarts from 'echarts/core'
import { useRef, useEffect } from 'react'
import { BarChart, PieChart } from 'echarts/charts'
import { Dimensions } from 'react-native'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  PRIMARY_TEXT_DARK_LIGHT,
  PRIMARY_TEXT_LIGHT,
  PRIMARY_TEXT_DARK,
  BACKGROUND_PRIMARY_LIGHT,
} from '../utils/constants'
// register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  SVGRenderer,
  // ...
  PieChart,
])

const E_HEIGHT = 200
const E_WIDTH = Dimensions.get('screen').width
const PALETTE = [
  '#68B7DB',
  '#6692DC',
  '#6770DD',
  '#8067DC',
  '#A367DC',
  '#C667DC',
  '#DC67CE',
]

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
export default function App({ data, isDarkMode, palette }) {
  console.log('palette', palette)
  const option = {
    title: {
      show: false,
      text: 'Pasajeros tipo',
      color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
      padding: [0, 2, 5, 15],
    },
    // backgroundColor: isDarkMode
    //   ? BACKGROUND_PRIMARY_DARK
    //   : BACKGROUND_PRIMARY_LIGHT,
    legend: {
      top: '8%',
      //left: '2%',
      right: '6%',
      orient: 'vertical',

      textStyle: {
        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : '#333',
        borderCap: 'round',
        fontSize: 14,
      },
    },
    tooltip: {
      show: false,
      backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_LIGHT,
      textStyle: {
        fontSize: 12,
      },
      padding: 3,
      //formatter: '{c}',
      // trigger: "item",
    },
    color: palette != undefined ? palette : PALETTE,
    series: [
      {
        // type: 'pie',
        // radius: [50, 250],
        // center: ['50%', '50%'],
        // roseType: 'area',
        // itemStyle: {
        //   borderRadius: 8,
        // },
        name: '',
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        //left: '29%',
        right: '29%',
        label: {
          show: false,
          position: 'center',
          formatter(param) {
            return param.percent + '%'
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 24,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data,
      },
    ],
  }
  return <SvgComponent option={option} />
}
