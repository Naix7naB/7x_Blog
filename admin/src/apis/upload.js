import Request from '@/utils/request'

/* 上传文件 */
function uploadFile({ classify, filename, file }) {
    return Request.postFile({
        url: `/upload/${classify}`,
        data: {
            [filename]: file
        }
    })
}

/* 删除文件 */
function deleteFile({ classify, filename }) {
    return Request.requestJson({
        methodType: Request.DELETE,
        url: `/upload/${classify}/${filename}`
    })
}

export { uploadFile, deleteFile }
