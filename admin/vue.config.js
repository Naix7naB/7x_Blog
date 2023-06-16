const { defineConfig } = require('@vue/cli-service')

const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = defineConfig({
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            },
            fallback: {
                path: require.resolve('path-browserify')
            }
        }
    },
    transpileDependencies: true,
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    @import "@/assets/scss/variable.scss";
                    @import "@/assets/scss/mixin.scss";
                `
            }
        }
    }
})
