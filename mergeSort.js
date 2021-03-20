let arr = [34, 2, -5, 0, 6];

function merge(arr1, arr2) {
    //
    return merged;
}

function mergeSort(arr) {
    if (arr.length < 2) return arr;
    if (arr.length === 2) {
        return arr[0] > arr[1] ? [arr[1], arr[0]] : arr;
    }
    let center = Math.floor(arr.length / 2);
    let first = arr.slice(0, center);
    let second = arr.slice(center);

    return merge(mergeSort(first), mergeSort(second));
}

console.log(mergeSort(arr));
