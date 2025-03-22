'use strict';

const numbers = [];

const outputDiv = document.querySelector("#result");

while (true) {
  const number = prompt("Enter a number (or 'done' to stop):");
  if (number === "done") {
    break;
  }
  numbers.push(parseInt(number));
}

outputDiv.innerHTML += "<p>Even numbers: ";
let evenNumber = false;
for (const number of numbers) {
  if (number % 2 === 0) {
    outputDiv.innerHTML += number + " ";
    evenNumber = true;
  }
}
if (!evenNumber) {
  outputDiv.innerHTML += "None";
}
outputDiv.innerHTML += "</p>";
