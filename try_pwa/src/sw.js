// serviceWorker, 用作pwa控制缓存
// 需要与页面放在同一个位置, 避免scope问题

const cachedKey = 'pwa_cache_page'

// 缓存列表
const cacheList = [
    '/'
]

// sw初始化
self.addEventListener('install', (ev) => {
    // console.log(caches)
    ev.waitUntil(
        caches.open(cachedKey)
        .then(cache => {
            cache.addAll(cacheList)
            // console.log(cache)
            // console.log(caches)
        })
        .then(() => self.skipWaiting())
    )
})

// work offline, 如果不加这个，浏览器可能会认为页面无法在offline运行
self.addEventListener('fetch', (ev) => {
    // console.log(ev)
})