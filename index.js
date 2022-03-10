const colors = require("colors");
let [number1, number2] = process.argv.slice(2);
let i = number1;
let rainbowNum = []

while (i <= number2) {
  let j = 2;
  while (j <= i) {
    if (i % j == 0) {
      break;
    }
    j++;
  }
  if (j == i) { //простое число
    rainbowNum.push(i);
  }
  i++;
}
if (isNaN(i) || isNaN(number2)) {
  console.log(colors.yellow('Ошибка: передано не число'))
}
if (!rainbowNum.length) {
  console.log(colors.red('Простых чисел нет'))
}
console.log(colors.rainbow(rainbowNum.join(' ')))