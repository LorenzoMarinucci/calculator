let display="";
const buttons = document.querySelectorAll("button");
      numbers = document.querySelectorAll(".number");
      clear = document.querySelector("#clear");
      backspace = document.querySelector("#backspace");
      operators = document.querySelectorAll(".operator");
      displayText = document.querySelector("#displayText");
      add = (a, b) => a+b;
      subtract = (a, b) => a-b;
      multiply = (a, b) => a*b;
      divide = (a, b) => a/b;
      operations = {
          "+":add,
          "-":subtract,
          "*":multiply,
          "/":divide
      };
      
function operate(a, b, operator) {
    if (!operations[operator]) return alert("Invalid operator");
    return operations[operator](a,b);
}

function clearDisplay() {
    display="";
    displayText.textContent="0";
};

function validInput(array) {
    let operator=true;
    console.log(array);
    for (let i=0; i<array.length; i++) {
        if (isNaN(array[i])) {
            if (!operator)  {
                return false;
            }
            else
                operator=false;
        }
        else
            operator=true;
    }
    return (operator==true);
}

function divideMultiply(array){
    let firstNumber, secondNumber, operator, i=0;
    firstNumber=array[i++];
    while (i<array.length) {
        operator=array[i++];
        secondNumber=array[i++];
        if (operator=="/" || operator=="*") {
            i=i-3;
            array.splice(i, 3, operate(+firstNumber, +secondNumber, operator));
            firstNumber=array[i++];
            console.log(array.length);
            console.log(i);
            console.log(array);
        }
        else 
            firstNumber=secondNumber;
    }
    return array;
}

function addSubtract(array) {
    let firstNumber, secondNumber, operator, i=0;
    firstNumber=array[i++];
    while (i<array.length) {
        operator=array[i++];
        secondNumber=array[i++];
        i=i-3;
        array.splice(i, 3, operate(+firstNumber, +secondNumber, operator));
        firstNumber=array[i++];
    }
    return array;
}

function evaluate(string) {
    let array=[""], j=0;
    for (let i=0; i<string.length; i++) {
        if (isNaN(+string[i]) && string[i]!=='.') {
            array.push(string[i]);
            j=array.length;
        }
        else {
            if (!array[j]) array[j]="";
            array[j]+=string[i];
        }
    }
    if (validInput(array)) {
        array=divideMultiply(array);
        console.log(array);
        array=addSubtract(array);
        let result=Math.round(array[0]*Math.pow(10, 19))/Math.pow(10,19);
        console.log(result);
        if (result == Infinity || result == -Infinity || isNaN(result)) {
            display="";
            displayText.textContent="Math error";
        }
        else {
            display=""+result;
            if (!Number.isInteger(result))
                document.getElementById('.').setAttribute('disabled', 'true');
            else
                document.getElementById('.').removeAttribute('disabled');
            displayText.textContent=display;
        }
    }
    else {
        display="";
        displayText.textContent="Syntax error";
    }
    if (display.length<19) enable();
}

function input(e) {
    if (e.target.id==="c") {
        if (displayText.textContent.length===19) enable();
        else document.getElementById('.').removeAttribute('disabled');
        clearDisplay();
    }
    else if (e.target.id==="Enter")
            evaluate(displayText.textContent);
        else if (e.target.id==="Backspace") {
                if (display[display.length-1]==".") document.getElementById('.').removeAttribute('disabled');
                display=display.slice(0, display.length-1);
                if (display) {
                    displayText.textContent=display;
                    if (display.length==18)
                        enable();
                }
                else
                    displayText.textContent="0";      
            }
            else {
                if (isNaN(e.target.id)){
                    if (e.target.id=='.')
                        document.getElementById('.').setAttribute('disabled', 'true');
                    else
                        document.getElementById('.').removeAttribute('disabled');
                }
                display+=`${e.target.id}`;
                displayText.textContent=display;
                limit();
        }
}

buttons.forEach(button => {
    button.addEventListener('click', input);
});

function limit() {
    if (displayText.textContent.length===19) {
        numbers.forEach(number => number.setAttribute('disabled', 'true'));
        operators.forEach(operator => operator.setAttribute('disabled', 'true'));        
    }
}

function enable() {
    numbers.forEach(number => number.removeAttribute('disabled'));
    operators.forEach(operator => operator.removeAttribute('disabled'));
}

window.addEventListener('keydown', (e) => {
        if (((display.length<19) && (!isNaN(e.key) || e.key=="+" || e.key=="*" || e.key=="-"
                    || e.key=="/" || (e.key=="." && document.getElementById('.').getAttribute('disabled')!=='true'))) 
                    || e.key=="Backspace" || e.key=="Enter" || e.key=="c") {
            let obj = {...e};
            obj.target={};
            obj.target.id=e.key;
            console.log(e.key);
            console.log(e.target.id);
            console.log(document.getElementById('.').getAttribute('disabled'));
            let key=document.getElementById(e.key);
            key.classList.add('pressed');
            window.setTimeout(() => {key.classList.remove('pressed')}, 100);   
            input(obj);
        }
});

/*
        if (e.key==="c") {
            if (displayText.textContent.length===19) enable();
            else document.getElementById('.').removeAttribute('disabled');
            clearDisplay();
        }
        else if (e.key==="Enter")
                evaluate(displayText.textContent);
            else if (e.key==="Backspace") {
                    if (display[display.length-1]==".") document.getElementById('.').removeAttribute('disabled');
                    display=display.slice(0, display.length-1);
                    if (display)
                        displayText.textContent=display;
                    else
                        displayText.textContent="0";         
                }
                else {
                    if ((display.length<19) && (!isNaN(e.key) || e.key=="+" || e.key=="-" || e.key=="*" || e.key=="/" || e.key==".")) {
                     if (isNaN(e.key)){
                            if (e.key=='.')
                                document.getElementById('.').setAttribute('disabled', 'true');
                            else 
                                document.getElementById('.').removeAttribute('disabled');
                     }
                        display+=`${e.key}`;
                        displayText.textContent=display;
                        limit();
                    }
                }    
            }); */