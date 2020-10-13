var host = process.env.PORT ? 'vue2ctt.herokuapp.com' : 'localhost';
var port =  process.env.PORT || 8086;
console.log("系统环境端口"+process.env.PORT);

module.exports = {
    base: '/',
    title: 'vue2.x',//网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。
    description: 'vue2.x自学教程',//网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
    head: [//额外的需要被注入到当前页面的 HTML <head> 中的标签，每个标签都可以以 [tagName, { attrName: attrValue }, innerHTML?] 的格式指定，举个例子，增加一个自定义的 favicon：
        ['link', {rel: 'icon', href: '/logo.png'}]
    ],
    host: host,//指定用于 dev server 的主机名。
    port: port,//指定 dev server 的端口。
    temp: 'temp/',//指定客户端文件的临时目录。目录地址会在1.vuepress-starter下面
    dest: 'public',//指定 vuepress build 的输出目录。如果传入的是相对路径，则会基于 process.cwd() 进行解析。
    markdown:{
        lineNumbers:false,//是否在每个代码块的左侧显示行号。
    },
    plugins: [
        '@vuepress/back-to-top',//返回顶部插件
        '@vuepress/active-header-links',//页面滚动时自动激活侧边栏链接的插件
    ],
    themeConfig: {
        repo: 'https://github.com/chentong106140',//自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 "Edit this page" 链接
        repoLabel: '查看源码',
        smoothScroll: true,//启用页面滚动效果
        sidebarDepth: 3,//控制左边侧栏标题的显示深度，一般#,##,###，一个#符号代表一个标题，用于控制标题显示数量
        navbar: true,//false禁用导航栏
        logo: '/logo.png',//导航栏 Logo,最终链接：http://localhost:8085/chentong/logos.jpg
        nav: [//导航栏链接
            {text: 'github', target: '_blank', rel: 'github', link: 'https://github.com/chentong106140/'},
            {//下拉框列表
                text: '学习地址',
                ariaLabel: '学习地址',
                items: [
                    {text: '中文官网', link: 'https://cn.vuejs.org/v2/guide/instance.html'},
                    {text: 'CLI', link: 'https://cli.vuejs.org/zh/guide/'}
                ]
            },
            
        ],
        /*sidebar: 'auto',//自动生成侧栏*/
        sidebar: [//左侧导航栏
            {
                title: '1.写在前面',
                path: '/',      // 可选的, 标题的跳转链接
                collapsable: false,//让一个组永远都是展开状态
                children: ['/'],//指定根目录下的README.md文件，md文件内下面有多少#标题就有多少第3层级
            },
            {
                title: '2.vue实例',
                path: '/2.vue实例/',      // 可选的, 标题的跳转链接
                collapsable: false,//让一个组永远都是展开状态
            },
            {
                title: '3.模板方法',
                path: '/3.模板方法/',      // 可选的, 标题的跳转链接
                collapsable: false,//让一个组永远都是展开状态
            },
            /*{
                title: 'vue实例',
                collapsable: false,//让一个组永远都是展开状态
                children: [
                    '/vue实例/',
                ]
            },*/
        ],
        searchMaxSuggestions: 10,//调整默认搜索框显示的搜索结果数量
        lastUpdated: '上次更新',//获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部,默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：Last Updated）
    }
};