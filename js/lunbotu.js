(function() {
    window.addEventListener('load', function() {
        // alert('1'); 测试
        // 1. 获取元素
        var arrow_l = document.querySelector('.arrow-l');
        var arrow_r = document.querySelector('.arrow-r');
        var focus = document.querySelector('.focus');
        var focusWidth = focus.offsetWidth;
        // 定义一个全局变量 来记录当前显示的是第几张
        var num = 0;
        // 控制小圆圈的播放
        var circle = 0;
        var timer = null;
        var flag = true;
        // 2. 鼠标移入focus 显示隐藏小箭头
        focus.addEventListener('mouseenter', function() {
            arrow_l.style.display = 'block';
            arrow_r.style.display = 'block';
            clearInterval(timer);
            timer = null;
        });
        focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                // 触发单击事件 
                arrow_r.click();
            }, 2000);
        });
        // 3. 动态生成小圆圈 有几张图片, 就生成几个小圆圈
        var ul = focus.querySelector('ul');
        var ol = focus.querySelector('.circle');
        // console.log(ul.children.length);
        for (var i = 0; i < ul.children.length; i++) {
            // 创建一个小li
            var li = document.createElement('li');
            // 记录当前小圆圈的索引号 通过自定义属性来做
            li.setAttribute('index', i);
            // 把li插入到 ol 里面
            ol.appendChild(li);
            // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时 直接绑定点击事件
            li.addEventListener('click', function() {
                // 干掉所有人 把所有 li 清除 current 类名
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                // 留下我自己 当前的 li 设置 current 类名
                this.className = 'current';
                // 5. 点击小圆圈, 移动图片 当然移动的是 ul
                // ul 的移动距离 小圆圈的索引号*图片的宽度 注意是负值
                // 当我们点击了某个小 li  就拿到当前li 的索引号
                var index = this.getAttribute('index');
                // 点击小点的时候 把 索引号给num
                num = index;
                // 点击小点的时候 把 num 给 circle (小圆圈的索引)
                circle = num;
                animate(ul, -index * focusWidth);
            })
        }
        // 把 ol 里面的第一个li设置类名为 current
        ol.children[0].className = 'current';
        // 6. 克隆第一张图片 放到 ul 最后面
        var first = ul.children[0].cloneNode(true);
        ul.appendChild(first);
        // 7. 点击右侧按钮 图片滚动一张

        // 左侧按钮
        arrow_l.addEventListener('click', function() {
            if (flag) {
                flag = false;
                // 如果到了第一个图片
                if (num == 0) {
                    // 瞬间让ul 显示 假的第一张图片
                    num = ul.children.length - 1;
                    ul.style.left = -num * focusWidth + 'px';
                }
                num--;
                // 挪动
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                // 8. 点击左侧按钮, 小圆圈跟着一起变化
                circle--;
                // 如果 circle <0 说明第一张图片 则小圆圈要改成 第四个
                if (circle < 0) {
                    circle = ol.children.length - 1;
                }
                circleChange();
            }
        });
        // 右侧按钮
        arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false;
                // 如果走到了最后复制的一张图片, 此时 我们的ul 要快速复原 left 为 0
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                // 挪动
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                // 8. 点击左侧按钮, 小圆圈跟着一起变化
                circle++;
                // 如果 circle = 4  说明走完了
                if (circle == ol.children.length) {
                    circle = 0;
                }
                // 调用函数
                circleChange();
            }
        });
        // 小圆点排他函数
        function circleChange() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
        // 开启一个定时器 每隔2s 触发单机右箭头的单机事件
        timer = setInterval(function() {
            // 触发单击事件 
            arrow_r.click();
        }, 2000);
    })
})();