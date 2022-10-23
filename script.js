const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstVal = 0;
let operatorVal = '';
let awaitingNextVal = false;

function sendNumberVal(number){
    // replace current display value if first value is entered
    if(awaitingNextVal){
        calculatorDisplay.textContent = number;
        awaitingNextVal = false;
    } else{
    // If current Display value is 0, replace it, if not, add number
    const displayVal = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayVal === "0" ? number : displayVal + number;
    }
}

//delete display function
function deleteDisplay(){
    firstVal = 0;
    operatorVal = '';
    awaitingNextVal = false;
    calculatorDisplay.textContent = 0;
}

//decimal handler
function addDecimal(){
    // if operator is pressed, don't add a decimal
    if(awaitingNextVal) return;

    // if no decimal, add one
    if(!calculatorDisplay.textContent.includes(".")){
        calculatorDisplay.textContent = calculatorDisplay.textContent + ".";
    }
}

// calculate first and secondvalues depending on operator
const calculate = {
    '/': (firstNumber, SecondNumber) => firstNumber / SecondNumber,
    '*': (firstNumber, SecondNumber) => firstNumber * SecondNumber,
    '+': (firstNumber, SecondNumber) => firstNumber + SecondNumber,
    '-': (firstNumber, SecondNumber) => firstNumber - SecondNumber,
    '=': (firstNumber, SecondNumber) => SecondNumber,
};

function useOperator(operator){
    const currentVal = Number(calculatorDisplay.textContent);
    // prevent multiple operators at the same time
    if(operatorVal && awaitingNextVal) {
        operatorVal = operator;
    };
    // assign first value if no value
    if (!firstVal){
        firstVal = currentVal;
    }else {
        const calc = calculate[operatorVal](firstVal, currentVal);
        calculatorDisplay.textContent = calc;
        firstVal = calc;
    }
    //ready for next value, store operator
    awaitingNextVal = true;
    operatorVal = operator;
}



// add Event Listeners for numbers, operators, and decimals buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberVal(inputBtn.value));
    }else if (inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }else if (inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', addDecimal);
    }
})
//clear btn event listener
clearBtn.addEventListener("click", deleteDisplay);