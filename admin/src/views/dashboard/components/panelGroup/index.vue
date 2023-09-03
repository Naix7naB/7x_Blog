<script>
import CountTo from 'vue-count-to'

export default {
    components: { CountTo },
    data() {
        return {}
    }
}
</script>

<template>
    <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <div class="card-panel-icon icon-article">
                    <fa-icon :icon="['fas', 'austral-sign']" size="4x" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">文章数</div>
                    <count-to
                        class="card-panel-num"
                        :start-val="0"
                        :end-val="102400"
                        :duration="2600"
                    />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <div class="card-panel-icon icon-view">
                    <fa-icon :icon="['fas', 'chart-line']" size="4x" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">总访问量</div>
                    <count-to
                        class="card-panel-num"
                        :start-val="0"
                        :end-val="81212"
                        :duration="3000"
                    />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <div class="card-panel-icon icon-user">
                    <fa-icon :icon="['fas', 'user-group']" size="4x" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">用户量</div>
                    <count-to
                        class="card-panel-num"
                        :start-val="0"
                        :end-val="9280"
                        :duration="3200"
                    />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <div class="card-panel-icon icon-comment">
                    <fa-icon :icon="['fas', 'comment-dots']" size="4x" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">留言数</div>
                    <count-to
                        class="card-panel-num"
                        :start-val="0"
                        :end-val="13600"
                        :duration="3600"
                    />
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.card-panel {
    margin-top: 18px;
}

.card-panel-col {
    margin-bottom: 32px;
}

.card-panel {
    cursor: pointer;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    font-size: 12px;
    border-color: rgba(0, 0, 0, .05);
    background: #ffffff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);

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
        .icon-comment {
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

.icon-comment {
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
