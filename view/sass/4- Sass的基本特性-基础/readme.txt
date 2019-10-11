

1:变量
    https://www.imooc.com/code/6968
    变量以美元符号“$”开头
    赋值方法与 CSS 属性的写法一样   
    $width: 5em;
    
    直接使用即调用变量
    #main {
      width: $width;
    }
    
    变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），
    不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。
    将局部变量转换为全局变量可以添加 !global 声明：
    
    //我们先不使用全局声明，进行编译试试，看看报什么错
    编译命令：
    sass 4-bianliang.scss:4-bianliang.css --style expanded
    
2：普通变量与默认变量
    普通变量我们就不多说了，主要说下默认变量
    我们先定义个默认变量，再使用它看看编译是否正常
    编译命令：
    sass 4-2putongbianliangyumorenbianliang.scss:4-2putongbianliangyumorenbianliang.css --style expanded
    
    我们可以看到编译正常，默认变量的值也正常被使用到，那么默认变量到底是什么情况下使用的呢？
    
    我们在默认变量之后进行赋值看看是否正常
    我们可以看到，在默认变量只会进行覆盖赋值，正常
    
    我们在默认变量之前进行赋值，再看看效果
    此时我们发现，我们先进行定义了一个普通变量，值为3.5，
    然后，我们在进行覆盖定义为一个默认变量，值为1.5
    按理说，自上而下执行，应该会取最后覆盖的值，但是，通过编译后的效果来看，值使用的是一开始的值
    所以说定义默认变量，如果在没有其他覆盖变量的情况下，使用的是默认值，
    如果一旦有变量覆盖了，就使用覆盖的变量值
    
    所以，我个人理解为：默认变量是在当前组件下，会使用到这个变量，但是如果存在其他人也在用这个变量，
    为了防止其他人没有定义这个变量，所以，就定义一个默认变量，防止其他人误删除这个变量
    简单说，就是，优先区其他人的变量，如果其他人没有，就用咱们自己定义的默认变量
    
    
3：变量的调用
    执行编译语句：
    sass 4-3bianliangdediaoyong.scss:4-3bianliangdediaoyong.css --style expanded
    
    这边值的说的是，定义变量时使用了函数darken($btn-primary-bg, 5%)，
    $btn-primary-bg的值为：#337ab7
    通过darken($btn-primary-bg, 5%)执行后，值变成：#2d6da3
    
    所以，变量可以灵活使用
    
4:局部变量与全局变量
    我们先根据教程写一个列子
    执行编译语句
    sass 4-4jububianliangyuquanjubianliang.scss:4-4jububianliangyuquanjubianliang.css --style expanded
    我们可以看到，在块级作用域内，定义的局部变量名称与全局变量名称一样时，块级作用域内，优先使用局部变量的值
    
    那么问题来了，如果块级作用域内定义的变量与全局变量一样是，是否会覆盖全局变量呢？
    我们改动下代码
    
    我们再进行验证下!global 的置顶作用
    
5:嵌套
    选择器嵌套
        https://www.imooc.com/code/7009
        执行编译命令
        sass 4-5qiantao.scss:4-5qiantao.css --style expanded 
    
    
    属性嵌套
        https://www.imooc.com/code/7011
        执行编译命令
        sass 4-5qiantao.scss:4-5qiantao.css --style expanded 
        通过编译效果可以看出，属性嵌套功能实现了该效果
        
        
    伪类嵌套
            https://www.imooc.com/code/7012
            执行编译命令
            sass 4-5qiantao.scss:4-5qiantao.css --style expanded 
            通过编译后的结果可以看出，伪类嵌套，实现了预期的效果


6：混合宏
     https://www.imooc.com/code/7016
     
     执行编译命令
     sass 4-6hunhehong.scss:4-6hunhehong.css --style expanded
     通过编译结果可以看出，调用一个无参数的混合宏成功
     
     我们再次调用一个参数的混合宏试一下
     看到编译报错，说需要传入一个参数，那我们就传入一个参数试试
     
     等于说，我们声明了一个参数的混合宏，如果调用时，不填入参数就编译出错，
     那么问题来了，如果我们在调用的时候，就不想要传递参数，怎么办？
     可以使用“参数:默认值”的形式，定义混合宏
     
     我们来修改那个带参数的混合宏
     
     看到没，我们调用混合宏时，括号没有传递任何参数，也编译成功了，说明参数默认值，起到了作用
     
     我们可不可以在不传递参数的时候，调用混合宏，不带上括号，行不行得通呢？试试
     
     ok没有问题，参数默认值，可以这么用
     
     
     ok，我们定义一个多个参数的混合宏，验证通过
     
     我们再来看下...这个符号有什么用？
     
     我们先看下编译通不通过？
     ok，编译通过，我们在验证调用看下
     
     我们不传递参数看下，编译是否通过？
     编译报错,原来是，变量名写错了
     
     编译通过了，但怎么会编译成这个样子，肯定有问题
     
     原来是else写错了，应该写成@else
     
     你发现没，我们没有传递参数，全部进入的默认的判断，说明写法没问题，编译通过
     
     刚刚我们验证了，没有传递参数，让sass自己使用所有的默认值，目前来看都没问题
     
     我们先验证下，按顺序传递参数，并且看看，第三个参数只传递一个值
     
     编译通过
     .box-shadow {
     
        如下是通过@include box-shadow;调用的，编译正常
       width: 100px;
       height: 100px;
       -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
       box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
       
       
       如下是通过@include box-shadow(8px,8px,0 0 1px rgba(#000,.5));调用的，编译也正常
       width: 8px;
       height: 8px;
       -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
       box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
       
       如下是通过@include box-shadow(80px,80px,0 0 1px rgba(#000,.5) , 1 1 2px rgba(#000,.6) , 1 1 2px rgba(#000,.6));调用的
       width: 80px;
       height: 80px;
       -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.5),1 1 2px rgba(0, 0, 0, 0.6),1 1 2px rgba(0, 0, 0, 0.6);
       box-shadow: 0 0 1px rgba(0, 0, 0, 0.5),1 1 2px rgba(0, 0, 0, 0.6),1 1 2px rgba(0, 0, 0, 0.6);
     }
     
     我们在看看第三个参数，传递多个值试试
     
     说明多个值的参数，传递正常
     
     