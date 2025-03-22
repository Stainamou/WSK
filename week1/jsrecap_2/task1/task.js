'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//display all the elements in the array
const fruits = ["apple", "banana", "orange", "grape", "kiwi"];
console.log(fruits);

//calculate array length
console.log("The length of the array is: " + fruits.length);

//display element at index 2
console.log("Element at index 2: " + fruits[2]);

//display the last element of the array using the length property
console.log("The last element of the array is: " + fruits[fruits.length - 1]);

const vegetables = [];
let count = 0;

function askVegetables() {
  if (count < 3) {
    rl.question("Enter a vegetable: ", (vegetable) => {
      vegetables.push(vegetable);
      count++;
      askVegetables();
    });
  } else {
    console.log(vegetables);
    console.log("The length of the array is: " + vegetables.length);
    rl.close();
  }
}

askVegetables();
