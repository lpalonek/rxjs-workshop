var Rx = require('rxjs');
var _ = require('lodash');

var Observable = Rx.Observable;

let sync = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();

});

let async = new Observable(observer => {
    /* asynchronously emit 1, 2, 3 from this observable */
    let i = 1;
    let id = setInterval(()=> {
        observer.next(i++);
        if (i === 4) {
            observer.complete();
        }
    });

    return () => clearInterval(id);
});


/// PAY NO ATTENTION TO THIS TEST CODE... or do... whatever.

Observable.of(
    {
        name: 'sync',
        observable: sync,
        expected: ['before', 1, 2, 3, 'after']
    },
    {
        name: 'async',
        observable: async,
        expected: ['before', 'after', 1, 2, 3]
    }
)
    .mergeMap(
        d => Observable.of('before')
            .merge(d.observable, Observable.of('after'))
            .toArray(),
        (d, arr) => ({name: d.name, expected: d.expected, actual: arr})
    )
    .do(d => {
        console.assert(_.isEqual(d.expected, d.actual), 'expected ', d.actual, 'to equal', d.expected);
        console.log(d.name, 'success!', d.actual);
    })
    .subscribe();
