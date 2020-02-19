import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jtw_decode from 'jwt-decode';

import { User } from './user';
import { TokenService } from '../token/token.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(private tokenService: TokenService) {
    // tslint:disable-next-line:no-unused-expression
    this.tokenService.hasToken() && this.decodeAndNotify();
    // é a mesma coisa da linha de 12 e 14 ate 16
    // if (this.tokenService.hasToken()) {
    //   this.decodeAndNotify();
    // }
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jtw_decode(token) as User;
    this.userName = user.name;
    this.userSubject.next(user);
  }
}
