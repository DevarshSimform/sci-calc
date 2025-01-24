// Selectors
const btn = document.querySelector('body');
let outputDisplay = document.querySelector('#disp');
let outputValue = outputDisplay.textContent;

const mstore = document.querySelector('.mstore');
const mplus = document.querySelector('.mplus');
const msubtract = document.querySelector('.msubtract');
const mclear = document.querySelector('.mclear');
const mrecall = document.querySelector('.mrecall');

let storeM = 0;
let dotFlag = true;

// console.log(outputValue);


// Utility Functions
function checkDigitAtLast() {
    const lastDigit = outputValue.at(-1);
    return lastDigit >= '0' && lastDigit <= '9';
}

function updateOutput(val) {
    outputValue = val;
    outputDisplay.textContent = outputValue;
}

function addValue(val) {
    if (outputValue === '0') {
        replaceInitialZero(val);
    } else if (val === '.') {
        addPoint(val);
    } else if (val === '^') {
        squareEvent(val);
    } else if (val === '1/') {
        divideByOne(val);
    } else {
        // To handle "dot should repeat after operator" 
        if(checkDigitAtLast()){
            dotFlag = true;
        }
        outputValue += val;
        updateOutput(outputValue);
    }
}

function replaceInitialZero(val) {
    if(val !== '^' && val !== '+' && val !== '*' && val !== '/' && val !== '%' && val !== '1/') {
        updateOutput(val);
    }
}


// ++++++++ Square ++++++++++
function squareEvent(val) {
    const operators = ['+', '-', '*', '/', '%', '('];
    // console.log(outputValue);
    
    if (operators.includes(outputValue.at(-1))) {        
        return;
    }
    else if (outputValue.at(-1) === ')') {
        updateOutput(`${outputValue}^2`)
        // calculate();
    }
    else if(!isNaN(outputValue)) {
        let currentIndex = outputValue.length - 1;
        while (currentIndex >= 0 && !operators.includes(outputValue[currentIndex])) {
            currentIndex--;
        }
    
        const preOutput = outputValue.slice(0, currentIndex + 1);
        const nextOutput = outputValue.slice(currentIndex + 1);
        updateOutput(`${preOutput}(${nextOutput}${val}2)`);
    }
}


// ++++++++++ 1/X +++++++++++
function divideByOne(val) {
    const operators = ['+', '-', '*', '/', '%', '('];
    if (outputValue === '' || operators.includes(outputValue.at(-1))) {
        return;
    }
    else if (!isNaN(outputValue)) {
        let currentIndex = outputValue.length - 1;
        while (currentIndex >= 0 && !operators.includes(outputValue[currentIndex])) {
            currentIndex--;
        }
        const preOutput = outputValue.slice(0, currentIndex + 1);
        const nextOutput = outputValue.slice(currentIndex + 1);
        updateOutput(`${preOutput}(${val}${nextOutput})`);
    }
    
}


// ++++++++++ dot +++++++++++
function addPoint(val) {
    if (dotFlag) {
        // console.log('entered');
        const operators = ['+', '-', '*', '/', '%', '(', ')', '^'];
        if (operators.includes(`${outputValue}`.at(-1))) {
            updateOutput(`${outputValue}0${val}`);
        } else {
            updateOutput(`${outputValue}${val}`);
        }
        dotFlag = false;
    }
}

// Memory Operations
mstore.addEventListener('click', () => {
    storeM = parseFloat(outputValue);
    console.log('Stored:', storeM);
});

mplus.addEventListener('click', () => {
    storeM += parseFloat(outputValue);
    console.log('Added:', storeM);
});

msubtract.addEventListener('click', () => {
    storeM -= parseFloat(outputValue);
    console.log('Subtracted:', storeM);
});

// Erase Functions
function eraseOne() {
    if(outputValue.at(-1) == '.') {
        dotFlag = true
        updateOutput(outputValue.slice(0, -1) || '0');
    }
    else {
        updateOutput(outputValue.slice(0, -1) || '0');
    }
}

function removeAll() {
    updateOutput('0');
    dotFlag = true;
}

// Keypress Handling
window.addEventListener('keypress', (e) => {
    const key = e.key;

    if (!isNaN(key)) {
        if (outputValue === '0') {
            replaceInitialZero(key);
        } else {
            updateOutput(outputValue + key);
        }
    } else if ('+-*/%'.includes(key)) {
        updateOutput(outputValue + key);
    } else if (key === 'Enter') {
        calculate();
    }
    //  else if (key === 'Backspace') {
    //     eraseOne();
    // } 
    else if (key === '.') {
        addPoint(key);
    }
});

// Calculation
function calculate() {
    try {
        outputValue = outputValue.replaceAll('^', '**');
        outputValue = eval(outputValue);
        
        if(`${outputValue}`.indexOf('.') !== -1) {
            outputValue = Number(outputValue).toFixed(2);
            dotFlag = false;
            updateOutput(outputValue);
        }
        else {
            dotFlag = true;

        }
        updateOutput(outputValue);

    } catch {
        updateOutput('Error');
    }
}
