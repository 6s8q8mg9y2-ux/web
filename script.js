const display = document.getElementById("display");

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function closeMissingParentheses(expression) {
  const open = (expression.match(/\(/g) || []).length;
  const close = (expression.match(/\)/g) || []).length;

  return expression + ")".repeat(open - close);
}

function calculate() {
  try {
    let expression = display.value;

    // Auto-close missing brackets, example: sin(30 becomes sin(30)
    expression = closeMissingParentheses(expression);

    // Change calculator symbols into JavaScript math
    expression = expression.replace(/\^/g, "**");

    // Scientific calculator functions
    const sin = (x) => Math.sin(x * Math.PI / 180);
    const cos = (x) => Math.cos(x * Math.PI / 180);
    const tan = (x) => Math.tan(x * Math.PI / 180);
    const sqrt = (x) => Math.sqrt(x);
    const log = (x) => Math.log10(x);

    const result = Function(
      "sin",
      "cos",
      "tan",
      "sqrt",
      "log",
      `"use strict"; return (${expression});`
    )(sin, cos, tan, sqrt, log);

    if (!isFinite(result)) {
  display.value = "Error";
} else {
  let finalResult = Math.round(result * 10000000000) / 10000000000;
  display.value = finalResult;
}
  } catch (e) {
    display.value = "Error";
  }
}
