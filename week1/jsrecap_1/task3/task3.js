'use strict';

const a = parseFloat(prompt("Enter the first side of the triangle:"));
const b = parseFloat(prompt("Enter the second side of the triangle:"));
const c = parseFloat(prompt("Enter the third side of the triangle:"));

if (a === b && b == c) {
  document.querySelector("#result").innerHTML = "The triangle is equilateral.";
} else if (a === b || a === c || b === c) {
    document.querySelector("#result").innerHTML = "The triangle is isosceles.";
} else if (a != b && b != c) {
    document.querySelector("#result").innerHTML = "The triangle is scalene";
}

