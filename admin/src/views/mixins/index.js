export default {
    data() {
        return {
            table: null,
            popup: null,
            execution: null
        }
    },
    methods: {
        /* 打开弹窗 */
        openPopup() {
            this.table && this.table.openPopup()
            if (!this.popup) {
                this.$nextTick(() => {
                    this.popup = this.$refs.popup
                })
            }
        },
        /* 设置弹窗表单数据 */
        setPopupFormData(data) {
            this.popup && this.popup.setFormData(data)
        },
        submitPopupForm(callback) {
            this.popup &&
                this.popup.submitForm(data => {
                    callback(data)
                })
        },
        /* 重置弹窗的表单数据 */
        resetPopupFormData() {
            this.popup && this.popup.resetFormData()
        },
        /* 刷新表格数据 */
        refreshTableData() {
            this.table && this.table.refreshData()
        },
        /* 触发弹窗取消按钮 */
        onBeforePopupCancel(done) {
            this.resetPopupFormData()
            done()
        },
        /* 触发弹窗确认按钮 */
        onBeforePopupConfirm(done) {
            this.execution()
            done()
        }
    },
    mounted() {
        this.table = this.$refs.table
    }
}
