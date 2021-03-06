// 指定图表的配置项和数据
var option = {
    baseOption: {
        backgroundColor: '#2c343c',
        title: {
            text: '自定义饼图',
            left: 'center',
        },
        /**
         * 提示框组件。
         */
        tooltip: {
            /**
             * 触发类型。
             * 'item' 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
             * 'axis' 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
             * 'none' 什么都不触发。
             */
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        /**
         * visualMap 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
         *
         * symbol: 图元的图形类别。
         * symbolSize: 图元的大小。
         * color: 图元的颜色。
         * colorAlpha: 图元的颜色的透明度。
         * opacity: 图元以及其附属物（如文字标签）的透明度。
         * colorLightness: 颜色的明暗度，参见 HSL。
         * colorSaturation: 颜色的饱和度，参见 HSL。
         * colorHue: 颜色的色调，参见 HSL。
         */
        visualMap: {
            show: true,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        /**
         * 图例组件。
         */
        legend: {
            show: true,
            right: 'right',
            top: 50,
            textStyle: {
                color: 'red'
            }
        },
        /**
         * 工具栏
         */
        toolbox: {
            /**
             * 各工具配置项。
             */
            feature: {
                /**
                 * 保存为图片。
                 */
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                /**
                 * 饼图的半径
                 *
                 * number：直接指定外半径值。
                 * string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
                 * Array.<number|string>：数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。
                 */
                radius: '75%',
                /**
                 * 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
                 * 支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
                 */
                center: ['50%', '50%'],
                data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 274, name: '联盟广告'},
                    {value: 235, name: '视频广告'},
                    {value: 400, name: '搜索引擎'}
                ].sort(function (a, b) {
                    return a.value - b.value;
                }),
                /**
                 * 是否展示成南丁格尔图，通过半径区分数据大小
                 * 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
                 * 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
                 */
                roseType: 'radius',
                /**
                 * 饼图图形上的文本标签
                 */
                label: {
                    normal: {
                        textStyle: {
// color: 'rgba(255, 255, 255, 0.3)',
//color:'red'
                        }
                    }
                },
                /**
                 * 标签的视觉引导线样式
                 */
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        /**
                         * 是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示，也可以设置为 0 到 1 的值，表示平滑程度。
                         */
                        smooth: 0.2,
                        /**
                         * 视觉引导线第一段的长度。
                         */
                        length: 100,
                        /**
                         * 视觉引导项第二段的长度。
                         */
                        length2: 50
                    }
                },
                /**
                 * 图形样式。
                 */
                itemStyle: {
                    normal: {
                        /**
                         * 图形的颜色。 默认从全局调色盘 option.color 获取颜色
                         */
//color: '#c23531',
                        /**
                         * 图形阴影的模糊大小。
                         */
                        shadowBlur: 200,
                        /**
                         * 阴影颜色。
                         */
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                /**
                 * 初始动画效果
                 * expansion' 默认研圆弧展开的效果。
                 * 'scale' 缩放效果，配合设置 animationEasing='elasticOut' 可以做成 popup 的效果。
                 */
                animationType: 'scale',
                /**
                 * 初始动画的缓动效果。不同的缓动效果可以参考 缓动示例。
                 */
                animationEasing: 'elasticOut',
                /**
                 * 初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果。
                 * @param idx
                 * @returns {number}
                 */
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    }
};