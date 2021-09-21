const { EventBus } = require('../src/utils/EventBus')

const test1 = new EventBus()

describe('test eventbus', () => {
    test('on', () => {
        const test1Fn = jest.fn((data) => data);
        const test2Fn = jest.fn((data) => data);
        const test3Fn = jest.fn((data) => data);
        test1.on('event1', test1Fn)
        test1.on('event1', test2Fn)
        test1.on('event2', test3Fn)

        // 触发event1 期望test1Fn与test2Fn被调用，而test3Fn不被调用，并data传入正确

        test1.emit('event1', 'test1')

        expect(test1Fn.mock.calls.length).toBe(1);
        expect(test1Fn.mock.results[0].value).toBe('test1');
        expect(test2Fn.mock.calls.length).toBe(1);
        expect(test2Fn.mock.results[0].value).toBe('test1');
        expect(test3Fn.mock.calls.length).toBe(0);
    })
    test('un', () => {
        const test1Fn = jest.fn((data) => data);
        const test2Fn = jest.fn((data) => data);
        test1.on('event1', test1Fn)
        test1.on('event1', test2Fn)
        test1.un('event1', test2Fn)

        // 添加test2Fn监听后un掉fn2的监听，再去触发event1

        test1.emit('event1', 'test1')

        expect(test1Fn.mock.calls.length).toBe(1);
        expect(test1Fn.mock.results[0].value).toBe('test1');
        expect(test2Fn.mock.calls.length).toBe(0);
    })
    // emit前两个测了
})