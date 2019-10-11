

嵌套输出方式 nested    编译命令：sass 3-1-nested.scss:3-1-nested.css --style nested
    

展开输出方式 expanded  编译命令：sass 3-3-compact.scss:3-3-compact.css --style compact
   

紧凑输出方式 compact   编译命令：sass 3-3-compact.scss:3-3-compact.css --style compact
   

压缩输出方式 compressed    编译命令：sass 3-4-compressed.scss:3-4-compressed.css --style compressed
   

总结：
    1：由于sass文件内存在中文，所以需要在文件头部添加如下
        @charset "utf-8";
       否则，文件无法正常编译
       
    2：默认使用sass命令编译文件，默认的输出方式为nested，我们可以看下默认的格式，感觉比较乱
    
    3：compact属于展开输出格式，该格式比较好看点，所有的大括号都换行了，与nested格式有所区别
    
    4：compact：所有的样式都单独在一行，这样比较工整
    
    5：compressed：属于压缩编译，所有的样式，都在一行内，并且没有注释和空格
    
    
    
    调试   ——》3-5-tiaoshi.scss
    
    学习地址：
    https://www.sass.hk/docs/
    https://www.imooc.com/code/6386  （主要是这个）
    https://www.cnblogs.com/xmyxm/p/5307472.html （如何使用谷歌浏览器调试）
    
    第一步：编辑sass文件，如本案例的3-5-tiaoshi.scss
    
    第二步：执行watch编译文件，编译命令如下：
    
    
    第二步：
    在html文件内，加入编译好的css文件(注意一定是css文件)
    sass 3-5-tiaoshi.scss:3-5-tiaoshi.css --watch --scss --sourcemap --style compressed
    编译好之后，会发现新生成了css和map文件
    
    第三步：
    右击Html文件，选择调试（前提需要安装谷歌浏览器的IED插件）
    按F12，找到Source下，找到对应的scss文件，进行编辑
    编辑好之后，右击选择保存，覆盖原始文件
    然后看面板是否已经编译
    最后按刷新，发现在浏览器内编辑sass文件，通过F5刷新，确实起到作用了
    
    
    