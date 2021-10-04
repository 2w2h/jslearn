/**
 * Иллюстрация полезности async
 */

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

/**
 * 1. Громоздкий вариант
 */
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

// оборачиваем функции в промисы, например так...
function promiseLoadTovars() {
    return new Promise((resolve) => {
        document.addEventListener("click", (e) => {
            loadTovars();
            resolve(e);
        });
    });
}

/**
 * 2. Лаконичный вариант
 */
async () => {
    await promiseLoadTovars();
    await promiseRenderTovars();
    await promiseShowOrHideButtons();
    await promiseCreateOrder();
    await promiseGetResult();
};
