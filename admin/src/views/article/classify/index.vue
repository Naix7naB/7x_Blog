<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'
import ClassifyDialog from './components/classifyDialog'
import { tableColumns, headerFormItems } from '@/config/articleClassify.config'
import { getClassifyList, createClassify, modifyClassifyById, deleteClassifyById } from '@/apis/classify'

export default {
    name: 'ArticleClassify',
    components: { BaseForm, BaseTable, ClassifyDialog },
    data() {
        return {
            tableColumns,
            headerFormItems,
            headerFormData: {
                dateRange: []
            },
            headerOptItems: [
                {
                    text: '查询',
                    type: 'primary',
                    action: () => {
                        console.log('query')
                    }
                },
                {
                    text: '创建',
                    type: 'primary',
                    action: () => {
                        this.$refs.classifyDialog.openDialog()
                    }
                }
            ]
        }
    },
    methods: {
        getClassifyList,
        /* 编辑文章分类 */
        editClassify(data) {
            this.$refs.classifyDialog.openDialog(data)
        },
        /* 删除文章分类 */
        deleteClassify(data) {
            deleteClassifyById(data._id).then(res => {
                this.$refs.classifyTable.getDatasource()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        },
        /* 刷新表格数据源 */
        refreshDatasource() {
            this.$refs.classifyTable.getDatasource()
        },
        dialogConfirm(data) {
            createClassify(data).then(res => {
                this.refreshDatasource()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        },
        dialogChange({ _id: id, ...data }) {
            modifyClassifyById(id, data).then(res => {
                this.refreshDatasource()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        }
    }
}
</script>

<template>
    <div>
        <BaseTable
            ref="classifyTable"
            showPagination
            :requestApi="getClassifyList"
            :columns="tableColumns"
            @optEdit="editClassify"
            @optDelete="deleteClassify"
        >
            <template #tableHeader>
                <BaseForm
                    inline
                    :formData="headerFormData"
                    :formItems="headerFormItems"
                    :optItems="headerOptItems"
                />
            </template>
        </BaseTable>
        <ClassifyDialog ref="classifyDialog" @confirm="dialogConfirm" @change="dialogChange" />
    </div>
</template>
