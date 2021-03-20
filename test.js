function loadTovars() {
    console.log('loadTovars');
}
function renderTovars() {
    console.log('renderTovars');
}
function showOrHideButtons() {
    console.log('showOrHideButtons');
}
function createOrder() {
    console.log('createOrder');
}
function getResult() {
    console.log('getResult');
}

document.addEventListener("input", (e) => {
    document.addEventListener("load", (e) => {
        document.addEventListener("change", (e) => {
            document.addEventListener("click", (e) => {
                document.addEventListener("load", (e) => {
                    getResult();
                });
                createOrder();
            });
            showOrHideButtons();
        });
        renderTovars();
    });
    loadTovars();
});

// ...
function promiseLoadTovars() {
    return new Promise((resolve) => {
        document.addEventListener("click", (e) => {
            loadTovars();
            resolve(e);
        });
    }));
}


async () => {
    await promiseLoadTovars();
    await renderTovars();
    await showOrHideButtons();
    await createOrder();
    await getResult();
};


let string = "hello world";
let obj = {};
for (var i = 0; i < string.length; i++) {
    let letter = string[i];
    if (letter === ' ')  continue;
    if (!obj[letter]) {
        obj[letter] = 0;
    }
    obj[letter]++;
}
console.log(obj);
console.log(Object.keys(obj).length);
