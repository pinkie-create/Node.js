// console.log('Record 1');
// setTimeout(() => {
//   console.log('Record 2');
//   Promise.resolve().then(() => {
//     setTimeout(() => {
//       сonsole.log('Record 3');
//       Promise.resolve().then(() => {
//         console.log('Record 4');
//       });
//     });
//   });
// });
// console.log('Record 5');
// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record
//         6 ')));

let data = process.argv.slice(2); //"March 21, 2022 11:30:00"
const EventEmitter = require('events');
const emitterObject = new EventEmitter();

let d = null
let h = null
let m = null
let s = null
let diff = null

const updateTimer = () => {
  const future = +Date.parse(data);
  const now = +new Date();
  diff = future - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor(diff / (1000 * 60));
  const secs = Math.floor(diff / 1000);

  d = days;
  h = hours - days * 24;
  m = mins - hours * 60;
  s = secs - mins * 60;

  if (diff <= 0) {
    emitterObject.emit('timerEnd');
  } else {
    console.clear();
    console.log(`${d} days, ${h} hours, ${m} mins, ${s} secs`)
  }
}

const timer = setInterval(() => {
  emitterObject.emit('timer', d, h, m, s)
}, 1000)

const clearTimer = (timer) => {
  console.log('Время вышло')
  clearInterval(timer);

};

emitterObject.on('timer', updateTimer);
emitterObject.on('timerEnd', () => {
  clearTimer(timer);
});