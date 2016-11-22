const Rx = require('rxjs');

const Observable = Rx.Observable;

const a = Observable.interval(100).map(n => 'A' + n).take(3);
const b = Observable.interval(200).map(n => 'B' + n).take(3);
const c = Observable.interval(300).map(n => 'C' + n).take(3);

// Use any concat operator to play each observable back to back

a.concat(b,c).subscribe(x => console.log(x));

Observable.of(a,b,c).concatAll().subscribe(x=> console.log(x), null, () => console.log("DONE"));
