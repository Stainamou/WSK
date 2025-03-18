'use strict';

let C = parseFloat(prompt("Enter the temperature in Celsius: "));

let K, F
F = (C * 9/5) + 32
K = C + 273.15

document.querySelector('#result').innerHTML = "The temperature in Fahrenheit is: " + F + "<br>";
document.querySelector('#result2').innerHTML = "The temperature in Kelvin is: " + K;
