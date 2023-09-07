import Request from '@/utils/request'

/* 上传文件 */
function uploadFile({ category, filename, file }) {
    return Request.postFile({
        url: `/upload/${category}`,
        data: {
            [filename]: file
        }
    })
}

/* 删除文件 */
function deleteFile({ category, filename }) {
    return Request.requestJson({
        methodType: Request.DELETE,
        url: `/upload/${category}/${filename}`
    })
}

export { uploadFile, deleteFile }
