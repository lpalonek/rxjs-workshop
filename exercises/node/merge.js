const Rx = require('rxjs');

const Observable = Rx.Observable;

const a = Observable.interval(100).mapTo('A').take(12);
const b = Observable.interval(200).mapTo('B').take(5);
const c = Observable.interval(300).mapTo('C').take(10);


/*
 const myObs = Observable.merge(a, b, c);
 myObs.subscribe(
 x => console.log(x)
 );
 */

a.merge(b, c).subscribe(x => console.log(x));
Observable.of(a, b, c).mergeAll().subscribe(x => console.log(x));


// Use any merge operator to run each of the Observables
// simultaneously and emit all values on one stream

