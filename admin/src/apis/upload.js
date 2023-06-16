import Request from './request'

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
async function deleteFile({ classify, filename, file }) {
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

export { uploadFile, deleteFile }
