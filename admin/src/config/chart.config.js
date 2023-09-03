const option = {
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

export { option }
