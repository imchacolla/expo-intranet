// import { SvgChart, SVGRenderer } from 'wrn-echarts';
import SvgChart, { SVGRenderer } from 'wrn-echarts/svgChart';
import * as echarts from 'echarts/core';
import { useRef, useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';
import _, { parseInt } from 'lodash';
import { GaugeChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import {
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_COLOR,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK_LIGHT,
  PRIMARY_TEXT_DARK_LIGHT,
  PRIMARY_TEXT_LIGHT,
  PRIMARY_TEXT_DARK,
  PALETTE,
} from '../utils/constants';
// register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  // ...
  //BarChart,
  // LineChart,
  GaugeChart,
]);

const E_HEIGHT = 220;
const E_WIDTH = Dimensions.get('screen').width;

// initial
function SvgComponent({ option }) {
  const svgRef = useRef(null);

  useEffect(() => {
    let chart;
    if (svgRef.current) {
      // @ts-ignore
      chart = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SvgChart ref={svgRef} />;
}

// Component usage
export default function App({ data, isDarkMode }) {
  const cMes = parseInt(data[0].cumplimiento);
  const cAcumulado = parseInt(data[1].cumplimiento);
  const cGestion = parseInt(data[2].cumplimiento);
  console.log(data);
  const COLORS = [data[0].color, data[1].color, data[2].color];
  const gaugeData = [
    {
      value: cGestion,
      name: 'Año',
      title: {
        offsetCenter: ['-90%', '-90%'],
        fontSize: 11,
        color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['-30%', '-90%'],
      },
    },
    {
      value: cAcumulado,
      name: 'Acumulado',
      title: {
        offsetCenter: ['-90%', '-70%'],
        fontSize: 11,
        color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['-30%', '-70%'],
      },
    },
    {
      value: cMes,
      name: 'Mes',
      title: {
        offsetCenter: ['-90%', '-50%'],
        fontSize: 11,
        color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['-30%', '-50%'],
      },
    },
  ];
  const option = {
    title: {
      show: false,
      text: 'Cumplimiento',
      color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
      padding: [0, 0, 5, 10],
    },
    series: [
      {
        backgroundColor: isDarkMode
          ? BACKGROUND_PRIMARY_DARK
          : BACKGROUND_LIGHT,
        type: 'gauge',
        startAngle: 90,
        endAngle: -180,
        radius: '80%',
        pointer: {
          show: false,
        },
        title: {
          show: true,
        },
        max: 120,
        color: COLORS,
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: isDarkMode ? '#323235' : BACKGROUND_LIGHT,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 55,
            color: [[1, isDarkMode ? '#323235' : '#E7E7E7']],
          },
        },
        splitNumber: 10,
        splitLine: {
          show: false,
          distance: 10,
          length: 15,
        },
        axisTick: {
          show: false,

          /*  splitNumber: 1,
          distance: -50, */
        },
        axisLabel: {
          show: true,
          distance: -39,
          fontSize: 8,
          color: '#505050',
        },
        data: gaugeData,
        title: {
          fontSize: 12,
        },
        detail: {
          shadowBlur: 5,
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'inherit',
          //padding: 2,
          //borderColor: 'inherit',
          borderRadius: 20,
          // borderWidth: 1,
          formatter: '{value}%',
        },
      },
    ],
  };

  // const optiosn = {
  //   background: isDarkMode ? BACKGROUND_PRIMARY_LIGHT : BACKGROUND_LIGHT,
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'shadow',
  //     },
  //   },
  //   grid: {
  //     left: '0%',
  //     top: '5%',
  //     right: '1%',
  //     bottom: '15%',
  //   },

  //   title: {},
  //   /* grid: {
  //     left: '40%',
  //     right: '4%',
  //     bottom: '3%',
  //     //containLabel: true,
  //   }, */
  //   //colors: PALETTE,
  //   xAxis: {
  //     type: 'category',
  //     data: labels,

  //     //axisLabel: {interval: 0, rotate: 30},
  //   },

  //   animationEasing: 'quarticIn',
  //   animationDuration: 1000,
  //   yAxis: {
  //     type: 'value',
  //     splitLine: {
  //       show: false,
  //     },

  //     //axisLabel: { interval: 0, rotate: 30 },
  //   },
  //   tooltip: {
  //     backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
  //     textStyle: {
  //       fontSize: 12,
  //     },
  //     padding: 3,
  //   },
  //   resposive: true,
  //   series: [
  //     {
  //       type: 'bar',
  //       //showBackground: true,
  //       backgroundStyle: {
  //         color: 'rgba(180, 180, 180, 0.2)',
  //       },
  //       label: {
  //         show: mes > 0 ? false : true,
  //         //rotate: year > 0 ? '90' : '0',
  //         rotate: '90',
  //         formatter: value => `${_.round(value.value / 1000000, 1)}M`,
  //       },
  //       itemStyle: {
  //         color: color,
  //         /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //           {offset: 0, color: '#83B3F6'},
  //           {offset: 0.5, color: '#188FF0'},
  //           {offset: 1, color: PRIMARY_COLOR},
  //         ]), */
  //       },
  //       /*
  //       areaStyle: {
  //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //           {
  //             offset: 0,
  //             color: 'rgb(255, 158, 68)',
  //           },
  //           {
  //             offset: 1,
  //             color: PRIMARY_COLOR,
  //           },
  //         ]),
  //       }, */
  //       data,
  //     },
  //   ],
  // };
  //return useMemo(() => SvgComponent(option), [data]);
  return <SvgComponent option={option} />;
}
