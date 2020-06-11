// 1. Вывести "Silence is golden"
function print(message = "Silence is golden") {
    console.log(message)
}

// 2. Вывести день недели, месяц и имя
function printWeekDayAndMonthAndName(name) {
    let weekDayFormatter = new Intl.DateTimeFormat('ru-RU', { weekday: "long" })
    let monthFormatter = new Intl.DateTimeFormat('ru-RU', { month: "long" })

    let d = new Date()
    print(weekDayFormatter.format(d))
    print(monthFormatter.format(d))
    print(name)
}

// 3. Вывести на экран пять строк из нулей, причем количество нулей в каждой строке равно номеру строки
function zeroLines(lineCount = 5) {
    while(lineCount > 0) {
        print("0".repeat(lineCount))
        lineCount--
    }
}

// 4. Вывести на экран прямоугольник, заполненный буквами А. Количество строк в прямоугольнике равно 5, количество столбцов равно 8.
function aRectangle(rowCount = 5, columnCount = 8) {
    while(rowCount > 0) {
        print("A".repeat(columnCount))
        rowCount--
    }
}

// 5. Вывести на экран букву "W" из символов "*" (звездочка).
function wPrint() {
    print('*     *     *')
    print(' *   * *   * ')
    print('  * *   * *  ')
    print('   *     *   ')
}

// Вывести на экран результат вычисления 1+2−4.
function calc() {
    return  print(1 + 2 - 4)
}

function run() {
    print()
    printWeekDayAndMonthAndName("Олег")
    zeroLines()
    aRectangle()
    wPrint()
    calc()
}
run()