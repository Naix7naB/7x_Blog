import Request from '@/utils/request'

const API_URL_MAP = {
    words: 'https://v1.hitokoto.cn' // 一言API
}

/* 获取随机句子 */
function getRandomWords() {
    return Request.request({
        methodType: Request.GET,
        options: {
            baseURL: API_URL_MAP['words']
        },
        url: '/?c=i&max_length=20'
    })
}

export { getRandomWords }
