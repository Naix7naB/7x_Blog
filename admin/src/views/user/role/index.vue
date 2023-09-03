<script>
import BaseTable from '@/components/table'
import { getRoleList } from '@/apis/user'
import { tableColumns } from '@/config/roleList.config'

export default {
    name: 'RoleList',
    components: { BaseTable },
    data() {
        return {
            tableColumns
        }
    },
    methods: {
        getRoleList,
        optEdit() {
            console.log('edit')
        },
        optDelete() {
            console.log('delete')
        }
    }
}
</script>

<template>
    <BaseTable
        showPagination
        :requestApi="getRoleList"
        :columns="tableColumns"
        @optEdit="optEdit"
        @optDelete="optDelete"
    />
</template>

<style lang="scss" scoped></style>
