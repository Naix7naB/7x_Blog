<script>
import { formatDate } from '@/utils/helper'

export default {
    name: 'TagDrawer',
    props: {
        tagInfo: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            isVisible: false
        }
    },
    methods: {
        formatDate,
        /* 打开抽屉弹窗 */
        openDrawer() {
            if (!this.isVisible) {
                this.isVisible = true
            }
        },
        /* 关闭抽屉弹窗 */
        closeDrawer() {
            if (this.isVisible) {
                this.isVisible = false
            }
        }
    }
}
</script>

<template>
    <el-drawer
        title="标签信息"
        append-to-body
        destroy-on-close
        :visible="isVisible"
        :show-close="false"
        :before-close="closeDrawer"
    >
        <el-descriptions
            :column="1"
            :labelStyle="{ marginRight: '20px' }"
            :contentStyle="{ alignItems: 'center' }"
        >
            <el-descriptions-item label="标签名称">
                {{ tagInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item label="标签颜色">
                <i class="tag-color" :style="{ backgroundColor: tagInfo.color }" />
            </el-descriptions-item>
            <el-descriptions-item label="创建用户">
                {{ tagInfo.creator && tagInfo.creator.nickname }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
                {{ formatDate(tagInfo.created_at) }}
            </el-descriptions-item>
            <el-descriptions-item label="最后修改">
                {{ formatDate(tagInfo.updated_at) }}
            </el-descriptions-item>
        </el-descriptions>
    </el-drawer>
</template>

<style lang="scss" scoped>
:deep(.el-drawer__header) {
    font-size: $fz-large-x;
}

:deep(.el-drawer__body) {
    padding: 0 40PX;
}

:deep(.el-descriptions-item.el-descriptions-item__cell) {
    padding-bottom: 20PX;
    font-size: $fz-medium-x;
}

.tag-color {
    display: block;
    width: 20PX;
    height: 20PX;
}
</style>
