window.addEventListener('load', function() {
    //循环精灵图
    var mods = document.querySelectorAll('.mod_service li i');
    for (var i = 0; i < mods.length; i++) {
        var index = -49 * i;
        mods[i].style.backgroundPosition = '-26' + 'px ' + index + 'px';
    }
})