const counterModule = (function() {
  let counter = 0;

  function increment() {
    counter++;
    console.log(`Counter: ${counter}`);
  }

  function reset() {
    counter = 0;
    console.log("Counter reset to 0.")
  }

  return { increment: increment, reset: reset };
})();

counterModule.increment();
counterModule.increment();
counterModule.reset();
counterModule.increment();
