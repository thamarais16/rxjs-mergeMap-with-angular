import { Component, VERSION, ViewChild, OnInit, AfterViewInit  } from '@angular/core';
import { of, from, mergeMap, fromEvent, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('buttons', {static: true}) buttons;
  click$: Observable<any>;
  count: number = 0;
  name = 'Angular ' + VERSION.major;

  ngOnInit(): void{
    console.log("ngOnit");
  }
  
  ngAfterViewInit(): void{
    console.log("ngAfterViewInit");
    this.click$ = fromEvent(this.buttons.nativeElement, 'click');
    //this.click$ = of(1, 2, 3);
    this.mergeMapExm();
  }

  delayCount(count: number): Observable<any>{
    return new Observable((observer)=>{
      setTimeout(() => { observer.next(count+" A") }, 1000);
      setTimeout(() => { observer.next(count+" B") }, 2000);
      setTimeout(() => { observer.next(count+" C") }, 3000);
      setTimeout(() => { observer.next(count+" D") }, 4000);
      setTimeout(() => { observer.next(count+" E"); observer.complete() }, 5000);
    })
  }

  mergeMapExm(){
    this.click$.pipe(
      mergeMap(val => {
        this.count = this.count+1;
        return this.delayCount(this.count);
      })
    ).subscribe(val => {console.log(val)});
  }
  
}
