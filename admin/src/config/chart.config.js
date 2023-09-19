import { formatDate } from '@/utils'

function getCalendarRange() {
    const date = new Date()
    const year = date.getFullYear()
    const end = formatDate(date, 'YYYY-MM-DD')
    const start = formatDate(date.setFullYear(year - 1), 'YYYY-MM-DD')
    return [start, end]
}

const heatMap = {
    title: {
        top: 30,
        left: 'center',
        text: '文章贡献度',
        subtext: '近一年内博客贡献度'
    },
    tooltip: {
        position: 'top',
        formatter(params) {
            return `<div style="display: flex; flex-direction: column;"><span>${params.value[0]}</span><span>文章数: ${params.value[1]}</span></div>`
        }
    },
    visualMap: {
        type: 'piecewise',
        orient: 'horizontal',
        right: 30,
        bottom: 30,
        calculable: true,
        selectedMode: false,
        text: ['多', '少'],
        itemGap: 2,
        inRange: {
            color: ['#e1ece0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
        }
    },
    calendar: {
        top: 120,
        left: 50,
        right: 30,
        cellSize: 24,
        range: getCalendarRange(),
        splitLine: {
            show: false
        },
        itemStyle: {
            color: '#f1f1f1',
            borderColor: '#fff',
            borderWidth: 3
        },
        yearLabel: {
            show: false
        },
        monthLabel: {
            show: true,
            nameMap: 'ZH'
        },
        silent: true
    },
    series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        emphasis: {
            disabled: true
        },
        data: []
    }
}

const pieChart = {
    tooltip: {
        trigger: 'item',
        position(pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            const horizontal = pos[0] < size.viewSize[0] / 2 ? 'left' : 'right'
            return {
                top: 60,
                [horizontal]: 5
            }
        }
    },
    legend: {
        bottom: '10',
        left: 'center'
    },
    series: {
        name: '文章分类统计',
        type: 'pie',
        center: ['50%', '45%'],
        roseType: 'radius',
        avoidLabelOverlap: true,
        stillShowZeroSum: false,
        showEmptyCircle: false,
        percentPrecision: 1,
        label: {
            show: true,
            position: 'inside',
            formatter: '{b0} ({d0}%)',
            fontFamily: 'monospace'
        },
        labelLine: {
            show: true,
            length: 10,
            length2: 0
        },
        emphasis: {
            scale: false,
            focus: 'self'
        },
        data: []
    }
}

export { heatMap, pieChart }
