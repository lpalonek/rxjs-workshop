const Rx = require('rxjs');
const Observable = Rx.Observable;

const source = Observable.concat(
    Observable.of('A').delay(0),
    Observable.of('B').delay(1000),
    Observable.of('C').delay(2000)
);

// |---A-----------B------------C-|
// Create an interval for each arriving value, and play only the most recently
// created observable.

source
    .switchMap(x => Observable.interval(100).map(()=> x)) //the same as map().switch()
    .subscribe(
        x => console.log(x),
        null,
        () => console.log("DONE")
    );




