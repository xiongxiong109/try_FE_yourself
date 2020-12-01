// Promise retry util func

/**
 * 
 * @param {Promise} query 
 * @param {Number} maxCount 
 * @param {Number} duration 
 */
function retry(query, maxCount, duration) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let timer = null;

        function _fetch() {
            if (count >= maxCount) {
                reject('max count')
            } else {
                count++;
                query().then(resolve).catch(err => {
                    console.log(err)
                    console.log('retry')
                    clearTimeout(timer);
                    timer = setTimeout(_fetch, duration)
                })
            }
        }

        _fetch();

    })
}