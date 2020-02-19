import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoadingType } from './loading-type';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject = new Subject<LoadingType>();

  getLoading() {
    return this.loadingSubject
      .asObservable()
      .pipe(startWith(LoadingType.STOPPED));
  }

  start() {
    console.log('start');
    this.loadingSubject.next(LoadingType.LOADING);
  }

  stop() {
    console.log('stop');
    this.loadingSubject.next(LoadingType.STOPPED);
  }
  constructor() { }
}
