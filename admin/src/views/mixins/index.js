import { isEmpty, isFunction } from 'lodash-es'

export default {
    data() {
        return {
            action: 'add',
            table: null,
            popup: null,
            execution: null
        }
    },
    methods: {
        /* 触发添加操作按钮 */
        optAdd() {
            this.action = 'add'
            this.openPopup()
            this.execution = () => this.addExecution()
        },
        /* 触发编辑操作按钮 */
        optEdit(data) {
            this.action = 'edit'
            this.openPopup()
            this.execution = () => this.modifyExecution(data.id)
            this.$nextTick(() => this.setPopupFormData(data))
        },
        /* 触发删除操作按钮 */
        optDelete(data) {
            this.deleteExecution(data)
        },
        /* 触发批量删除操作按钮 */
        optBulkDelete(selection) {
            this.bulkDeleteExecution(selection)
        },
        /* 表格数据刷新时 */
        onTableRefresh(datasource) {
            if (!isFunction(this.handleRefresh)) return false
            this.handleRefresh(datasource)
        },
        /* 打开弹窗 */
        openPopup() {
            this.table && this.table.openPopup()
            if (isEmpty(this.popup)) {
                this.$nextTick(() => {
                    this.popup = this.$refs.popup
                })
            }
        },
        /* 设置弹窗表单数据 */
        setPopupFormData(data) {
            if (isFunction(this.modifyPopupFormData)) {
                data = this.modifyPopupFormData(data)
            }
            this.popup && this.popup.setFormData(data)
        },
        /* 提交弹窗表单数据 */
        submitPopupForm(callback) {
            this.popup && this.popup.submitForm((data, hasModify) => callback(data, hasModify))
        },
        /* 触发弹窗取消按钮 */
        onBeforePopupCancel(done) {
            this.resetPopupFormData()
            done()
        },
        /* 触发弹窗确认按钮 */
        onBeforePopupConfirm(done) {
            this.execution()
            this.resetPopupFormData()
            done()
        },
        /* 重置弹窗的表单数据 */
        resetPopupFormData() {
            this.popup && this.popup.resetFormData()
        },
        /* 刷新表格数据 */
        refreshTableData() {
            this.table && this.table.refreshData()
        }
    },
    mounted() {
        this.table = this.$refs.table
    }
}
