'use strict';

const score = parseInt(prompt("Enter your score:"));

if (score >= 0 && score <= 39) {
  document.querySelector("#result").innerHTML = "Your grade is 0"
} else if (score >= 40 && score <= 51) {
  document.querySelector("#result").innerHTML = "Your grade is 1"
} else if (score >= 52 && score <= 63) {
  document.querySelector("#result").innerHTML = "Your grade is 2"
} else if (score >= 64 && score <= 75) {
  document.querySelector("#result").innerHTML = "Your grade is 3"
} else if (score >= 76 && score <= 87) {
  document.querySelector("#result").innerHTML = "Your grade is 4"
} else if (score >= 88 && score <= 100) {
  document.querySelector("#result").innerHTML = "Your grade is 5"
}
