import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpUserEvent,
  HttpSentEvent,
  HttpInterceptor,
  HttpProgressEvent,
  HttpHeaderResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent |
        HttpHeaderResponse |
        HttpProgressEvent |
        HttpResponse<any> |
        HttpUserEvent<any>> {
          console.log('intercept');
          return next
            .handle(req)
            .pipe(tap(event => {
              if (event instanceof HttpResponse) {
                this.loadingService.stop();
              } else {
                this.loadingService.start();
              }
            }));
    }

}
