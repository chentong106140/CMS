
/**
 * 模块路径解析规则
 * 
 * ——内置模块
 * 如果传递给require函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，
 * 例如require('fs')。
 * 
 * ——node_modules目录
 * NodeJS定义了一个特殊的node_modules目录用于存放模块。
 * 例如某个模块的绝对路径是/home/user/hello.js，
 * 在该模块中使用require('foo/bar')方式加载模块时，则NodeJS依次尝试使用以下路径。
 * /home/user/node_modules/foo/bar
 * /home/node_modules/foo/bar
 * /node_modules/foo/bar
 */

/**
 * 包（package）
 * 
 * 我们已经知道了JS模块的基本单位是单个JS文件，但复杂些的模块往往由多个子模块组成。
 * 为了便于管理和使用，我们可以把由多个子模块组成的大模块称做包，并把所有子模块放在同一个目录里。
 * 
 * 在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象。
 * 
 * ——index.js（入口模块）
 * 当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径，
 * 因此接着上例，以下两条语句等价。
 * var cat = require('/home/user/lib/cat');
 * var cat = require('/home/user/lib/cat/index');
 * 
 * 这样处理后，就只需要把包目录路径传递给require函数，
 * 感觉上整个目录被当作单个模块使用，更有整体感。
 * 
 * ——package.json
 * 如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个package.json文件，
 * 并在其中指定入口模块的路径。
 * 
 * 包内的模块路径大概如下（包cat内的入口模块在lib目录下的main.js）
 - /home/user/lib/
                - cat/
                     + doc/
                     - lib/
                         head.js
                         body.js
                         main.js
                     + tests/
                     package.json
 * 
 * 
 * 其中package.json内容如下,mian属性就是自定义入口模块的文件名和存放位置
     {
        "name": "cat",
        "main": "./lib/main.js"
    }
 * 
 * 
 */


/**
 * 命令行程序
 * 
 * 例如我们用NodeJS写了个程序，输出“你好，世界”。
 * 我们把该程序部署在/home/node-echo.js这个位置。
 * 为了在任何目录下都能运行该程序，我们需要使用以下终端命令。
 * node /home/node-echo.js
 * 
 * 
 * 这种使用方式看起来不怎么像是一个命令行程序，下边的才是我们期望的方式。
 *  node-echo
 *  
 *  ——linux系统中，如何执行以上这种无需写上文件路径的命令？
 *  
 *  1：在shell脚本中，可以通过#!注释来指定当前脚本使用的解析器。
 *      所以我们首先在node-echo.js文件顶部增加以下一行注释，表明当前脚本使用NodeJS解析。
 *       #! /usr/bin/env node
 *       console.log("你好，世界");
 *       
 *  2：然后，我们使用以下命令赋予node-echo.js文件执行权限。
 *      chmod +x /home/node-echo.js
 *      
 *  3：最后，我们在PATH环境变量中指定的某个目录下，例如在/usr/local/bin下边创建一个软链文件，
 *      文件名与我们希望使用的终端命令同名，命令如下：
 *      sudo ln -s /home/node-echo.js /usr/local/bin/node-echo
 *      
 *  4：验证
 *      cd /
 *      node-echo   // 你好，世界
 *      
 */

/**
 * NPM
 * 
 * NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：
 *      允许用户从NPM服务器下载别人编写的三方包到本地使用。
 *      允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
 *      允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。
 *      
 *  ——npm install argv
 *  下载好之后，argv包就放在了工程目录下的node_modules目录中，
 *  因此在代码中只需要通过require('argv')的方式就好，无需指定三方包路径。
 *  
 *   ——npm install argv@0.0.1
 *   如果想要下载指定版本的话，可以在包名后边加上@<version>
 *       
 *   如果使用到的三方包比较多，在终端下一个包一条命令地安装未免太人肉了。
 *   因此NPM对package.json的字段做了扩展，允许在其中申明三方包依赖。
 *   因此，上边例子中的package.json可以改写如下：
 *   
         {
            "name": "node-echo",
            "main": "./lib/echo.js",
            "dependencies": {
                "argv": "0.0.2"
            }
         } 
 * 
 * ——npm install
 * 这样处理后，在工程目录下就可以使用npm install命令批量安装三方包了
 * 
 * 
 * ——npm install node-echo -g
 * 参数中的-g表示全局安装，因此node-echo会默认安装到以下位置，
 * 并且NPM会自动创建好Linux系统下需要的软链文件或Windows系统下需要的.cmd文件。
 * 
 * ——版本号
 * 语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。
 * 当代码变更时，版本号按以下原则更新。
 *      如果只是修复bug，需要更新Z位。
 *      如果是新增了功能，但是向下兼容，需要更新Y位。
 *      如果有大变动，向下不兼容，需要更新X位。
 * 
 */




















