// 异步并发任务限制

/**
 * 
 * @param {*} asyncTasks 异步任务队列
 * @param {*} maxCount 最大同时执行的异步任务数
 */
function asyncAllLimitRunner(asyncTasks = [], maxCount = 2, options = {}) {
    // 当前在执行的任务数
    let curTaskTotal = 0;
    const rst = new Array(asyncTasks.length);
    let totalRunned = 0;
    const totalLen = asyncTasks.length;

    return new Promise((resolve, reject) => {
        // 没有异步队列
        if (!asyncTasks.length) {
            reject([])
        } else {
            _loopTask(resolve);
        }
    })

    function _loopTask(resolve) {

        options.onRunning && options.onRunning({
            totalLen,
            totalRunned,
            curTaskTotal,
            maxCount,
            rst
        })

        // 所有任务执行完成后，resolve
        if (totalRunned == totalLen) {
            // id其实是倒序的
            return resolve(rst.reverse())
        } else {
            // 最大任务数控制在maxCount
            if (curTaskTotal < maxCount && asyncTasks.length) {
                curTaskTotal++;
                // id是倒着的
                const taskId = asyncTasks.length - 1;
                const curTask = asyncTasks.shift();

                // 任务结束, total -1 ,给下一个task留出空位
                curTask
                    .then(taskRst => {
                        rst[taskId] = taskRst;
                        curTaskTotal--; // 调度数-1
                        totalRunned++; // 整个任务完成数 + 1
                        _loopTask(resolve);
                    })
                    .catch(err => {
                        rst[taskId] = err;
                        curTaskTotal--;
                        totalRunned++;
                        _loopTask(resolve);
                    })
                _loopTask(resolve);
            }
        }
    }
}


function pr1(rst, duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(rst)
        }, duration)
    })
}

const oAsyncAllBtn = document.querySelector('#j_async_all');
const oProbar = document.querySelector('#j_progress_bar .pro-inner');
const oStateInfo = document.querySelector('#j_state_info')

oAsyncAllBtn.addEventListener('click', () => {
    oAsyncAllBtn.setAttribute('disabled', 'disabled')
    asyncAllLimitRunner([
        pr1('okok', 4e3),
        pr1('111', 1e3),
        pr1('222', 5e3),
        pr1('333', 2e3),
        pr1('444', 3e3),
        pr1('4545', 3e3),
        pr1('okoksss', 8e3)
    ], 3, {
        // 获取执行中的一些状态
        onRunning: function (info) {
            const { totalRunned, totalLen } = info;
            const totalPersent = (totalRunned / totalLen) * 100;
            oProbar.style.width = `${totalPersent}%`;
            oStateInfo.innerHTML = `
            总任务数: ${info.totalLen}<br>
            当前有${info.curTaskTotal}个任务在执行, <br>
            已执行任务数: ${totalRunned},<br>
            最大限制数: ${info.maxCount},<br>
            当前执行结果: ${info.rst.toString()}
            `
        }
    })
        .then(rst => {
            console.log(rst);
            oAsyncAllBtn.removeAttribute('disabled')
        })
})