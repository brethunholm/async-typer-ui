function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

// two ways
// How to do it with an async for of loop
// async function draw(el) {
//   let soFar = '';
//   const text = el.textContent;
//   for (const letter of text) {
//     soFar += letter;
//     el.textContent = soFar;
//     // wait for some amount of time
//     const { typeMin, typeMax } = el.dataset;
//     const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
//     await wait(amountOfTimeToWait);
//   }
// }

// How to do it with recursion
// recursion = a function calling itself until exit condition

function draw(el) {
  let index = 1;
  const text = el.textContent;
  const { typeMin, typeMax } = el.dataset;
  async function drawLetter() {
    el.textContent = text.slice(0, index);
    index += 1;
    // wait for some time
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    await wait(amountOfTimeToWait);
    // exit condion
    if (index <= text.length) {
      drawLetter();
    }
  }
  // when this function draw() runs, kick off drawl letter
  drawLetter();
}

document.querySelectorAll('[data-type]').forEach(draw);
