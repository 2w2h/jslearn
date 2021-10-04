module.exports = {
    bubble(inputArr) {
        let len = inputArr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (inputArr[j] > inputArr[j + 1]) {
                    let tmp = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tmp;
                }
            }
        }
        return inputArr;
    },
    _mergeArrays(a, b) {
        const c = []
        while (a.length && b.length) {
            c.push(a[0] > b[0] ? b.shift() : a.shift())
        }
        while (a.length) c.push(a.shift())
        while (b.length) c.push(b.shift())
        return c
    },
    merge(inputArr) {
        if (inputArr.length < 2) return inputArr
        const middle = Math.floor(inputArr.length / 2)
        const a_l = a.slice(0, middle)
        const a_r = a.slice(middle, inputArr.length)
        const sorted_l = mergeSort(a_l)
        const sorted_r = mergeSort(a_r)
        return this._mergeArrays(sorted_l, sorted_r)
    }
}
