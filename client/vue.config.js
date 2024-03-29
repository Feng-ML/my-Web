const path = require('path')
const debug = process.env.NODE_ENV !== 'production'



module.exports = {
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分 */ 
    publicPath: '/',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: true,
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://localhost:5002/api/',
                /* 允许跨域 */
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/qq': {
                /* 目标代理服务器地址 */
                target: 'https://view.inews.qq.com',
                /* 允许跨域 */
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/qq': ''
                }
            }
        },
    },

    // md文件解析
    chainWebpack: config => {
        config.module
          .rule("md")
          .test(/\.md$/)
          .use("vue-loader")
          .loader("vue-loader")
          .end()
          .use("vue-markdown-loader")
          .loader("vue-markdown-loader/lib/markdown-compiler")
          .options({
            raw: true
          });


        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

    },

    css: {
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	}
}

function addStyleResource(rule) {
	rule.use('style-resource')
	.loader('style-resources-loader')
	.options({
		patterns: [
			// 需要全局导入的less路径
			path.resolve(__dirname, './src/assets/css/theme.less'),
			// path.resolve(__dirname, './src/assets/css/variables.less')
		],
	})
}