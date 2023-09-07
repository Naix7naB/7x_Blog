<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import {
    columns as userTableColumns,
    query as userTableQuery,
    popup as userTablePopup
} from '@/config/userTable.config'
import { getUserList } from '@/apis/user'

export default {
    name: 'UserList',
    components: { BaseTable, BaseForm },
    mixins: [mixin],
    computed: {
        columns() {
            return userTableColumns
        },
        queryForm() {
            return userTableQuery.form
        },
        popupConfig() {
            return userTablePopup.config
        },
        popupForm() {
            return userTablePopup.form
        }
    },
    methods: {
        getUserList,
        /* 触发添加操作按钮 */
        optAdd() {
            this.openPopup()
            this.execution = () => this.addUser()
        },
        /* 触发编辑操作按钮 */
        optEdit(data) {
            this.openPopup()
            this.execution = () => this.modifyUserInfo(data.id)
            this.$nextTick(() => this.setPopupFormData(data))
        },
        addUser() {
            console.log('add')
        },
        modifyUserInfo(id) {
            console.log(id)
        },
        optDelete(data) {
            console.log(data)
        },
        /* 批量删除 */
        optBatchDelete(selection) {
            console.log(selection)
        }
    }
}
</script>

<template>
    <BaseTable
        ref="table"
        showSelection
        showPagination
        :requestApi="getUserList"
        :columns="columns"
        :queryConfig="queryForm"
        :popupConfig="popupConfig"
        @optAdd="optAdd"
        @optEdit="optEdit"
        @optDelete="optDelete"
        @optBatchDelete="optBatchDelete"
        @beforePopupCancel="onBeforePopupCancel"
        @beforePopupConfirm="onBeforePopupConfirm"
    >
        <template #popup>
            <BaseForm ref="popup" :data="popupForm.data" :items="popupForm.items" />
        </template>
    </BaseTable>
</template>

<style lang="scss" scoped></style>
