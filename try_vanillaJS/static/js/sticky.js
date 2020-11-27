const oWrapper = document.querySelector('#j_sticky_scroller')

function initMockScrollPanel() {
    // 生成mock滚动数据
    let domStr = ''
    for (let i = 0; i < 26; i++) {
        domStr += renderItem(String.fromCharCode(i + 65))
    }
    // oWrapper.innerHTML = `<div class="container">${domStr}</div>`;
    oWrapper.innerHTML = domStr
}

function renderItem(char) {
    const rand = Math.floor(Math.random() * 10 + 2);
    let liStr = ''

    for (let i = 0; i < rand; i++) {
        liStr += '<li>sdsdsd</li>'
    }

    return `<div class="sticky-panel">
    <p class="sticky-title" data-sticky="${char}">${char}</p>
    <ul>
        ${liStr}
    </ul>
</div>`
}

function initStickyBar() {
    const p = document.createElement('p')
    p.className = 'sticky-title sticky-bar'
    p.innerText = stacks[0];
    oWrapper.parentNode.insertBefore(p, oWrapper)
    return p
}

// 初始化dom结构
initMockScrollPanel()

// 插入一个stickyBar
const oTitles = document.querySelectorAll('.sticky-title')
const oPanels = document.querySelectorAll('.sticky-panel');

const stacks = [];
const heights = [];

for (let i = 0; i < oTitles.length; i++) {
    stacks.push(oTitles[i].dataset.sticky)
}

// 初始化stickybar
const oBar = initStickyBar()

// 存储所有的高度
for (let i = 0; i < oPanels.length; i++) {
    heights.push(oPanels[i].offsetHeight + oPanels[i].offsetTop - 22)
}

let curIdx = -1;

// 监听滚动事件
oWrapper.addEventListener('scroll', onScroll)

function onScroll(ev) {
    const scrollT = ev.currentTarget.scrollTop;
    if (scrollT <= 0) {
        oBar.style.transform = 'translateY(0)';
        oBar.innerText = oTitles[0].dataset.sticky;
        return;
    }
    // 因为heights是有序排列的递增数据，应该可以考虑二分查找height中最接近当前滚动的数值, 这样可以避免更多的循环
    const curIndex = binSearch(heights, scrollT);
    // console.log(curIndex)

    const curH = heights[curIndex];
    const nextH = heights[curIndex + 1];

    if (scrollT > curH && scrollT < nextH) {
        const disH = scrollT - curH;
        if (disH <= oBar.offsetHeight) {
            oBar.style.transform = `translateY(-${disH}px)`
            oBar.innerText = oTitles[curIndex].dataset.sticky
        } else {
            oBar.style.transform = 'translateY(0)';
            // 更新文字
            oBar.innerText = oTitles[curIndex + 1].dataset.sticky
        }
    }

    // 无非是遍历所有的heights
    // for (let i = 0; i < heights.length - 1; i++) {
    //     // 线性搜索的话，需要n次，而binary_search则是logN
    //     console.log('linear search')
    //     const curH = heights[i];
    //     const nextH = heights[i + 1];
    //     if (scrollT > curH && scrollT < nextH) {
    //         const disH = scrollT - curH;
    //         if (disH <= oBar.offsetHeight) {
    //             oBar.style.transform = `translateY(-${disH}px)`
    //             oBar.innerText = oTitles[i].dataset.sticky
    //         } else {
    //             oBar.style.transform = 'translateY(0)';
    //             // 更新文字
    //             oBar.innerText = oTitles[i + 1].dataset.sticky
    //         }
    //         // 添加break减少loop
    //         break;
    //     }
    // }
}

function binSearch(heights, curScroll) {
    // 二分的开始和结束指针
    let start = 0, end = heights.length;
    // 向下取整
    while (start <= end) {
        // console.log('bin search')
        let mid = Math.floor((end + start) / 2);
        if (heights[mid] <= curScroll && heights[mid + 1] > curScroll) {
            return mid
        } else {
            if (heights[mid] > curScroll) {
                end = mid - 1
            } else {
                start = mid + 1
            }
        }
    }
    return -1
}