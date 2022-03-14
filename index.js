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

class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();

let d = null
let h = null
let m = null
let s = null
let diff = null

class Handler {
  static timer(d, h, m, s) {
    console.log(`${d} days, ${h} hours, ${m} mins, ${s} secs`)
  }
  static timerEnd() {
    console.log('Время вышло')
  }
}

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
}


const run = async () => {
  const time = await updateTimer()
  emitterObject.emit('timer', d, h, m, s);
  if (diff <= 0) {
    emitterObject.removeListener('timer', Handler.timerEnd);
  }
  run();
};
run();

emitterObject.on('timer', Handler.timer);