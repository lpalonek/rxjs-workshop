var Rx = require('rxjs');


let Observable = Rx.Observable;

//short version
Observable.of(1, 2, 3)
    .subscribe({
        next: (val) => {
            console.log(val);
        }
    });

//proper stuff, first defining observable and then subscribing to it
const myObservalbe = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});

myObservalbe.subscribe(
    x => console.log(x),
    null,
    () => console.log("done")
);

/*
 Create an observable that emits 1, 2, and 3 then completes.
 Subscribe to it and log the output to console.

 BONUS: Try logging before, during and after the subscription. Notice anything?
 */

