
1：单文件编译
    执行编译命令如下
    sass test1.scss:test1.css
    看见会出现test1.css与test1.css.map说明编译成功，并且会出现sass-ccache缓存文件夹


2：多文件编译
    2.1 先保证css文件夹存在，并且该文件夹没有任何css文件，用于验证多文件是否正常编译
    2.2 进入到sass与css目录的父目录内
    2.3 执行编译命令
        sass --watch sass/:css/ --style expanded --sourcemap
    2.4 通过结果看出，在执行命令的目录下新建了.sass-cache目录，同时，检查css文件夹下，确实生成了多个.css与.map文件
    


