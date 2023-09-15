import * as echarts from 'echarts/core'
import {
    CalendarComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    VisualMapComponent
} from 'echarts/components'
import { HeatmapChart, PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    CalendarComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    VisualMapComponent,
    HeatmapChart,
    PieChart,
    LabelLayout,
    CanvasRenderer
])

export default echarts
