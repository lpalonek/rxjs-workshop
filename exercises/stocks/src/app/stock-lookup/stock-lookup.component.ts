import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from '../app.rx';
import { Http, Response } from '@angular/http';

@Component({
	selector: 'app-stock-lookup',
	template: `<div>
					<input type="text" (keyup)="keyup$.next($event)"/>
					<span *ngIf="getting">getting values...</span>
                	<ul>
                    	<li *ngFor="let suggestion of suggestions">
						<button (click)="addTicker(suggestion)">{{suggestion}}</button>
						</li>
					</ul>
					<div *ngFor="let ticker of tickers">
						<app-stock [ticker]="ticker"></app-stock>
					</div>
            	</div>`,

	styles: []
})
export class StockLookupComponent implements OnInit, OnDestroy {

	constructor(private http : Http){}
	getting : Boolean;
	// list of chosen tickers
	tickers: string[] = [];

	suggestions: string[] = null;

	error: string = null;
	subscription : Subscription;

	keyup$ = new Subject();
	get suggestion$() {
		/*
		 This should return an observable of suggestions for an auto complete.
		 */
		const q$ = this.keyup$.map((e : any) => e.target.value);
		return q$
		.do(()=> this.getting = true)
		.debounceTime(500)
		.switchMap(
			q =>  
			this.http.get(`http://localhost:8080/suggest/${q}`)
				.map(res => res.json())
				.do(() => this.getting = false)
				.catch((err : any) => {
					this.getting = false;
					return Observable.empty();
				})
		);	
		
	}

	clearSuggestions() {
		this.suggestions = null;
	}

	addTicker(ticker: string) {
		this.tickers.push(ticker);
		this.clearSuggestions();
	}

	removeTicker(index: number) {
		this.tickers.splice(index, 1);
	}

	ngOnInit() {
		this.subscription = this.suggestion$.subscribe(
		  suggestions => this.suggestions = suggestions
		)
	}

	ngOnDestroy() {
		if(this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
