'use strict';

let x1 = parseInt(prompt("Enter x1: "));
let x2 = parseInt(prompt("Enter x2: "));
let y1 = parseInt(prompt("Enter y1: "))
let y2 = parseInt(prompt("Enter y2: "));

let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
document.querySelector("#result").innerHTML = "The distance between two points is: " + distance;
