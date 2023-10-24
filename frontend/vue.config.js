const { defineConfig } = require('@vue/cli-service')

const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const port = process.env.port || process.env.npm_config_port || 8000
const cdnPath = process.env.VUE_APP_CDN_PATH

const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'jsencrypt': 'JSEncrypt',
    'showdown': 'showdown',
    'highlight.js': 'hljs',
    'typed.js': 'Typed',
    'viewerjs': 'Viewer',
    'emoji-mart-vue-fast': 'EmojiMart'
}

const cdn = {
    css: [
        `${cdnPath}/@highlightjs/cdn-assets@11.9.0/styles/atom-one-dark.min.css`,
        `${cdnPath}/viewerjs@1.11.6/dist/viewer.min.css`,
        `${cdnPath}/emoji-mart-vue-fast@15.0.0/css/emoji-mart.css`
    ],
    js: [
        `${cdnPath}/vue@2.7.14/dist/vue.min.js`,
        `${cdnPath}/vue-router@3.6.5/dist/vue-router.min.js`,
        `${cdnPath}/vuex@3.6.2/dist/vuex.min.js`,
        `${cdnPath}/axios@1.5.1/dist/axios.min.js`,
        `${cdnPath}/jsencrypt@3.3.2/bin/jsencrypt.min.js`,
        `${cdnPath}/showdown@2.1.0/dist/showdown.min.js`,
        `${cdnPath}/@highlightjs/cdn-assets@11.9.0/highlight.min.js`,
        `${cdnPath}/typed.js@2.0.16/dist/typed.umd.js`,
        `${cdnPath}/viewerjs@1.11.6/dist/viewer.min.js`,
        `${cdnPath}/emoji-mart-vue-fast@15.0.0/dist/emoji-mart.js`
    ]
}

module.exports = defineConfig({
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    filenameHashing: true,
    transpileDependencies: true,
    productionSourceMap: false,
    integrity: false,
    chainWebpack: config => {
        // 设置别名
        config.resolve.alias
            .set('@', resolve('/src'))
            .set('api', resolve('/src/apis'))
            .set('assets', resolve('/src/assets'))
            .end()
        // 开启代码压缩
        config.optimization.minimize(true)
        // 使用CDN加速
        config.externals(externals)
        config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args
        })
        // 取消prefetch
        config.plugins.delete('prefetch')
        config.when(process.env.NODE_ENV === 'production', config => {
            // 打包分析工具
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end()
            // 使用gzip压缩
            config
                .plugin('compression-webpack-plugin')
                .use(require('compression-webpack-plugin'), [
                    {
                        test: /\.(js|json|html|css)(\?.*)?$/i, // 需要压缩的文件正则
                        threshold: 1024, // 文件大小大于这个值时启用压缩
                        deleteOriginalAssets: false // 压缩后是否删除源文件
                    }
                ])
                .end()
            // 分片打包 详细查看: Webpack SplitChunksPlugin
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        chunks: 'initial',
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10
                    },
                    elementUI: {
                        name: 'chunk-elementUI',
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)[\\/]/,
                        priority: 20
                    },
                    fontAwesomeIcon: {
                        name: 'chunk-fontAwesomeIcon',
                        test: /[\\/]node_modules[\\/]@?fortawesome(.*)[\\/]/,
                        priority: 20
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'),
                        minChunks: 2,
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
            config.optimization.runtimeChunk('single')
        })
    },
    css: {
        extract: true,
        loaderOptions: {
            scss: {
                additionalData: `
                    @import "@/assets/scss/variable.scss";
                    @import "@/assets/scss/mixin.scss";
                `
            }
        }
    },
    devServer: {
        port: port,
        open: true
    }
})
