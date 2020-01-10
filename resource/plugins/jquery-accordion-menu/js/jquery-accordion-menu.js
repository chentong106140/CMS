; (function($, window, document, undefined) {
    var pluginName = "jqueryAccordionMenu";
    var defaults = {
        speed: 300,//下拉框显示出来的动画时长
        showDelay: 0,//下拉框显示出来之前需要延迟的时长
        hideDelay: 0,//下拉框隐藏之前需要延迟的时长
        singleOpen: true,//是否控制点击一个菜单其他下拉框是否同时被关闭
        clickEffect: true//添加菜单点击特效（点击的地方存在波纹放大效果）
    };
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({},
        defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init()
    };
    $.extend(Plugin.prototype, {
        init: function() {
            this.openSubmenu();
            this.submenuIndicators();
            if (defaults.clickEffect) {
                this.addClickEffect()
            }
        },
        /**
         * 注册li标签点击事件，控制下拉菜单显示或者隐藏
         */
        openSubmenu: function() {
            $(this.element).children("ul").find("li").bind("click touchstart",
            function(e) {
                e.stopPropagation();
                //e.preventDefault();
                //判断当前li下面是否存在下级菜单
                if ($(this).children(".submenu").length > 0) {
                    if ($(this).children(".submenu").css("display") == "none") {
                        $(this).children(".submenu").delay(defaults.showDelay).slideDown(defaults.speed);
                        //添加a标签submenu-indicator-minus样式名，目的是为了将该样式名下的+号字符，添加旋转动画，使+号变成x号，该动画提前在css文件中约定好，只有父元素具有submenu-indicator-minus样式名的元素才添加动画，
                        $(this).children(".submenu").siblings("a").addClass("submenu-indicator-minus");
                        //判断是否需要单独打开，如果需要单独打开，那么当前li的同辈li元素下的下级菜单都被关闭，只打开当前的li
                        if (defaults.singleOpen) {
                            //找到当前li标签的同辈元素下的子元素ul.submenu，进行关闭操作
                            $(this).siblings().children(".submenu").slideUp(defaults.speed);
                            //移除当前li标签的同辈元素下的子元素ul.submenu的同辈元素a标签（标题），移除样式名，目的是将x号变成+号
                            $(this).siblings().children(".submenu").siblings("a").removeClass("submenu-indicator-minus")
                        }
                        return false
                    } else {
                        //如果当前li标签下的ul.submenu下级菜单是打开状态，将执行关闭动作
                        $(this).children(".submenu").delay(defaults.hideDelay).slideUp(defaults.speed)
                    }
                    //如果当前li下面的标题a标签，存在css动效，将移除
                    if ($(this).children(".submenu").siblings("a").hasClass("submenu-indicator-minus")) {
                        $(this).children(".submenu").siblings("a").removeClass("submenu-indicator-minus")
                    }
                }
                //控制页面跳转
                //window.location.href = $(this).children("a").attr("href")
            })
        },
        /**
         * 为每一个存在下级菜单的li标签下的a标签添加+字符
         */
        submenuIndicators: function() {
            if ($(this.element).find(".submenu").length > 0) {
                $(this.element).find(".submenu").siblings("a").append("<span class='submenu-indicator'>+</span>")
            }
        },
        /**
         * 为a标签添加点击特效，点击的地方存在一个波纹放大的效果
         */
        addClickEffect: function() {
            var ink, d, x, y;
            //为当前li标签下的a标签绑定click事件
            $(this.element).find("a").bind("click touchstart",
            function(e) {
                $(".ink").remove();
                if ($(this).children(".ink").length === 0) {
                    //为当前a标签内部前置插入span元素
                    $(this).prepend("<span class='ink'></span>")
                }
                ink = $(this).find(".ink");
                //先移除动画
                ink.removeClass("animate-ink");
                //如果span元素没有设置宽高
                if (!ink.height() && !ink.width()) {
                    //去a标签的最大宽高，
                    d = Math.max($(this).outerWidth(), $(this).outerHeight());
                    //设置span元素宽高
                    ink.css({
                        height: d,
                        width: d
                    })
                }
                //x = 鼠标x轴 - a标签的x轴 - span元素的宽度 / 2
                //鼠标x轴 - a标签的x轴  = 当前鼠标距离a标签的距离
                //当前鼠标距离a标签的距离 - span元素的宽度 / 2 = 控制span元素的x轴坐标距离当前鼠标位置向左偏移span宽度一半的大小
                
                //为什么要向左偏移一半的大小呢？
                //由于点击a标签的时候，需要让span元素产生动画，而动画效果是让span元素放大1.5倍
                //而放大1.5倍的效果必须是当前鼠标点击的位置开始放大，而scale放大效果是在元素中心点开始放大
                //所以，为了让放大效果正好在鼠标点击的地方，所以需要让span元素向左偏移，
                // 保证鼠标点击的地方，正常是span的中心点，所以，为什么每次点击a标签，存在一个特效是从鼠标点击的地方开始向外放大的效果
                
                //注意点:虽然上面设置了元素的宽高，但是，在css中设置了scale(0),
                //也就是说，虽然设置了span元素的宽高，但元素却是最小化的，等于没有宽高
                //默认情况下是没有宽高大小，点击的时候，基于鼠标点击的中心点开始放大1.5倍，也就实现了放大动效是跟着鼠标的点击的地方开始放大的。
                x = e.pageX - $(this).offset().left - ink.width() / 2;
                y = e.pageY - $(this).offset().top - ink.height() / 2;
                //设置span元素的位置的中心点在鼠标点击的地方
                //并且添加动画，放大1.5倍后，元素被隐藏
                ink.css({
                    top: y + 'px',
                    left: x + 'px'
                }).addClass("animate-ink")
            })
        }
    });
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options))
            }
        });
        return this
    }
})(jQuery, window, document);