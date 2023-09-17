<script>
import CountTo from 'vue-count-to'

import { getSiteInfo } from '@/apis/site'

export default {
    components: { CountTo },
    data() {
        return {
            panels: [
                {
                    name: 'article',
                    prop: 'article_count',
                    text: '文章数',
                    icon: 'austral-sign',
                    value: 0
                },
                {
                    name: 'view',
                    prop: 'view_count',
                    text: '总访问量',
                    icon: 'chart-line',
                    value: 0
                },
                {
                    name: 'user',
                    prop: 'user_count',
                    text: '用户量',
                    icon: 'user-group',
                    value: 0
                },
                {
                    name: 'message',
                    prop: 'message_count',
                    text: '留言数',
                    icon: 'comment-dots',
                    value: 0
                }
            ]
        }
    },
    created() {
        getSiteInfo().then(({ data }) => {
            const pickFields = ['user_count', 'article_count', 'message_count']
            pickFields.forEach(field => {
                const panel = this.panels.find(item => item.prop === field)
                panel.value = data[field]
            })
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <el-row :gutter="40">
        <el-col
            class="panel-item"
            v-for="panel in panels"
            :key="panel.name"
            :xs="24"
            :sm="12"
            :lg="6"
        >
            <div class="card-panel dashboard-card">
                <div :class="['card-panel-icon', `icon-${panel.name}`]">
                    <fa-icon :icon="['fas', panel.icon]" size="4x" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">{{ panel.text }}</div>
                    <count-to
                        class="card-panel-num"
                        :start-val="0"
                        :end-val="panel.value"
                        :duration="2600"
                    />
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.panel-item {
    margin-top: 20px;
}

.card-panel {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;

    &:hover {
        .card-panel-icon {
            color: #ffffff;
        }
        .icon-article {
            background-color: #f4516c;
        }
        .icon-view {
            background-color: #34bfa3
        }
        .icon-user {
            background-color: #40c9c6;
        }
        .icon-message {
            background-color: #36a3f7;
        }
    }
}

.card-panel-icon {
    padding: 16px;
    border-radius: 6px;
    transition: all 0.38s ease-out;
}

.icon-article {
    color: #f4516c;
}

.icon-view {
    color: #34bfa3;
}

.icon-user {
    color: #40c9c6;
}

.icon-message {
    color: #36a3f7;
}

.card-panel-description {
    font-weight: bold;
    color: #666666;
}

.card-panel-text {
    line-height: 18px;
    margin-bottom: 12px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
}

.card-panel-num {
    font-size: 20px;
}

@media (max-width:550px) {
    .card-panel-description {
        display: none;
    }

    .card-panel-icon {
        width: 100%;
        height: 100%;
        margin: 0 !important;
    }

    .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
    }
}
</style>
