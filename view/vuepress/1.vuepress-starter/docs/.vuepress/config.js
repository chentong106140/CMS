module.exports = {
    base: '/ts/',
    title: '我是主标题!',//网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。
    description: '我的第一个vuepress项目',//网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
    head: [//额外的需要被注入到当前页面的 HTML <head> 中的标签，每个标签都可以以 [tagName, { attrName: attrValue }, innerHTML?] 的格式指定，举个例子，增加一个自定义的 favicon：
        ['link', {rel: 'icon', href: '/logo.png'}]
    ],
    host: 'localhost',//指定用于 dev server 的主机名。
    port: 8085,//指定 dev server 的端口。
    temp: 'temp/',//指定客户端文件的临时目录。目录地址会在1.vuepress-starter下面
    dest: 'dist',//指定 vuepress build 的输出目录。如果传入的是相对路径，则会基于 process.cwd() 进行解析。
    extraWatchFiles: [//监听文件
        //'.vuepress/foo.js', // 使用相对路径
        //'../bar.js'   // 使用绝对路径
    ],
    markdown:{
        lineNumbers:true,//是否在每个代码块的左侧显示行号。
    },
    plugins: [
        '@vuepress/back-to-top',//返回顶部插件
        '@vuepress/active-header-links',//页面滚动时自动激活侧边栏链接的插件
        /*'@vuepress/pwa', {//最好不要用这个插件，会导致内容无法及时更新，只有在你能够使用 SSL 部署您的站点时才能启用此功能，因为 service worker 只能在 HTTPs 的 URL 下注册
            serviceWorker: true,//如果设置为 true，VuePress 将自动生成并注册一个 Service Worker ，用于缓存页面的内容以供离线使用（仅会在生产环境中启用）。
            //updatePopup: true,//或者如下：本选项开启了一个用于刷新内容的弹窗。这个弹窗将会在站点有内容更新时显示出来，并提供了一个 refresh 按钮，允许用户立即刷新内容。
            updatePopup: {
                message: "发现新内容可用，是否刷新?",
                buttonText: "刷新"
            },
        },*/
        //'@vuepress/blog',//强大的分类系统让你快速将贴文分类
    ],
    //theme: '@vuepress/blog',//使用博客主题之后，发现左侧导航栏不见了
    themeConfig: {
        repo: 'https://github.com/chentong106140',//自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 "Edit this page" 链接
        repoLabel: '查看源码',

        smoothScroll: true,//启用页面滚动效果
        sidebarDepth: 3,//控制左边侧栏标题的显示深度，一般#,##,###，一个#符号代表一个标题，用于控制标题显示数量

        navbar: true,//false禁用导航栏
        logo: '/logos.jpg',//导航栏 Logo,最终链接：http://localhost:8085/chentong/logos.jpg
        nav: [//导航栏链接
            {text: '外部链接', target: '_blank', rel: '我是外部链接', link: 'http://www.baidu.com'},
            {text: '外部链接', target: '_blank', link: 'https://jkchao.github.io/typescript-book-chinese/'},
            {text: '内部链接', target: '_self', link: ''},
            {//下拉框列表
                text: '语言',
                ariaLabel: '语言菜单',
                items: [
                    {text: '中文', link: '/language/chinese/'},
                    {text: '英文', link: '/language/japanese/'}
                ]
            },
            {//分组下拉框
                text: '历史版本',
                items: [
                    {
                        text: 'v1',
                        items: [{text: 'v1.1.1', link: '/language/v1.1.1/'}, {
                            text: 'v1.1.2',
                            link: '/language/v1.1.2/'
                        }]
                    },
                    {
                        text: 'v2',
                        items: [{text: 'v2.1.1', link: '/language/v2.1.1/'}, {
                            text: 'v2.1.2',
                            link: '/language/v2.1.2/'
                        }]
                    }
                ]
            }
        ],
        /*sidebar: 'auto',//自动生成侧栏*/
        sidebar: [//左侧导航栏
            {
                title: '写在前面',
                path: '/',      // 可选的, 标题的跳转链接
                collapsable: false,//让一个组永远都是展开状态
                children: ['/'],//指定根目录下的README.md文件，md文件内下面有多少#标题就有多少第3层级
            },
            {
                title: 'TypeScript 项目',
                collapsable: false,//让一个组永远都是展开状态
                children: [
                    '/project/compilationContext',//指定这个compilationContext.md文件，菜单栏的标题就是md文件首行#指定的文字
                    '/project/declarationspaces',
                    '/project/modules',
                    '/project/namespaces',
                    '/project/dynamicImportExpressions'
                ]
            },
            {
                title: 'TypeScript 类型系统',
                collapsable: false,
                children: [
                    '/typings/overview',
                    '/typings/migrating',
                    '/typings/types',
                    '/typings/ambient',
                    '/typings/interfaces',
                    '/typings/enums',
                    '/typings/lib',
                    '/typings/functions',
                    '/typings/callable',
                    '/typings/typeAssertion',
                    '/typings/freshness',
                    '/typings/typeGuard',
                    '/typings/literals',
                    '/typings/readonly',
                    '/typings/generices',
                    '/typings/typeInference',
                    '/typings/typeCompatibility',
                    '/typings/neverType',
                    '/typings/discrominatedUnion',
                    '/typings/indexSignatures',
                    '/typings/movingTypes',
                    '/typings/exceptionsHanding',
                    '/typings/mixins',
                    '/typings/thisType'
                ]
            },
        ],
        //search: false,//禁用默认的搜索框
        searchMaxSuggestions: 10,//调整默认搜索框显示的搜索结果数量
        lastUpdated: '上次更新',//获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部,默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：Last Updated）
        //nextLinks: false,//默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
        //prevLinks: false,//默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
        // algolia: {
        //   apiKey: 'fd0efd57c48824ceb1bcfa9690dba5b0',
        //   indexName: 'jkchao_typescript'
        // },
    }
};