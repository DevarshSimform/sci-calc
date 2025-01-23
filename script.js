const btn = document.querySelector('body')

const output = document.getElementById('disp')
let outputDisplay = document.querySelector('#disp')
let outputValue = output.textContent

mclear = document.querySelector('.mclear');
mrecall = document.querySelector('.mrecall');

let storeM = 0;
let dotFlag = true;


// const selectedItem = document.querySelector('.display-total');
// console.log(selectedItem);



function checkDigitAtLast() {
    // console.log(outputValue);
    
    let lastDigit = outputValue.at(-1);
    // console.log(lastDigit);
    
    if (lastDigit >= 48 && lastDigit <= 57) {
        return true;
    }
    return false;
}


function addValue(val) {
    
    // To handle the case where entered first letter replaces initial 0
    if(outputValue == '0') {
        replaceInitialZero(val);
    }
    else if(val == '.') {   
        addPoint(val);
    }
    else if(val == '^') {       
        squareEvent(val);   
    }
    else if(val === '1/') {
        divideByOne(val);
    }
    else{
        if(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(`${val}`)) {
            
            outputValue = outputValue + `${val}`;
            outputDisplay.textContent = outputValue;

        }
        else {

            outputValue = outputValue + `${val}`;
            dotFlag = true;
            outputDisplay.textContent = outputValue;

        }
    }
}



function replaceInitialZero(val) {   
    outputValue = val;
    outputDisplay.textContent = outputValue;
}


// +++++++++++++++ Square function handled ++++++++++++++++
function squareEvent(val) {
    
    const checker = ['+', '-', '*', '/', '%', '('];
    let currentIndex = -1;
    // console.log(outputValue[outputValue.length-1]);

    console.log(outputValue);
    if (checker.includes(outputValue[outputValue.length - 1])) {

    }
    else if(outputValue === '') {

    }
    else if(`${outputValue}` === '0') {
        console.log('matched');
        
    }
    else if (outputValue[outputValue.length - 1] == ')') {

        calculate()
        outputValue = outputValue + '^' + '2';
        outputDisplay.textContent = outputValue;

    }
    else {

        for (let i = outputValue.length - 1; i >= 0; i = i - 1) {

            if (checker.includes(outputValue[i])) {
                currentIndex = i;
                break;
            }

            // else if (i == 0) {
            //     // console.log(outputValue.length);      
            //     outputValue = '(' + outputValue + `${val}` + '2';
            //     outputDisplay.textContent = outputValue;
            // } 
        }

        let preOutput = outputValue.slice(0, currentIndex + 1);
        let nextOutput = outputValue.slice(currentIndex + 1, outputValue.length);
        outputValue = preOutput + '(' + nextOutput + `${val}` + '2';
        // console.log(outputValue[i+1]);
        outputDisplay.textContent = outputValue;
    }
   
}


// +++++++++++ Handling DivideByOne ++++++++++++
function divideByOne(val) {
    
    const checker = ['+', '-', '*', '/', '%', '('];
    let currentIndex = -1;

    if(checker.includes(outputValue[outputValue.length - 1])) {

        for (let i = outputValue.length-1; i >= 0; i--) {

            if (checker.includes(outputValue[i])) {
                currentIndex = i;
                break;
            }

        } 

        let preOutput = outputValue.slice(0, currentIndex + 1);
        let nextOutput = outputValue.slice(currentIndex + 1, outputValue.length);
        outputValue = preOutput + '(' + `${val}`+ nextOutput;
        outputDisplay.textContent = outputValue;

    }

    else if(outputValue == '') {   

        outputValue = `${val}` + outputValue;
        outputDisplay.textContent = outputValue;

    }

    else {
        
    }
    
}


// ++++++++++++++ Handling points ++++++++++++++
function addPoint(val) {

    if (dotFlag) {

        const checker = ['+', '-', '*', '/', '%', '(', ')', '^'];


        if (checker.includes(outputValue[outputValue.length - 1])) {

            outputValue = outputValue + `0${val}`;
            dotFlag = false;
            outputDisplay.textContent = outputValue;

        }

        else if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(outputValue[outputValue.length - 1])) {
         
            outputValue = outputValue + `${val}`;
            dotFlag = false;
            outputDisplay.textContent = outputValue;

        }

    }

}


// ++++++++++++++++ Adding Memory Add +++++++++++++++

const memoryAdd = () => {
    let tempVar = parseFloat(outputValue.textContent);
    if (!isNaN(tempVar)) {
        storeM = storeM + tempVar;
        // enableBTN()
        console.log(storeM);
        
    }
};


const memorySubtract = () => {
    let tempVar = parseFloat(outputValue.textContent);
    if (!isNaN(tempVar)) {
        storeM = storeM - tempVar;
        // enableBTN()
        console.log(storeM);
        
    }
};


const memoryStore = () => {
    let tempVar = parseFloat(outputValue.textContent);
    if (!isNaN(tempVar)) {
        storeM = tempVar;
        // enableBTN()
        console.log(outputValue);
        
        console.log(storeM);
        
    }
};

// const enableBTN = (e)=>{
//     if (storeM != 0){
//         mclear.disabled=false;
//         mrecall.disabled=false;
//     }
// }


function eraseOne() {
    outputValue = outputValue.substring(0, outputValue.length-1)
    outputDisplay.textContent = outputValue
}

function removeAll() {
    outputValue = ' ';
    outputDisplay.textContent = outputValue;
}








//+++++++++++++++ Handling keypress ++++++++++++++++++
window.addEventListener('keypress', (e) => {
    // console.log(e.key);
    
    if(e.keyCode >= 48 && e.keyCode <= 57){

        // To handle the case where entered first letter replaces initial 0
        if(outputDisplay.textContent === '0') {
            replaceInitialZero(e.key)
        }

        else{
            outputValue = outputValue + `${e.key}`;
            outputDisplay.textContent = outputValue;
        }
    }

    else if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == 'Enter' || e.key == '%' || e.key == 'Backspace') {
        
        if(e.key == 'Enter') {
            console.log(e.key);
            calculate();
        }
        else if(e.key == 'Backspace') {
            eraseOne();
        }
        else if(e.key == '/') {
            e.preventDefault()
            outputValue = outputValue + `${e.key}`;
            outputDisplay.textContent = outputValue;    
        }
        else{
            outputValue = outputValue + `${e.key}`;
            outputDisplay.textContent = outputValue;    
        }
    }
    //enter mar to = hona chahiye
})

function calculate () {
    
    try {
        outputValue = outputValue.replaceAll('^', '**');
        outputValue = eval(outputValue);
        if(`${outputValue}`.indexOf('.') !== -1) {
            outputValue = Number(outputValue).toFixed(3);
        }
        outputDisplay.textContent = outputValue;
    } 
    catch (error) {
        outputValue = 'Error';
        outputDisplay.textContent = outputValue;
    }
}
