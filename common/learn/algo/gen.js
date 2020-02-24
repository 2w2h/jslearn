module.exports = {
    randNumbers(n = 10, min = 1, max = 10) {
        return [...Array(n)].map(x => {
            x;
            let randVal = Math.random();
            return Math.floor(randVal * (max - min + 1)) + min;
        });
    },
    rangeNumbers(n = 10, start = 0, step = 1) {
        return [...Array(n).keys()].map(x => x * step + start);
    },
}
