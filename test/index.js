function commonCheck(list = [], key = '', keyName = '') {
    // 提取键对应的值，并过滤掉空值
    const keyList = list.map(i => i[key]).filter(i => (i !== '' && i !== null && i !== undefined));

    // 如果值列表为空，即没有需要校验的值，则直接返回 true
    if (keyList.length === 0) {
        mockMessage.success('success')
        return true;
    }

    // 检查值列表是否全部一致
    const flag = keyList.every(i => i === keyList[0]);

    if (flag) {
        mockMessage.success('success')
        return true; // 值列表全部一致，返回 true
    } else {
        // 值列表不一致，显示错误提示信息，并返回 false
        //   this.$message.error(`[${keyName}]状态不一致，请检查`);
        const message = `[${keyName}]状态不一致，请检查`;
        mockMessage.error(message);
        return false;
    }
}

// 创建一个模拟的消息对象
const mockMessage = {
    error: (message) => console.log(`Error message: ${message}`),
    success: (message) => console.log(`Success message: ${message}`),
};

// 测试用例
commonCheck([]); // 输出：true，因为列表为空

commonCheck([{ key: 'A' }], 'key', 'Key'); // 输出：true，因为只有一个值

commonCheck([{ key: null }], 'key', 'Key'); // 输出：true，因为只有一个值，且键为空

commonCheck([{ key: 'B' }], 'key', 'Key'); // 输出：true，因为只有一个值

commonCheck([{ key: 'C' }, { key: 'C' }, { key: 'C' }], 'key', 'Key'); // 输出：true，因为所有值都相同

commonCheck([{ key: 'D' }, { key: 'E' }, { key: 'F' }], 'key', 'Key'); // 输出：false，并显示错误提示信息
