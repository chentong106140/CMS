# vuects
vue官网学习案例


## cnpm run build 
使用的是node index.js文件开启的服务，前提是public文件夹内提前生成好html等文件，

也就是说，执行这个命令的前提是，需要先执行cnpm run runBuild,通过vuepress生成好静态文件


## cnpm run runDev
本地开发调试的话，执行如上命令即可，自动开启一个服务，实际执行的是vuepress dev docs命令

也就是说，实际的配置文件在docs内的docs/.vuepress/config.js配置文件配置测试端口等信息


## cnpm run runBuild
使用的是vuepress build docs，目的是让vuepress生成静态文件