// 引入自定义live2d样式
import '@/assets/scss/live2d.scss'

// live2d_path 参数建议使用绝对路径
// const live2d_path = "/live2d-widget/";
const live2d_path = 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/'

// 封装异步加载资源的方法
const loadExternalResource = (url, type) => {
    return new Promise((resolve, reject) => {
        let tag

        if (type === 'css') {
            tag = document.createElement('link')
            tag.rel = 'stylesheet'
            tag.href = url
        } else if (type === 'js') {
            tag = document.createElement('script')
            tag.src = url
        }
        if (tag) {
            tag.onload = () => resolve(url)
            tag.onerror = () => reject(url)
            document.head.appendChild(tag)
        }
    })
}

const widgetConfig = {
    waifuPath: live2d_path + 'waifu-tips.json',
    //apiPath: "https://live2d.fghrsh.net/api/",
    cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
    tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'quit']
}

// 加载 waifu.css live2d.min.js waifu-tips.js
const live2d = () => {
    if (window.screen.width >= 768) {
        Promise.all([
            loadExternalResource(live2d_path + 'waifu.css', 'css'),
            loadExternalResource(live2d_path + 'live2d.min.js', 'js'),
            loadExternalResource(live2d_path + 'waifu-tips.js', 'js')
        ])
            .then(() => {
                // 配置选项的具体用法见 README.md
                window.initWidget(widgetConfig)
            })
            .catch(err => {
                console.error(new Error(err))
            })
    }
}

export default {
    install() {
        live2d()
    }
}
