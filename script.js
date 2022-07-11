function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return Number(x) - Number(y);
}

function multiply(x, y) {
    return Number(x) * Number(y);
}

function divide(x, y) {
    return Number(y) === 0 ? 'ERROR' : Number(x) / Number(y);
}

function operate(operator, x, y) {
    let result;
    switch (operator) {
        case '+':
            result = add(x, y);
            break;
        case '-':
            result = subtract(x, y);
            break;
        case '×':
            result = multiply(x, y);
            break;
        case '÷':
            result = divide(x, y);
            break;
    }
    return Math.round(result * 1000) / 1000;
}

const OPERATORS = ['+', '-', '×', '÷'];
let displayValue = '0';
let firstDigitIsZero = true;
let wasNumber = true;
let hasDot = false;
let op = '';
const display = document.getElementById('display');



/**
 * Displays numbers and operators and save them for later evaluation.
 */
function displayToken() {
    if (displayValue !== 'ERROR')
    {
        let token = this.textContent;

        if (Number.isInteger(Number(token))) {
            if (firstDigitIsZero) {  // For convenience, give the calculator a default value of
                if (token !== '0') {    // 0. If the user inputs another number, replace the zero
                    firstDigitIsZero = false;  // by it.
                }
                displayValue = displayValue.substring(0, displayValue.length - 1);
            }
            if (!wasNumber && token === '0') {  // record if user inputs a zero after an operator
                firstDigitIsZero = true;
            }
            wasNumber = true;
        } else if (OPERATORS.includes(token)) {
            if (!wasNumber) {
                displayValue = displayValue.substring(0, displayValue.length - 1);
            } else if (isSecondOp()) {
                displayValue = evaluate().toString();
            }
            op = token;
            firstDigitIsZero = false;
            wasNumber = false;
            hasDot = false;
        } else if (hasDot){
            return
        } else {
            hasDot = true;
        }
        displayValue += token;
        display.textContent = `${displayValue}`;
    }
}

function evaluate() {
    let firstNum = displayValue.substring(0, displayValue.indexOf(op));
    let secondNum = displayValue.substring(displayValue.indexOf(op) + 1);

    if (!secondNum || !op) {
        return displayValue;
    }
    return operate(op, firstNum, secondNum);
}

function isSecondOp() {
    const expression = displayValue.split('');
    for (let token of expression) {
        if (OPERATORS.includes(token)) {
            return true;
        }
    }
    return false;
}
function clearDisplay() {
    display.textContent = '0';
    displayValue = '0';
    firstDigitIsZero = true;

}

const precedence = {
    '+': 0,
    '-': 0,
    '×': 1,
    '÷': 1,
}


/**
 * For simplicity, use this function to Hook up buttons to event listeners.
 */
function setUp() {
    const numbers = Array.from(document.querySelectorAll('.number'));
    numbers.forEach((number) => number.addEventListener('click', displayToken));

    const operators = Array.from(document.querySelectorAll('.operator'));
    operators.forEach((operator) => operator.addEventListener('click', displayToken));

    const dot = document.getElementById('dot');
    dot.addEventListener('click', displayToken);

    const equals = document.getElementById('equals-button');
    equals.addEventListener('click', () => {
        displayValue = evaluate().toString();
        op = '';
        display.textContent = `${displayValue}`;
    });

    const clear = document.getElementById('clear-button');
    clear.addEventListener('click', clearDisplay);
}

setUp();
