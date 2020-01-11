let display="";
const buttons = document.querySelectorAll("button");
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

function input(e) {
    if (e.target.classList.contains("number") || e.target.classList.contains("operator"))
        display+=e.target.id;
    else if (e.target.classList.contains("equal"))
            display=evaluate(displayText);
    console.log(e.target.id);
    displayText.textContent=display;
}

buttons.forEach(button => {
    button.addEventListener('click', input);
});

