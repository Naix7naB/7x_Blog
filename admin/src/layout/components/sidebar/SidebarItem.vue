<script>
import Item from './Item'

export default {
    name: 'SidebarItem',
    components: { Item },
    props: {
        item: {
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showingChild: null
        }
    },
    methods: {
        onlyOneChild(children = [], parent) {
            const ShowingChidren = children.filter(child => {
                if (child.hidden) {
                    return false
                }
                this.showingChild = child
                return true
            })

            if (ShowingChidren.length === 1) {
                return true
            }

            if (ShowingChidren.length === 0) {
                this.showingChild = { ...parent, path: '', noShowingChidren: true }
                return true
            }

            return false
        }
    }
}
</script>

<template>
    <div v-if="!item.hidden">
        <template v-if="onlyOneChild(item.children, item)">
            <el-menu-item :index="showingChild.name" :route="{ name: showingChild.name }">
                <Item :title="showingChild.meta.title" :icon="showingChild.meta.icon" />
            </el-menu-item>
        </template>
        <template v-else>
            <el-submenu :index="item.path">
                <template slot="title">
                    <Item v-if="item.meta" :title="item.meta.title" :icon="item.meta.icon" />
                </template>
                <SidebarItem v-for="child in item.children" :key="child.path" :item="child" />
            </el-submenu>
        </template>
    </div>
</template>
