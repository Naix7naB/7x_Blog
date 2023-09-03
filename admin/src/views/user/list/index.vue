<script>
import BaseTable from '@/components/table'
import { getUserList } from '@/apis/user'
import { tableColumns } from '@/config/userList.config'

export default {
    name: 'UserList',
    components: { BaseTable },
    data() {
        return {
            tableColumns
        }
    },
    methods: {
        getUserList,
        optEdit(data) {
            console.log('edit')
        },
        optDelete(data) {
            console.log('delete')
        }
    }
}
</script>

<template>
    <BaseTable
        showPagination
        :requestApi="getUserList"
        :columns="tableColumns"
        @optEdit="optEdit"
        @optDelete="optDelete"
    />
</template>

<style lang="scss" scoped></style>
