const { defineConfig } = require('@vue/cli-service')

const path = require('path')

const port = process.env.port || process.env.npm_config_port || 8000 // dev port

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = defineConfig({
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'assets',
    filenameHashing: true,
    transpileDependencies: true,
    productionSourceMap: false,
    integrity: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('/src')
            }
        }
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
