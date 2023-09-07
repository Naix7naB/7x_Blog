<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import { getRoleList } from '@/apis/user'
import { columns as roleTableColumns, query as roleTableQuery, popup as roleTablePopup } from '@/config/roleTable.config'

export default {
    name: 'RoleList',
    components: { BaseTable, BaseForm },
    mixins: [mixin],
    computed: {
        columns() {
            return roleTableColumns
        },
        queryForm() {
            return roleTableQuery.form
        },
        popupConfig() {
            return roleTablePopup.config
        },
        popupForm() {
            return roleTablePopup.form
        }
    },
    methods: {
        getRoleList,
        /* 触发添加操作按钮 */
        optAdd() {
            this.openPopup()
            this.execution = () => this.addRole()
        },
        /* 触发编辑操作按钮 */
        optEdit(data) {
            this.openPopup()
            this.execution = () => this.modifyRoleInfo(data.id)
            this.$nextTick(() => this.setPopupFormData(data))
        },
        addRole() {
            console.log('add')
        },
        modifyRoleInfo(id) {
            console.log(id)
        },
        optDelete() {
            console.log('delete')
        },
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
        :requestApi="getRoleList"
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
