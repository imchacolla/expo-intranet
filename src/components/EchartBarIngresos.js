// import { SvgChart, SVGRenderer } from 'wrn-echarts';
import SvgChart, { SVGRenderer } from 'wrn-echarts/svgChart';
import * as echarts from 'echarts/core';
import { useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import _ from 'lodash';
import { BarChart, LineChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    ToolboxComponent,
} from 'echarts/components';
import {
    BACKGROUND_PRIMARY_DARK,
    BACKGROUND_DARK,
    BACKGROUND_LIGHT,
    PRIMARY_COLOR,
    BACKGROUND_PRIMARY_LIGHT,
    PRIMARY_TEXT_DARK,
    PRIMARY_TEXT_LIGHT,
} from '../utils/constants';
// register extensions
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    SVGRenderer,
    ToolboxComponent,
    // ...
    BarChart,
    LineChart,
]);

const E_HEIGHT = 200;
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
export default function App({
    data,
    isDarkMode,
    color,
    colorChart,
    colorLabel = 'red',

}) {
    const labels = _.map(data, function (d) {
        return d.gestion;
    });


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
    };
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
                borderColor: PRIMARY_COLOR,
            },
        },
        grid: {
            left: '5%',
            top: '10%',
            right: '4%',
            bottom: '10%',
        },

        title: {
            show: false,
            text: "Año: ",

        },
        /* grid: {
          left: '40%',
          right: '4%',
          bottom: '3%',
          //containLabel: true,
        }, */
        //colors: PALETTE,
        xAxis: {
            type: 'category',
            data: labels,
            //axisLabel: {interval: 0, rotate: 30},
        },

        animationEasing: 'quarticIn',
        animationDuration: 1000,
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
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
                    color: 'rgba(180, 180, 180, 0.2)',
                },
                //smooth: true,
                label: {
                    show: true,
                    //rotate: year > 0 ? '90' : '0',
                    //rotate: '90',
                    formatter: value => `${_.round(value.value / 1000000, 1)}M`,
                    position: 'inside',
                    //color: colorLabel,
                    fontSize: 11,
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
                emphasis: {
                    focus: 'series',
                },
                areaStyle: areaStyle,
                data,
            },
        ],
    };
    //return useMemo(() => SvgComponent(option), [data]);
    return <SvgComponent option={option} />;
}
