import Request from '@/utils/request'

/* 获取随机句子 */
function getRandomWords() {
    return Request.request({
        methodType: Request.GET,
        options: {
            baseURL: process.env.VUE_APP_SENTENCE_URL
        },
        url: '/?c=i&max_length=20'
    })
}

export { getRandomWords }
