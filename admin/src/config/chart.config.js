const date = new Date()
const year = date.getFullYear()

const heatMap = {
    title: {
        top: 30,
        left: 'center',
        text: '文章贡献度'
    },
    tooltip: {},
    visualMap: {
        type: 'piecewise',
        orient: 'horizontal',
        right: 60,
        top: 320,
        inverse: true,
        selectedMode: false,
        text: ['少', '多'],
        itemGap: 2,
        inRange: {
            color: ['#39d353', '#0e4429']
        }
    },
    calendar: {
        top: 150,
        left: 50,
        right: 30,
        cellSize: [24, 24],
        range: year,
        splitLine: {
            show: false
        },
        itemStyle: {
            color: '#2d333b',
            borderWidth: 0.5
        },
        yearLabel: {
            show: false
        },
        monthLabel: {
            show: true,
            nameMap: 'ZH'
        }
    },
    series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
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
