import Request from '@/utils/request'

/* 获取随机句子 */
function getRandomWords() {
    return Request.request({
        methodType: Request.GET,
        options: {
            baseURL: process.env.VUE_APP_SENTENCE_API_PATH
        },
        url: '/?c=i&max_length=20'
    })
}

/* 获取表情包数据 */
function getEmojiJsonData(type = 'all') {
    return Request.request({
        methodType: Request.GET,
        options: {
            baseURL: process.env.VUE_APP_CDN_PATH
        },
        url: `/emoji-mart-vue-fast@15.0.0/data/${type}.json`
    })
}

export { getRandomWords, getEmojiJsonData }
