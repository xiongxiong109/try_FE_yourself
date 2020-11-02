// serviceWorker, 用作pwa控制缓存
// 需要与页面放在同一个位置, 避免scope问题

const cachedKey = 'pwa_cache_page'

// 缓存列表
const cacheList = [
    '/',
    '/static/icon_1.png'
]

// sw初始化
self.addEventListener('install', (ev) => {
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
    // 可以使用delete删除缓存
    // caches.delete(ev.request)
    ev.respondWith(
        // 需要用这个caches来精确控制，使之成为离线应用
        // 匹配缓存文件
        caches.match(ev.request)
        .then(response => {
            // 命中缓存，返回缓存结果, 此处可以实现离线缓存, 网络应用设置为offline后，可以直接访问, 在资源中会变成 size: ServiceWorker
            if (response) {
                console.log('cached response')
                console.log(response)
                return response
            }
            // 继续网络请求
            return fetch(ev.request)
        })
    )
})