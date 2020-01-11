const add = (a, b) => a+b;
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
    