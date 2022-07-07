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

let displayValue = '';
let hasDefaultZero = true;
const display = document.getElementById('display');

/**
 * Used for displaying numbers.
 */
function displayNumber() {
    if (hasDefaultZero && this.textContent !== '0') {
        hasDefaultZero = false;
    }
    if (!hasDefaultZero) {
        displayValue += this.textContent;
        display.textContent = `${displayValue}`;
    }
}

function clearDisplay() {
    display.textContent = '';
    displayValue = '';
}

const precedence = {
    '+': 0,
    '-': 0,
    '×': 1,
    '÷': 1,
}

/**
 * Evaluates infix expression and returns the result.
 */
function evaluate() {
    let token = '';
    let valueStack = [];
    let opStack = [];
    let wasNumber = false;
    for (let i = 0; i < displayValue.length; i++) {
        token = displayValue.charAt(i);
        if (wasNumber && Number.isInteger(Number(token))) {
            valueStack[valueStack.length - 1] += token;
        } else if (Number.isInteger(Number(token))) {
            wasNumber = true;
            valueStack.push(token);
        } else {
            wasNumber = false;
            while (opStack.length > 0 && precedence[opStack[opStack.length - 1]]
                >= precedence[`${token}`]) {
                let secondVal = valueStack.pop();
                valueStack.push(operate(opStack.pop(), valueStack.pop(), secondVal));
            }
            opStack.push(token);
        }
    }
    while (opStack.length > 0) {
        let secondVal = valueStack.pop();
        valueStack.push(operate(opStack.pop(), valueStack.pop(), secondVal));
    }
    return valueStack[0];
}

/**
 * For simplicity, use this function to Hook up buttons to event listeners.
 */
function setUp() {
    const numbers = Array.from(document.querySelectorAll('.number'));
    numbers.forEach((number) => number.addEventListener('click', displayNumber));

    const operators = Array.from(document.querySelectorAll('.operator'));
    operators.forEach((operator) => operator.addEventListener('click', displayNumber));

    const equals = document.getElementById('equals-button');
    equals.addEventListener('click', () => {
        displayValue = evaluate();
        display.textContent = `${displayValue}`;
    });

    const clear = document.getElementById('clear-button');
    clear.addEventListener('click', clearDisplay);
}

setUp();
