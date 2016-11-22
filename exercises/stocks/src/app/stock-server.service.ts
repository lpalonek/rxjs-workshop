import { Injectable } from '@angular/core';
import { WebSocketSubjectFactoryService } from './web-socket-subject-factory.service';
import { Observable, WebSocketSubject } from './app.rx';

@Injectable()
export class StockServerService {
  socket: WebSocketSubject<any> = new WebSocketSubject("ws://localhost:8080/")

  getTicker(ticker: string) {
    /* Add code to use a multiplexed web socket to get a stream
      of updates from `ws://localhost:8080`. You can run the example-server from
      the root directory of the repo: `node example-server/app.js` */
    
    return this.socket.multiplex(
      () => JSON.stringify({ type: 'sub', ticker}),
      () => JSON.stringify({ type: 'ubsub', ticker}),
      x => x.ticker === ticker
    )
    .map((x : any) => x.value)
    .retryWhen(
      error$ => error$.switchMap(
        err => navigator.onLine ? 
        Observable.timer(1000) : 
        Observable.fromEvent(document, 'online')
      )
    );

    // return Observable.timer(0, 1000)
    //   .map(() => ({ ticker, value: Math.random() * 1000 }))
    //   .map(x => x.value);
  }


  constructor() {
  }
}
