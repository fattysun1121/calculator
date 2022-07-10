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
    return Number(y) === 0 ? 'OOPS' : Number(x) / Number(y);
}

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '×':
            return multiply(x, y);
        case '÷':
            return divide(x, y);
    }
}

const OPERATORS = ['+', '-', '×', '÷'];
let displayValue = '0';
let firstDigitIsZero = true;
let wasNumber = true;
const display = document.getElementById('display');



/**
 * Displays numbers and operators and save them for later evaluation.
 *
 */
function displayToken() {
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

        displayValue += token;
        display.textContent = `${displayValue}`;
        wasNumber = true;
    } else if (!OPERATORS.includes(displayValue.charAt(displayValue.length - 1)) && wasNumber) {
        if (isSecondOp()) {

        }
        displayValue += token;
        display.textContent = `${displayValue}`;
        wasNumber = false;
    }
}



function isSecondOp() {
    const expression = displayValue.split('');
    expression.forEach(token => {
        if (OPERATORS.includes(token)) {
            return true;
        }
    });
    return false;
}
function clearDisplay() {
    display.textContent = '0';
    displayValue = '0';

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

    const equals = document.getElementById('equals-button');


    const clear = document.getElementById('clear-button');
    clear.addEventListener('click', clearDisplay);
}

setUp();
