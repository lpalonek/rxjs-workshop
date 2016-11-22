const Rx = require('rxjs');

const Observable = Rx.Observable;

Observable.of(1, 2, 3, 4)
    .do(n => {
        if (n === 3) {
            throw new Error('I really hate threes');
        }
    })
    // add a catch block that handles the error and
    // emits `"error handled"` to the subscriber.
    .catch(err => Observable.of("error handled")) // ["error handled"], Promise.resolve("error handled") are same
    //err => "error handled" is an iterable, so it will change it to Observable.of("e", "r", "r", "o", "r", ...)
    //.onErrorResumeNext(() => Observable.of(4))
    .subscribe(
        x => console.log(x),
        err => console.error(err),
        () => console.info('done')
    );

