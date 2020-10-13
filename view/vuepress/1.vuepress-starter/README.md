``` bash

基本配置：
https://www.vuepress.cn/config/#index-styl

侧边栏配置：
https://www.vuepress.cn/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F

主题配置:
https://www.vuepress.cn/theme/using-a-theme.html

静态资源
https://www.vuepress.cn/guide/assets.html#public-files

Markdown 插槽：
https://www.vuepress.cn/guide/markdown-slot.html

多语言支持
https://www.vuepress.cn/guide/i18n.html#%E7%AB%99%E7%82%B9%E5%A4%9A%E8%AF%AD%E8%A8%80%E9%85%8D%E7%BD%AE

Markdown 编辑 
https://www.vuepress.cn/guide/markdown.html#markdown-%E6%8B%93%E5%B1%95

markdown所有支持的表情包
https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json

表情包用法，前后都是:冒号，可以对照markdown.json文件做参考
:imp:  :nerd_face:

获取到当前md文件的所有目录
[[toc]]

配置参考
typescript-book-chinese

静态文件在docs/.vuepress/public/logos.jpg下面，
引用图片md为：<img :src="$withBase('/logos.jpg')" />
js配置文件引用图片为：logo: '/logos.jpg'



cnpm init

cnpm install --save-dev  vuepress

//新建文档目录
mkdir docs && echo '# Hello VuePress' > docs/README.md

//安装返回顶部插件
cnpm install --save-dev @vuepress/plugin-back-to-top

//安装导航插件
cnpm install --save-dev @vuepress/plugin-active-header-links

//如下几个插件可以不用装
cnpm install --save-dev @vuepress/plugin-blog
cnpm install --save-dev @vuepress/plugin-pwa   //安装离线缓存插件
cnpm install --save-dev @vuepress/theme-blog   //安装博客主题

//执行本地服务测试
cnpm run dev



//执行打包发布命令
cnpm run build



```