'use strict';

const numbers = [];

for (let i = 1; i <= 5; i++) {
  const number = parseInt(prompt(`Enter number ${i}:`));
  numbers.push(number);
}

const outputDiv = document.querySelector("#result");

outputDiv.innerHTML += "<p>Numbers: " + numbers + "<\p>";

const searchNumber = parseInt(prompt("Enter a number to search:"));
if (numbers.includes(searchNumber)) {
  outputDiv.innerHTML += `<p>Number ${searchNumber} is found in the array<\p>`;
} else {
  outputDiv.innerHTML += `<p>Number ${searchNumber} is not found in the array<\p>`;
}

numbers.pop();
outputDiv.innerHTML += "<p>Updated numbers: " + numbers + "<\p>";

numbers.sort((a, b) => a - b);
outputDiv.innerHTML += "<p>Sorted numbers: " + numbers + "<\p>";
