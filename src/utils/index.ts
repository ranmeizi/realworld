type anyFn = (...args: any[]) => any

export function throttle(fn: anyFn, delay: number) {
    let prevTime = 0
    return function (this: unknown, ...args: any[]) {
        const now = new Date().getTime()
        if (now - prevTime > delay) {
            fn.apply(this, args)
            prevTime = now
        }
    }
}

export function debounce(fn: anyFn, delay: number) {
    let timer: any = null
    return function (this: unknown, ...args: any[]) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
        }, delay);
    }
}
