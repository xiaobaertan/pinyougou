(function() {
    window.addEventListener('DOMContentLoaded', function() {
        // 循环精灵图
        var lifes = document.querySelectorAll('.lifeservice li .service-ico');
        for (var i = 0; i < lifes.length; i++) {
            var index = -24 * i;
            lifes[i].style.backgroundPosition = '0' + 'px ' + index + 'px';
        }

        // 电梯导航
        var toolTop = $(".recommend").offset().top;
        var barTop = $(".slider_bar").offset().top - $(".nav").offset().top;
        var goBack = document.querySelector('.goBack');
        // 添加 节流阀是为了在跳转页面时不检查视口位置
        var flag = true;
        // 检查电梯位置 切换显示隐藏状态
        function toggleTool() {
            if ($(document).scrollTop() >= toolTop) {
                $(".fixedtool").fadeIn();
            } else {
                $(".fixedtool").fadeOut();
            }
        }
        // 检查鼠标滚动到的位置 添加 li 的样式 电梯导航
        $(window).scroll(function() {
            toggleTool();
            if (flag) {
                $(".floor .w").each(function(i, e) {
                    if ($(document).scrollTop() >= $(e).offset().top) {
                        $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                    }
                })
            }
            // 过了 nav 的位置就变成 相对定位 返回顶部 
            if ($(document).scrollTop() >= $(".nav").offset().top) {
                $(".slider_bar").css("position", "fixed");
                $(".slider_bar").css("top", barTop + "px");
            } else {
                $(".slider_bar").css("position", "absolute");
                $(".slider_bar").css("top", "300px");
            }
            // 到 recommend 位置就显示文本 返回顶部
            if ($(document).scrollTop() >= $(".recommend").offset().top) {
                $(".goBack").css("display", "block");
            } else {
                $(".goBack").css("display", "none");
            }

        });
        // 绑定单机事件 动画移动到对应的视口位置  电梯导航
        $(".fixedtool li").click(function() {
                flag = false;
                var current = $(".floor .w").eq($(this).index()).offset().top;
                $("body, html").stop().animate({
                    scrollTop: current
                }, 1500, function() {
                    flag = true;
                });
                $(this).addClass("current").siblings().removeClass();
            })
            // 点击返回顶部 回到页面顶部
        goBack.addEventListener("click", function() {
            animate1(window, 0);
        })
        // 回到顶部动画

        function animate1(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                var step = Math.floor((target - obj.pageYOffset) / 10);
                if (obj.pageYOffset == target) {
                    clearInterval(obj.timer);
                    callback && callback();
                    return;
                }
                obj.scroll(0, obj.pageYOffset + step);
            }, 15);
        }
    })
})();