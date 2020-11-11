// 实现元素拖拽
; (function () {
    document.addEventListener('DOMContentLoaded', () => {
        initDrag('#container')
        initDrag('#container_2')
    });

    function initDrag(domId = '') {
        const oDragger = document.querySelector(domId);

        if (!oDragger) {
            throw new Error(`${domId} not found`)
        }

        // 用addEventListener绑定dom事件
        // 但是onmousemove 和 onmouseup的事件，用 on 对document绑定
        // 可以保证move事件的唯一性
        oDragger.addEventListener('mousedown', onDomMouseDown);

        let startX = 0, startY = 0;

        // 元素被按下
        function onDomMouseDown(ev) {
            oDragger.style.cursor = 'grabbing';

            startX = ev.clientX - oDragger.offsetLeft;
            startY = ev.clientY - oDragger.offsetTop;

            document.onmousemove = onDocMouseMove;

            document.onmouseup = onDocMouseUp
        }

        function onDocMouseMove(ev) {
            let disX = ev.clientX - startX;
            let disY = ev.clientY - startY;
            // 计算边界值
            if (disX < 0) {
                disX = 0;
            }
            // 限制在父容器里
            if (disX > oDragger.parentNode.offsetWidth - oDragger.offsetWidth) {
                disX = oDragger.parentNode.offsetWidth - oDragger.offsetWidth;
            }
            if (disY > oDragger.parentNode.offsetHeight - oDragger.offsetHeight) {
                disY = oDragger.parentNode.offsetHeight - oDragger.offsetHeight;
            }
            if (disY < 0) {
                disY = 0
            }
            oDragger.style.left = `${disX}px`;
            oDragger.style.top = `${disY}px`;
        }

        function onDocMouseUp() {
            oDragger.style.cursor = 'grab';
            document.onmousemove = null;
            document.onmouseup = null;
        }

    }
})();