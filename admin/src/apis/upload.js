import Request from '@/utils/request'

/* 上传文件 */
async function uploadFile({ classify, filename, file }) {
    const { data } = await Request.postFile({
        url: `/upload/${classify}`,
        data: {
            [filename]: file
        }
    })
    return {
        ...data.fileUrls[0]
    }
}

/* 删除文件 */
function deleteFile({ classify, filename }) {
    return Request.requestJson({
        methodType: Request.DELETE,
        url: `/upload/${classify}/${filename}`
    })
}

export { uploadFile, deleteFile }
