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
        formatter: params => {
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
        position: 'inside'
    },
    legend: {
        orient: 'vertical',
        top: '5%',
        left: 'auto'
    },
    series: [
        {
            name: '文章标签统计',
            type: 'pie',
            radius: ['0', '75%'],
            avoidLabelOverlap: true,
            label: {
                show: false,
                position: 'outside'
            },
            labelLine: {
                show: false
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 22
                }
            },
            data: [
                { value: 139, name: 'Vue' },
                { value: 78, name: 'Nodejs' },
                { value: 12, name: 'JavaScript' },
                { value: 7, name: 'CSS' }
            ]
        }
    ]
}

export { heatMap, pieChart }
