// Selecting elements
const btn = document.querySelector('body');
const outputDisplay = document.getElementById('disp');

const mstore = document.querySelector('.mstore');
const mplus = document.querySelector('.mplus');
const msubtract = document.querySelector('.msubtract');
const mclear = document.querySelector('.mclear');
const mrecall = document.querySelector('.mrecall');

let outputValue = outputDisplay.textContent;
let storeM = 0;
let dotFlag = true;

// Utility functions
const isOperator = (char) => ['+', '-', '*', '/', '%', '(', ')', '^'].includes(char);
const isDigit = (char) => char >= '0' && char <= '9';

function updateDisplay(value) {
  outputValue = value;
  outputDisplay.textContent = outputValue;
}

function initialUpdate(value) {
  const checkArray = ['+', '*', '/', '%', '^', ')']
  if(checkArray.includes(value)) {
    return;
  } else if (value === '.') {
    updateDisplay(`0${value}`);
  }
  else {
    outputValue = value;
    outputDisplay.textContent = outputValue;
  }
}

function addValue(val) {
  if (outputValue === '0') {
    initialUpdate(val);
  } else if (val === '.') {
    addDecimalPoint();
  } else if (val === '^') {
    addSquareOperator();
  } else if (val === '1/') {
    addDivideByOne();
  } else if (val === ')') {
    addCloseBracket();
  } else if (val === '(') {
    addOpenBracket();
  }
  else {
    if (`${outputValue}`.at(-1) === '(' && val === '-') {
      updateDisplay(outputValue + val);
    }
    else if (!isDigit(val)) {
      const checkArray = ['+', '-', '*', '/', '%', '('];
      if(checkArray.includes(`${outputValue}`.at(-1))) {
        return;
      }
      else {
        // console.log(outputValue.at(-1));
        updateDisplay(outputValue + val);
        dotFlag = true;
      }
    }
    else {
      updateDisplay(outputValue + val);
    }
  }
}

function addDecimalPoint() {
  if (dotFlag) {
    if (isOperator(`${outputValue}`.at(-1))) {
      updateDisplay(outputValue + '0.');
    } else {
      updateDisplay(outputValue + '.');
    }
    dotFlag = false;
  }  
}

function addSquareOperator() {
  if (!isOperator(`${outputValue}`.at(-1))) {    
    const index = findLastOperatorIndex();
    const preOutput = `${outputValue}`.slice(0, index + 1);
    const nextOutput = `${outputValue}`.slice(index + 1);
    // to block (3^2)(5^2)
    if(`${preOutput}`.at(-1) === ')') {
      return;
    }
    updateDisplay(`${preOutput}(${nextOutput}^2)`);
  }
}

function addDivideByOne() {
  if (isOperator(`${outputValue}`.at(-1))) {
    // to block (3+2)(1/)
    if(`${outputValue}`.at(-1) === ')') {
      return;
    }
    updateDisplay(outputValue + '(1/');
  }
  else if(isDigit(`${outputValue}`.at(-1))) {    
    const index = findLastOperatorIndex();
    const preOutput = `${outputValue}`.slice(0, index + 1);
    const nextOutput = `${outputValue}`.slice(index + 1);
    // console.log(preOutput);
    // to block 1/1/2 and (3+2)1/5 
    if(preOutput.includes('/') || `${preOutput}`.at(-1) === ')') {
      return;
    }
    updateDisplay(`${preOutput}1/${nextOutput}`);
  }
}

function addCloseBracket() {
  const checkArray = ['+', '-', '*', '/', '%', '.'] 
  if(checkArray.includes(`${outputValue}`.at(-1))) {
    return;
  } else if(isDigit(`${outputValue}`.at(-1)) || `${outputValue}`.at(-1) === ')') {
    let countOpen = countOpenBracket();
    let countClose = countCloseBracket();
    if(countClose < countOpen) {
      updateDisplay(outputValue + ')');
      countClose++;
    }
  } 
} 

function addOpenBracket() {
  const checkArray = ['.', ')']
  // to blcok (2+3)( and 2.(
  if(isDigit(`${outputValue}`.at(-1)) || checkArray.includes(`${outputValue}`.at(-1))) {
    return;
  }
  updateDisplay(outputValue + '(')
}

function countOpenBracket() {
  let count = 0;
  for (let i = outputValue.length - 1; i>=0; i--) {
    if(`${outputValue[i]}` === '(') {
      count++;
    }
  }
  return count;
}

function countCloseBracket() {
  let count = 0;
  for (let i = outputValue.length - 1; i>=0; i--) {
    if(`${outputValue[i]}` === ')') {
      count++;
    }
  }
  return count;
}

function findLastOperatorIndex() {
  for (let i = outputValue.length - 1; i >= 0; i--) {
    if (isOperator(outputValue[i])) {
      return i;
    }
  }
  return -1;
}

function eraseOne() {
  if(`${outputValue}`.at(-1) == '.') {
    dotFlag = true;
  }
  updateDisplay(`${outputValue}`.slice(0, -1));
  if(outputValue == '') {
    updateDisplay('0')
  }
}

function clearAll() {
  updateDisplay('0');
}

function calculate() {
  const checkArray = ['+', '-', '*', '/', '%', '('];
  let countOpen = countOpenBracket();
  let countClose = countCloseBracket();
  if (checkArray.includes(`${outputValue}`.at(-1))) {
    return;
  }
  else if (countOpen == countClose){
    try {
      const expression = `${outputValue}`.replaceAll('^', '**');
      outputValue = eval(expression);
      if (`${outputValue}`.includes('.')) {
        updateDisplay(outputValue.toFixed(2));
        dotFlag = false;
      }
      else{
        dotFlag = true;
        updateDisplay(outputValue);
      }    
    } catch {
      updateDisplay('Error');
    }
  }
}

// Memory functions
mstore.addEventListener('click', () => {
  storeM = parseFloat(outputValue);
  mclear.removeAttribute('disabled');
  mrecall.removeAttribute('disabled');
  mclear.classList.remove('opacityVal')
  mrecall.classList.remove('opacityVal')
  console.log(storeM);

});

mplus.addEventListener('click', () => {
  storeM += parseFloat(outputValue);
  console.log(storeM);

});

msubtract.addEventListener('click', () => {
  storeM -= parseFloat(outputValue);
  console.log(storeM);

});

mclear.addEventListener('click', () => {
  storeM = 0;
  mclear.classList.add('opacityVal')
  mrecall.classList.add('opacityVal')
  console.log(storeM);
});

mrecall.addEventListener('click', () => {
  updateDisplay(storeM.toString());
  console.log(storeM);

});

// Keyboard events
window.addEventListener('keypress', (e) => {
  if (isDigit(e.key)) {
    if (outputValue === '0') {
      updateDisplay(e.key);
    } else {
      updateDisplay(outputValue + e.key);
    }
  } else if (isOperator(e.key) || e.key === 'Enter' || e.key === 'Backspace') {
    handleSpecialKeyPress(e);
  }
});

function handleSpecialKeyPress(e) {
  if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    eraseLastCharacter();
  } else {
    updateDisplay(outputValue + e.key);
  }
}