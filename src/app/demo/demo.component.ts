import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, concatMap } from 'rxjs';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit, AfterViewInit {
  @ViewChild('buttons', {static: true}) buttons;
  click: Observable<any>;
  count = 0;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.click = fromEvent(this.buttons.nativeElement, 'click');
    this.mergeMapExm();
  }

  delayCount(count: number): Observable<any> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(count + ' A');
      }, 1000);
      setTimeout(() => {
        observer.next(count + ' B');
      }, 2000);
      setTimeout(() => {
        observer.next(count + ' C');
      }, 3000);
      setTimeout(() => {
        observer.next(count + ' D');
      }, 4000);
      setTimeout(() => {
        observer.next(count + ' E');
        observer.complete();
      }, 5000);
    });
  }

  mergeMapExm() {
    this.click
      .pipe(
        concatMap((val) => {
          this.count = this.count + 1;
          return this.delayCount(this.count);
        })
      )
      .subscribe((val) => {
        console.log(val);
      });
  }
}